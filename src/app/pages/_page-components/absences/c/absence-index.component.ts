import { AfterViewInit, Component, OnDestroy, OnInit, Pipe, PipeTransform, ViewChild  } from '@angular/core';
import { datatable_configs } from '../../../../configs/configs';
import { Location } from '@angular/common';
import { ToasterService } from 'angular2-toaster';
import { MenuService } from '../../../../services/menu.service';
import { ActivatedRoute, Router } from '@angular/router';
import {AbsenceService} from '../../../../services/absence.service';
import { OauthService } from '../../../../services/oauth.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
// custom
import { ExcelService } from '../../../../services/excel.service';
import * as fileSaver from 'file-saver';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormBuilder, FormGroup } from '@angular/forms';
import {FilterAbsencesComponent} from '../entry/filter-absences.component';
import {FilterAbsencesDateRangeComponent} from '../entry/filter-absences-date-range.component';
import {FilterAbsencesCheckInComponent} from '../entry/filter-absences-check-in.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { ModalDeleteService } from '../../../_shared-components/modal-delete/modal-delete.service';
import { UserService } from '../../../../services/user.service';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';

@Component({
  selector: 'ngx-absence-index',
  templateUrl: './absence-index.component.html',
  styleUrls: ['./absence-index.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(-100%)'}),
        animate('200ms ease-in', style({transform: 'translateY(0%)'})),
      ]),
      transition(':leave', [
        animate('200ms ease-out', style({transform: 'translateY(-100%)'})),
      ]),
    ]),
    trigger('EnterLeave', [
      state('flyIn', style({transform: 'translateX(0)'})),
      transition(':enter', [
        style({transform: 'translateX(-120%)'}),
        animate('0.5s 400ms ease-in'),
      ]),
      transition(':leave', [
        animate('0.3s ease-out', style({transform: 'translateX(100%)'})),
      ]),
      state('flyOut', style({transform: 'translateX(0)'})),
      transition(':enter', [
        style({transform: 'translateX(100%)'}),
        animate('0.5s 500ms ease-in'),
      ]),
      transition(':leave', [
        animate('0.3s ease-out', style({transform: 'translateX(-100%)'})),
      ]),
    ]),
  ],
})
export class AbsenceIndexComponent implements OnInit , OnDestroy, AfterViewInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

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
  seeDetail = false;
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
    private route: ActivatedRoute,
    private router: Router,
    private toasterService: ToasterService,
    private location: Location,
    private menuService: MenuService,
    private absenceService: AbsenceService,
    private modalService: NgbModal,
    private modalDeleteService: ModalDeleteService,
    private excelService: ExcelService,   
    private oauthService: OauthService,
    private fb: FormBuilder,
    private userService: UserService) { }

  ngOnInit() {
    // get menu
    this.menuService.getMenuReloaded(this.route.snapshot.data['route_code']);
    this.profileUser = this.oauthService.getProfile();
    this.route.queryParams
    .subscribe(params => {
      if (!!params.length) {
        this.page_start = +params['start'];
        this.page_length = +params['length'];
        this.page_search = params['search'];
        this.page_order_col = +params['order_col'];
        this.page_order_dir = params['order_dir'];
      }
      this.getDataTableAbsence();
    });
    this.prepareFilterForm();
  }

  prepareFilterForm() {
    this.dataFormFilter = this.fb.group({
      date_start: null,
      date_end: null,
      data_filter_by: null,
    });
    this.dataFormFilter.patchValue({date_start: this.default_date});
    this.dataFormFilter.patchValue({date_end: this.default_date});
    this.dataFormFilter.patchValue({data_filter_by: 1});
  }

  getDataTableAbsence(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: this.page_length,
      serverSide: true,
      searching: true,
      processing: true,
      displayStart: this.page_start,
      order: [[this.page_order_col, this.page_order_dir]],
      search: {search: this.page_search},
      ajax:(dataTablesParameters: any, callback) => {
          this.dtParams = dataTablesParameters;
          this.startNumber = this.dtParams['start'];
          this.absenceService.indexDatatables(dataTablesParameters, this.dataFormFilter).pipe(untilDestroyed(this))
          .subscribe(resp => {
            this.setterDatasets(resp.data.data);
            console.log("ajax : ", resp.data.data);
            callback({
              recordsTotal: resp.data.total,
              recordsFiltered: resp.data.total_filter,
              data: !!resp.data.total ? [{
                no: '',
                user_id: '',
                username: '',
                name: '',
                total_start: '',
                total_stop: '',
                total_online: '',
              }] : [],
            });
          }, 
          errors => {
            const errorMessage = 'Something wrong with error: ' +
              errors.message + '. Error detail: ' + errors.error.message;
            this.toasterService.popAsync('error', 'Error', errorMessage);
          });
      },
      columns: [
        {title: 'No', data: 'no', orderable: false},
        {title: 'User ID', data: 'user_id', orderable: true},
        {title: 'User Name', data: 'username', orderable: true},
        {title: 'Name', data: 'name', orderable: true},
        {title: 'Total Start', data: 'total_start', orderable: true},
        {title: 'Total Stop', data: 'total_stop', orderable: false},
        {title: 'Total Online', data: 'total_online', orderable: false},
      ],
    };
  }

  // Start custom
  autoDigit(number) {
      return (number < 10) ? '0'.concat(number) : number;
  }
  
  setterDatasets(datasets: Array<any>){
      this.datasets = datasets;
  }
  // End Custom

  ngOnDestroy() {
    //
  }
  ngAfterViewInit(): void {
  }


  dataFilter(){
    //alert('test')
    const activeModal = this.modalService.open(FilterAbsencesComponent, {
      size: 'lg',
      container: 'nb-layout',
      backdrop: 'static',
    });
    activeModal.componentInstance.dataForm = this.dataFormFilter;
    activeModal.componentInstance.filterData.subscribe(dataFiltered => {
      this.dataFormFilter = dataFiltered;
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.draw();
      });
    })
  }

  reportCheckIn(){
    const activeModal = this.modalService.open(FilterAbsencesCheckInComponent, {
      size: 'lg',
      container: 'nb-layout',
      backdrop: 'static',
    });
    activeModal.componentInstance.dataForm = this.dataFormFilter;
    activeModal.componentInstance.filterData.subscribe(dataFiltered => {
      this.dataFormFilter = dataFiltered;
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.draw();
      });
    })
  }

  reportRangeAbsence(){
    //alert('test date range')
    const activeModal = this.modalService.open(FilterAbsencesDateRangeComponent, {
      size: 'lg',
      container: 'nb-layout',
      backdrop: 'static',
    });
    activeModal.componentInstance.dataForm = this.dataFormFilter;
    activeModal.componentInstance.filterData.subscribe(dataFiltered => {
      this.dataFormFilter = dataFiltered;
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.draw();
      });
    })
  }
}