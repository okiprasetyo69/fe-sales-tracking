import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { ToasterService } from 'angular2-toaster';
import { CustomerService } from '../../../../services/customer.service';
import { datatable_configs } from '../../../../configs/configs';
import { MenuService } from '../../../../services/menu.service';
import { DataTableDirective } from 'angular-datatables';
import { ModalDeleteService } from '../../../_shared-components/modal-delete/modal-delete.service';
import { untilDestroyed } from 'ngx-take-until-destroy';

// custom
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExcelService } from '../../../../services/excel.service';
import { FilterCustomerComponent } from '../entry/filter-customer.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OauthService } from '../../../../services/oauth.service';
import { UserService } from '../../../../services/user.service';
import * as fileSaver from 'file-saver';



@Component({
  selector: 'ngx-customers-index',
  styleUrls: ['./customers-index.component.scss'],
  templateUrl: './customers-index.component.html',
})
export class CustomersIndexComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  module: string;
  datasets: Array<any> = [];
  dtOptions: any = {};
  dtParams: any;
  page_start: number = datatable_configs.page_start;
  page_length: number = datatable_configs.page_length;
  page_search: string = datatable_configs.page_search;
  page_order_col: number = datatable_configs.page_order_col;
  page_order_dir: string = datatable_configs.page_order_dir;
  startNumber: number = datatable_configs.page_start;

   // custom
  profileUser;
  customerCategory;
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
  dateStringTitle = 'All';
  is_supervisor = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private toasterService: ToasterService,
    private location: Location,
    private menuService: MenuService,
    private modalDeleteService: ModalDeleteService,

    private excelService: ExcelService,
    private modalService: NgbModal,    
    private oauthService: OauthService,
    private fb: FormBuilder,
    private userService: UserService,
  ) {
  }

  // custom
  autoDigit(number) {
    return (number < 10) ? '0'.concat(number) : number;
  }

  prepareFilterForm() {
    this.dataFormFilter = this.fb.group({
      date_start: null,
      date_end: null,
      data_filter_by: null,
      customer_code: [],
      // customer_name: null,
      customer_parent: [],
      category: [],
      contain: null
    });
    this.dataFormFilter.patchValue({date_start: this.default_date});
    this.dataFormFilter.patchValue({date_end: this.default_date});
    this.dataFormFilter.patchValue({data_filter_by: 1});
  }

  // end custom

  checkIsSupervisor(){
    return this.profileUser['is_supervisor_logistic'] == 1 ? true : 
            this.profileUser['is_supervisor_sales'] == 1 ? true : false;
  }

  setterDatasets(datasets: Array<any>){
    this.datasets = datasets;
  }

  getterDatasets(){
    console.log("getter datasets", this.datasets);
    return this.datasets;
  }

  ngOnInit() {
    // get menu
    this.menuService.getMenuReloaded(this.route.snapshot.data['route_code']);

    // get module
    this.module = this.route.snapshot.data['module'];

    // get profile
    this.profileUser = this.oauthService.getProfile();
    // this.is_supervisor = this.profileUser.is_supervisor();
    
    this.is_supervisor = this.checkIsSupervisor();

    this.route.queryParams
      .subscribe(params => {
        if (!!params.length) {
          this.page_start = +params['start'];
          this.page_length = +params['length'];
          this.page_search = params['search'];
          this.page_order_col = +params['order_col'];
          this.page_order_dir = params['order_dir'];
        }
        this.getDatatableOnlyAssigned();
      });

    this.prepareFilterForm();
  }

  getDatatableOnlyAssigned() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: this.page_length,
      serverSide: true,
      searching: true,
      processing: true,
      displayStart: this.page_start,
      order: [[this.page_order_col, this.page_order_dir]],
      search: {search: this.page_search},
      ajax: (dataTablesParameters: any, callback) => {
        // console.log(this.page_start);
        this.dtParams = dataTablesParameters;
        // console.log("Check param", this.dtParams);
        this.startNumber = this.dtParams['start'];
        // console.log(this.startNumber);
        this.customerService.indexDatatablesOnlyAssigned(dataTablesParameters, this.module, this.dataFormFilter)
          .pipe(untilDestroyed(this))
          .subscribe(resp => {
          this.setterDatasets(resp.data.data);
          console.log("ajax : ", resp.data.data);
          
          callback({
            recordsTotal: resp.data.total,
            recordsFiltered: resp.data.total_filter,
            data: !!resp.data.total ? [{
              no: '',
              create_date: '',
              name: '',
              code: '',
              address: '',
              phone: '',
              category: '',
              action: '',
            }] : [],
          });
          }, errors => {
            const errorMessage = 'Something wrong with error: ' +
              errors.message + '. Error detail: ' + errors.error.message;
            this.toasterService.popAsync('error', 'Error', errorMessage);
          });
      },
      columns: [
        {title: 'No', data: 'no', orderable: false},
        {title: 'Created Date', data: 'create_date', orderable: true},
        {title: 'Name', data: 'name', orderable: true},
        {title: 'Code', data: 'code', orderable: true},
        {title: 'Address', data: 'address', orderable: false},
        {title: 'Phone', data: 'phone', orderable: false},
        {title: 'Category', data: 'category', orderable: true},
        {title: 'Action', data: 'action', orderable: false},
      ],
    };
  }

  dataView(code) {
    this.router.navigate([`/pages/${this.module}/customers/view/${code}`]).then();
  }

  dataEdit(code) {
    this.router.navigate([`/pages/${this.module}/customers/edit/${code}`]).then();
  }

  dataHapus(id) {
    this.modalDeleteService.deleteData(id, this.dtElement, this.customerService);
  }

  ngOnDestroy() {
    //
  }

  exportExcel() {
    this.toasterService.popAsync('info', 'Start Download', 'Generating, Pleasewait...');
    this.customerService.exportExcel(this.dtParams, this.dataFormFilter).subscribe(data => {
        
        fileSaver.saveAs(data, 'customers.xlsx');
        console.info("export excel");
        this.toasterService.popAsync('success', 'Success', 'Ready to download');
      },
      errors => {
        let errorMessage = 'Something wrong with error: ' +
          errors.message;
        if (errors.error && errors.error.message) {
          errorMessage = errors.error.message;
        }
        console.info('ada error datatable:', errors);
        this.toasterService.popAsync('error', 'Error', errorMessage);
      },
      () => console.info('Completed file download.'));
  }


  dataFilter(){
    console.info("data filter");
    const activeModal = this.modalService.open(FilterCustomerComponent, {
      size: 'lg',
      container: 'nb-layout',
      backdrop: 'static',
    });

    // for data selection used from datasets
    // activeModal.componentInstance.datasets = this.datasets;
    activeModal.componentInstance.datasets = this.getterDatasets();

    activeModal.componentInstance.dataTablesParameters = this.dtParams;
    activeModal.componentInstance.module = this.module;
    activeModal.componentInstance.dataForm = this.dataFormFilter;

    activeModal.componentInstance.filterData.subscribe(dataFiltered => {
      this.dataFormFilter = dataFiltered;
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.draw();
      });
      const default_date = this.default_date;
      const start_date = dataFiltered.controls['date_start'].value;
      const end_date = dataFiltered.controls['date_end'].value;
      const data_filter_by = dataFiltered.controls['data_filter_by'].value;

      // const category = dataFiltered.controls['category'].value;
      // const code = dataFiltered.controls['customer_code'].value;
      // const name = dataFiltered.controls['customer_name'].value;
      // const parent = dataFiltered.controls['customer_parent'].value;   
      
      let stringData = '';
      if (data_filter_by == 1) {
        stringData = 'All';
        this.dateStringTitle = stringData;
      } else {
        if (start_date === default_date && end_date === default_date) {
          this.dateStringTitle = 'Today'.concat(' ').concat(default_date);
        } else {
          if (start_date === default_date) {
            stringData = 'Today'.concat(' ').concat(default_date);
          } else {
            stringData = start_date;
          }
          stringData = stringData.concat(' - ');
          if (end_date === default_date) {
            stringData = stringData.concat('Today').concat(' ').concat(default_date);
          } else {
            stringData = stringData.concat(end_date);
          }
          this.dateStringTitle = stringData;
        }
      }

    });
  }
  
}
