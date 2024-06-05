import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IndexTableComponent, TableData } from "../../../../_shared-components/index-table/index-table.component";
import { ActionButton } from "../../../../_shared-components/index-table/component/action-button/action-button.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { VisitEyeHistoryDetailComponent } from "../entry/visit-eye-history-detail.component";
import { CustomerSimple } from "@Model/response-customer";
import { VisitEyeHistoryFilterComponent } from "../entry/visit-eye-history-filter.component";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Area } from "@Model/response-area";

@Component({
  selector: 'ngx-visit-eye-history-index',
  templateUrl: './visit-eye-history-index.component.html',
  styleUrls: ['./visit-eye-history-index.component.scss'],
})
export class VisitEyeHistoryIndexComponent implements OnInit, AfterViewInit {
  public lat = -6.93464749;
  public lng = 107.59296792;
  public zoom = 10;

  @ViewChild(IndexTableComponent)
  indexTable: IndexTableComponent;

  endPoint: string = '/visiteye/customer';
  replacement: string = '/pages/collector/report_visit_eye_history/index/page';
  tableData: TableData[] = [
    new TableData('Name', 'name', 'name'),
    new TableData('Address', 'address', 'address'),
  ];

  view: ActionButton = new ActionButton('all');

  actionButton: ActionButton[] = [
    this.view,
  ];

  dataFormFilter: FormGroup;

  customerShowedList: CustomerSimple[] = [];
  selectedArea: Area[] = [];

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.dataFormFilter = this.fb.group({
      area: [{value: [], disabled: false}],
      user_id: [{value: [], disabled: false}],
    });
    this.view.output.subscribe((x) => {
      const customer: CustomerSimple = x;
      this.openDetail(customer);
    });
  }

  openDetail(x: CustomerSimple) {
    const activeModal = this.modalService.open(VisitEyeHistoryDetailComponent, {
      size: 'lg',
      container: 'nb-layout',
      backdrop: 'static',
    });
    activeModal.componentInstance.customer = x;
  }

  openFilter() {
    const activeModal = this.modalService.open(VisitEyeHistoryFilterComponent, {
      size: 'lg',
      container: 'nb-layout',
      backdrop: 'static',
    });
    console.info(this.dataFormFilter.controls);
    activeModal.componentInstance.dataForm = this.dataFormFilter;
    activeModal.componentInstance.selectedArea = this.selectedArea;
    activeModal.componentInstance.filterData.subscribe(dataFiltered => {
      this.dataFormFilter = dataFiltered[0];
      this.selectedArea = dataFiltered[1];
      this.indexTable.dataFormFilter = this.dataFormFilter;
      this.indexTable.reload();
    });
  }

  getShowedRecord(customer: CustomerSimple[]) {
    this.customerShowedList = customer;
  }

  ngAfterViewInit(): void {
  }

}
