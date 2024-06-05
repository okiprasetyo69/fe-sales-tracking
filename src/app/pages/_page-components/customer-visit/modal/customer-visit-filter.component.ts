import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormGroup} from '@angular/forms';
import {IMyDateModel, INgxMyDpOptions} from 'ngx-mydatepicker';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {CustomerVisitService} from '../../../../services/customer-visit.service';
import {IndexTableService} from "../../../_shared-components/index-table/index-table.service";

@Component({
  selector: 'ngx-customer-visit-filter',
  templateUrl: './customer-visit-filter.component.html',
  styleUrls: ['./customer-visit-filter.component.scss'],
})
export class CustomerVisitFilterComponent implements OnInit {
  @Input() dataForm: FormGroup;
  @Input() areaData: any;
  @Input() userData: any;
  @Output() filterData: EventEmitter<any> = new EventEmitter();
  dataFormCloned: FormGroup;
  serverErrors = [];

  dropdownAreaLoading = false;
  dropdownUserLoading = false;

  dateConfigurationStart: INgxMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
    appendSelectorToBody: true,
  };

  dateConfigurationEnd: INgxMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
    appendSelectorToBody: true,
  };

  type: string;


  constructor(
    private activeModal: NgbActiveModal,
    private customerVisitService: CustomerVisitService,
    private indexTableService: IndexTableService,
  ) {
  }

  ngOnInit() {
    this.dataFormCloned = this.dataForm;
    this.openAreaDropdown();
    this.openUserDropdown();
  }

  openUserDropdown() {
    this.dropdownUserLoading = true;
    if (this.type == 'sales') {
      this.indexTableService.dropdownUserSales().pipe(untilDestroyed(this)).subscribe(resp => {
        this.userData = resp.data.data;
        this.dropdownUserLoading = false;
      }, error => {
        this.dropdownUserLoading = false;
      });
    } else if (this.type == 'collector') {
      this.indexTableService.dropdownUserCollector().pipe(untilDestroyed(this)).subscribe(resp => {
        this.userData = resp.data.data;
        this.dropdownUserLoading = false;
      }, error => {
        this.dropdownUserLoading = false;
      });
    } else {
      this.indexTableService.dropdownUserLogistic().pipe(untilDestroyed(this)).subscribe(resp => {
        this.userData = resp.data.data;
        this.dropdownUserLoading = false;
      }, error => {
        this.dropdownUserLoading = false;
      });
    }
  }

  changeUser($event) {
    let users = [];
    for (let x of $event) {
      users.push(x.username);
    }
    this.dataFormCloned.patchValue({username: users});
  }

  filterNow() {

    let dataError = [];
    let errorCounted = 0;

    const current_date_start = this.dataFormCloned.controls['date_start'].value;
    const current_date_end = this.dataFormCloned.controls['date_end'].value;
    const area = this.dataFormCloned.controls['area'].value;
    const user_id = this.dataFormCloned.controls['user_id'].value;


    const current_date_start_splited = this.dataFormCloned.controls['date_start'].value.split('-');
    const current_day_start = current_date_start_splited[2];
    const current_month_start = current_date_start_splited[1];
    const current_year_start = current_date_start_splited[0];

    const current_date_end_splited = this.dataFormCloned.controls['date_end'].value.split('-');
    const current_day_end = current_date_end_splited[2];
    const current_month_end = current_date_end_splited[1];
    const current_year_end = current_date_end_splited[0];

    if (current_date_end == null || current_date_end == '') {
      errorCounted += 1;
      dataError['date_end'] = 'Please Select Date End';
    } else {
      if (current_year_end < current_year_start) {
        errorCounted += 1;
        dataError['date_end'] = 'The Year Could Not Less than Date Start';
      } else if (current_year_end == current_year_start) {
        if (current_month_end < current_month_start) {
          errorCounted += 1;
          dataError['date_end'] = 'The Month Could not Less than Date Start';
        } else if (current_month_end == current_month_start) {
          if (current_day_end < current_day_start) {
            errorCounted += 1;
            dataError['date_end'] = 'The Date Could not Less than Date Start';
          }
        }
      }
    }

    if (current_date_start == null || current_date_start == '') {
      errorCounted += 1;
      dataError['date_start'] = 'Please Select Date End';
    } else {
      if (current_year_start > current_year_end) {
        errorCounted += 1;
        dataError['date_start'] = 'The Year Could Not More than Date End';
      } else if (current_year_start == current_year_end) {
        if (current_month_start > current_month_end) {
          errorCounted += 1;
          dataError['date_start'] = 'The Month Could not More than Date End';
        } else if (current_month_start == current_month_end) {
          if (current_day_start > current_day_end) {
            errorCounted += 1;
            dataError['date_start'] = 'The Date Could not result = 0More than Date End';
          }
        }
      }
    }

    if (area.length == 0) {
      errorCounted += 1;
      dataError['area'] = 'Please choose at least one area.';
    }

    this.serverErrors = dataError;
    if (errorCounted === 0) {
      this.dataForm = this.dataFormCloned;
      this.filterData.emit(this.dataFormCloned);
      this.activeModal.close();
      this.activeModal.dismiss();
    }

  }

  openAreaDropdown() {
    this.dropdownAreaLoading = true;
    this.customerVisitService.getListArea().pipe(untilDestroyed(this)).subscribe(resp => {
      this.areaData = resp.data.data;
      this.dropdownAreaLoading = false;
    }, error => {
      this.dropdownAreaLoading = false;
    });
  }

  changeArea($event) {
    let areas = [];
    for (let x of $event) {
      areas.push(x.id);
    }
    this.dataFormCloned.patchValue({area: areas});
  }

  closeModal() {
    this.activeModal.close();
    this.activeModal.dismiss();
  }

  onDateStartChanged(event: IMyDateModel) {
    const value = {};
    if (event.epoc == 0) {
      value['date_start'] = null;
    } else {
      value['date_start'] = event.formatted;
    }
    this.dataFormCloned.patchValue(value);
  }

  onDateEndChanged(event: IMyDateModel) {
    const value = {};
    if (event.epoc == 0) {
      value['date_end'] = null;
    } else {
      value['date_end'] = event.formatted;
    }
    this.dataFormCloned.patchValue(value);
  }
}
