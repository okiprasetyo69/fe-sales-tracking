import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';
import { SalesReportVisitPlanService } from '../../../../services/sales-report-visit-plan.service';
import { UserService } from '../../../../services/user.service';
import { CustomerService } from '../../../../services/customer.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { BranchService } from '../../../../services/branch.service';
import { DivisionsService } from '../../../../services/divisions.service';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'filter-customer',
  templateUrl: './filter-customer.component.html',
  styleUrls: ['./filter-customer.component.scss']
})
export class FilterCustomerComponent implements OnInit {

  @Input() dataForm: FormGroup;
  @Input() userData: any;
  @Input() branchData: any;
  @Input() divisionData: any;

  @Input() list_customer_name: any;

  @Input() datasets: any;
  @Input() dataTablesParameters: any;
  @Input() module: any;

  list_category: any = [];
  list_customer_code: any = [];
  // list_customer_name: any = [];
  list_customer_parent: any = [];
  // list_customer_address: any = [];
  

  @Output() filterData: EventEmitter<any> = new EventEmitter();
  dataFormCloned: FormGroup;
  serverErrors = [];

  dropdownLoading = false;

  dataFilterBy = [
    {name: 'All Customers', code: 1},
    {name: 'By Date Created Range', code: 2},
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
    private customerService: CustomerService,
  ) {
  }

  initDropdownParentCode(){
    this.dropdownLoading = true;
    this.customerService.getCustomerParentList()
    .pipe(untilDestroyed(this))
    .subscribe(resp => {   
      const res = resp.data.parent_code;
      let parents = []
      for (let x of res){
          let obj = {
            key: x,
            value: x
          }
          parents.push(obj)
      }
      this.list_customer_parent = parents;
      console.log("list parents ", this.list_customer_parent);
      this.dropdownLoading = false;
    }, error => {
      this.dropdownLoading = false;
    });
  }

  initDropdownParent(){
    this.dropdownLoading = true;
    this.customerService.customerGetParents()
    .pipe(untilDestroyed(this))
    .subscribe(resp => {   
      const res = resp.data.parent_code; 
      for (let x of res){
        this.list_customer_parent.push({
          key: x, value: x
        })
      }
      console.log(this.list_customer_parent);
      this.dropdownLoading = false;
    }, error => {
      this.dropdownLoading = false;
    });
  }

  ngOnInit() {    
    this.dataFormCloned = this.dataForm;
    this.changeFilterBy();    
    // this.initDropdownCustomer();
    this.initDropdownParent();
    this.list_category = this.customerService.customerCategory;
  }

  changeParent($event){
    console.log($event);
    let parents = [];
    for (let x of $event) {
      parents.push(x.name);
    }
    console.log(parents);
    this.dataFormCloned.patchValue({customer_parent: parents});
  }

  changeCategory($event) {
    console.log($event);
    let category = [];

    for (let x of $event) {
      category.push(x.value);      
    }
    console.log(category)
    this.dataFormCloned.patchValue({category: category});    
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
        dataError['date_end'] = 'The Year Could Not Less than Date From';
      } else if (current_year_end == current_year_start) {
        if (current_month_end < current_month_start) {
          errorCounted += 1;
          dataError['date_end'] = 'The Month Could not Less than Date From';
        } else if (current_month_end == current_month_start) {
          if (current_day_end < current_day_start) {
            errorCounted += 1;
            dataError['date_end'] = 'The Date Could not Less than Date From';
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
