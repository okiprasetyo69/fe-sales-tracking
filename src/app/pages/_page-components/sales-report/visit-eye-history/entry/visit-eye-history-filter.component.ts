import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormGroup} from "@angular/forms";
import {VisitEyeHistoryService} from "../../../../../services/visit-eye-history.service";
import {untilDestroyed} from "ngx-take-until-destroy";
import {UserVisitEye} from "@Model/response-user";
import {DefaultResponse} from "@Model/response-default";
import {Pagination} from "@Model/response-pagination";
import {Area} from "@Model/response-area";

@Component({
  selector: 'ngx-visit-eye-history-filter',
  templateUrl: './visit-eye-history-filter.component.html',
  styleUrls: ['./visit-eye-history-filter.component.scss'],
})
export class VisitEyeHistoryFilterComponent implements OnInit {
  @Input() dataForm: FormGroup;
  @Output() filterData: EventEmitter<any> = new EventEmitter();
  dataFormCloned: FormGroup;
  serverErrors = [];

  dropdownAreaLoading = false;
  dropdownUserLoading = false;
  areaData: Area[];
  userData: UserVisitEye[] = [];
  selectedArea: Area[] = [];

  constructor(
    private activeModal: NgbActiveModal,
    private visitEyeHistoryService: VisitEyeHistoryService,
  ) {
  }

  ngOnInit() {
    this.dataFormCloned = this.dataForm;
    this.openAreaDropdown();
    this.openUserDropdown();
  }

  filterNow() {

    let dataError = [];
    let errorCounted = 0;

    const area = this.dataFormCloned.controls['area'].value;

    // if (area.length == 0) {
    //   errorCounted += 1;
    //   dataError['area'] = 'Please choose at least one area.';
    // }

    this.serverErrors = dataError;
    if (errorCounted == 0) {
      this.dataForm = this.dataFormCloned;
      this.filterData.emit([
        this.dataForm,
        this.selectedArea,
      ]);
      this.closeModal();
    }

  }

  openAreaDropdown() {
    this.dropdownAreaLoading = true;
    this.visitEyeHistoryService.getListArea().pipe(untilDestroyed(this)).subscribe(resp => {
      this.areaData = resp.data.data;
      this.dropdownAreaLoading = false;
    }, error => {
      this.dropdownAreaLoading = false;
    });
  }

  openUserDropdown() {
    this.dropdownUserLoading = true;
    this.visitEyeHistoryService.getListUser().pipe(untilDestroyed(this)).subscribe((resp: DefaultResponse<Pagination<UserVisitEye>>) => {
      this.userData = resp.data.data;
      this.dropdownUserLoading = false;
    }, error => {
      this.dropdownUserLoading = false;
    });
  }

  changeArea($event) {
    this.selectedArea = $event;
  }

  changeUser($event) {
    let users = [];
    for (let x of $event) {
      users.push(x.username);
    }
    this.dataFormCloned.patchValue({user_id: users});
  }

  closeModal() {
    this.activeModal.close();
    this.activeModal.dismiss();
  }
}
