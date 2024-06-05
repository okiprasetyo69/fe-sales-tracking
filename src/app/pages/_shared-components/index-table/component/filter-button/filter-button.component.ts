import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { IndexTableComponent } from '../../index-table.component';
import { FilterModalComponent } from './filter-modal/filter-modal.component';

@Component({
  selector: 'ngx-filter-button',
  templateUrl: './filter-button.component.html',
  styleUrls: ['./filter-button.component.scss'],
})
export class FilterButtonComponent implements OnInit, AfterViewInit {
  @Input() indexTable: IndexTableComponent;
  @Input() userFilter: boolean = true;
  type: string;
  dataTableDirective: DataTableDirective;
  dataFormFilter: FormGroup;
  todayDate: any = {
    // @ts-ignore
    year: new Date().getFullYear(),
    // @ts-ignore
    month: new Date().getMonth() + 1,
    // @ts-ignore
    day: new Date().getDate(),
  };

  default_date = this.todayDate.year.toString().concat('-').concat(this.autoDigit(this.todayDate.month)).concat('-').concat(this.autoDigit(this.todayDate.day));

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.dataFormFilter = this.fb.group({
      date_start: null,
      date_end: null,
      data_filter_by: null,
      user_id: [],
      username: [],
      branch_id: [],
      division_id: [],
    });
    this.dataFormFilter.patchValue({date_start: this.default_date});
    this.dataFormFilter.patchValue({date_end: this.default_date});
    this.dataFormFilter.patchValue({data_filter_by: 1});
  }

  ngAfterViewInit(): void {
    if (this.indexTable != null) {
      this.type = this.indexTable.typeData;
      this.dataTableDirective = this.indexTable.dataTableDirective;
      this.indexTable.dataFormFilter = this.dataFormFilter;
    }
  }

  dataFilter() {
    const activeModal = this.modalService.open(FilterModalComponent, {
      size: 'lg',
      container: 'nb-layout',
      backdrop: 'static',
    });

    activeModal.componentInstance.dataForm = this.dataFormFilter;
    activeModal.componentInstance.type = this.type;
    activeModal.componentInstance.userFilter = this.userFilter;

    activeModal.componentInstance.filterData.subscribe(dataFiltered => {
      this.dataFormFilter = dataFiltered;
      if (this.dataTableDirective != null) {
        this.dataTableDirective.dtInstance.then((dtInstance: DataTables.Api) => {
          // Destroy the table first
          dtInstance.draw();
        });
      }
    });
  }

  autoDigit(number) {
    return (number < 10) ? '0'.concat(number) : number;
  }

}
