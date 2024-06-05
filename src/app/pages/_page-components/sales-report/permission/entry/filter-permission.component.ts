import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../../../services/user.service';
import { BranchService } from '../../../../../services/branch.service';
import { DivisionsService } from '../../../../../services/divisions.service';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'ngx-filter-permission',
  templateUrl: './filter-permission.component.html',
  styleUrls: ['./filter-permission.component.scss'],
})
export class FilterPermissionComponent implements OnInit {
  @Input() dataForm: FormGroup;
  @Input() userData: any;
  @Input() branchData: any;
  @Input() divisionData: any;

  @Output() filterData: EventEmitter<any> = new EventEmitter();
  dataFormCloned: FormGroup;
  serverErrors = [];

  dropdownUserLoading = false;
  dropdownBranchLoading = false;
  dropdownDivisionLoading = false;

  dataFilterBy = [
    {name: 'All Permission', code: 1},
    {name: 'By Date Range', code: 2},
  ];

  filterByRange = false;

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

  constructor(
    private activeModal: NgbActiveModal,
    private userService: UserService,
    private branchService: BranchService,
    private divisionService: DivisionsService,
  ) {
  }

  ngOnInit() {
    this.dataFormCloned = this.dataForm;
    this.changeFilterBy();
    this.openUserDropdown();
    this.openBranchDropdown();
    this.openDivisionDropdown();
  }

  changeUser($event) {
    let users = [];
    for (let x of $event) {
      users.push(x.username);
    }
    console.info(users);
    this.dataFormCloned.patchValue({username: users});
  }

  changeFilterBy() {
    const data_filter_by = this.dataFormCloned.controls['data_filter_by'].value;
    if (data_filter_by == 1) {
      this.filterByRange = false;
    } else {
      this.filterByRange = true;
    }
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

  openUserDropdown() {
    this.dropdownUserLoading = true;
    this.userService.dropdownUserSales().pipe(untilDestroyed(this)).subscribe(resp => {
      this.userData = resp.data.data;
      this.dropdownUserLoading = false;
    }, error => {
      this.dropdownUserLoading = false;
    });
  }

  openBranchDropdown() {
    this.dropdownBranchLoading = true;
    this.branchService.index_dropdown().pipe(untilDestroyed(this)).subscribe(resp => {
      this.branchData = resp.data.data;
      this.dropdownBranchLoading = false;
    }, error => {
      this.dropdownBranchLoading = false;
    });
  }

  openDivisionDropdown() {
    this.dropdownDivisionLoading = true;
    this.divisionService.index_dropdown().pipe(untilDestroyed(this)).subscribe(resp => {
      this.divisionData = resp.data.data;
      this.dropdownDivisionLoading = false;
    }, error => {
      this.dropdownDivisionLoading = false;
    });
  }

  filterNow() {

    let dataError = [];
    let errorCounted = 0;

    const current_date_start = this.dataFormCloned.controls['date_start'].value;
    const current_date_end = this.dataFormCloned.controls['date_end'].value;


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
            dataError['date_start'] = 'The Date Could not More than Date End';
          }
        }
      }
    }


    this.serverErrors = dataError;
    if (errorCounted == 0) {
      this.dataForm = this.dataFormCloned;
      this.filterData.emit(this.dataForm);
      this.activeModal.close();
      this.activeModal.dismiss();
    }
  }
}
