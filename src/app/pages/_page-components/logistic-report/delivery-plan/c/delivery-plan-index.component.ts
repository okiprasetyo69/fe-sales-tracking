import { Component, OnDestroy, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { datatable_configs } from '../../../../../configs/configs';
import { formatDate, Location } from '@angular/common';
import { ToasterService } from 'angular2-toaster';
import { MenuService } from '../../../../../services/menu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LogisticReportDeliveryPlanService } from '../../../../../services/logistic-report-delivery-plan.service';
import { OauthService } from '../../../../../services/oauth.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { ExcelService } from '../../../../../services/excel.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as fileSaver from 'file-saver';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { FilterDeliveryPlanComponent } from '../entry/filter-delivery-plan.component';
import { PlanSummaryComponent } from '../../../../_shared-components/plan-summary/plan-summary.component';
import { DeliveryPlanReport, PlanSummaryType, VisitPlanReport } from '@Model/response-plan';

@Component({
    selector: 'ngx-delivery-plan-index',
    templateUrl: './delivery-plan-index.component.html',
    styleUrls: ['./delivery-plan-index.component.scss'],
})
export class DeliveryPlanIndexComponent implements OnInit, OnDestroy {
    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;

    datasets: DeliveryPlanReport[] = [];
    dtOptions: any = {};
    dtParams: any;
    page_start: number = datatable_configs.page_start;
    page_length: number = datatable_configs.page_length;
    page_search: string = datatable_configs.page_search;
    page_order_col: number = datatable_configs.page_order_col;
    page_order_dir: string = datatable_configs.page_order_dir;
    startNumber: number = datatable_configs.page_start;
    profileUser;
    seeDetail = false;
    dataDetail: DeliveryPlanReport;
    dataDestination = [];
    dataDifference = [];

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

    summaryCompetitorView = false;
    summaryCompetitorViewLabel = 'View Summary & Competitor';

    readonly planSummaryType: PlanSummaryType = PlanSummaryType.DeliveryPlan();

    plan: VisitPlanReport;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private toasterService: ToasterService,
        private location: Location,
        private menuService: MenuService,
        private logisticReportDeliveryPlanService: LogisticReportDeliveryPlanService,
        private oauthService: OauthService,
        private excelService: ExcelService,
        private modalService: NgbModal,
        private fb: FormBuilder,
    ) {
    }

    ngOnInit() {
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
                this.getDatatable();
            });
        this.prepareFilterForm();
    }

    prepareFilterForm() {
        this.dataFormFilter = this.fb.group({
            date_start: null,
            date_end: null,
            data_filter_by: null,
            user_id: [],
            username: [],
            branch_id: [],
        });
        this.dataFormFilter.patchValue({date_start: this.default_date});
        this.dataFormFilter.patchValue({date_end: this.default_date});
        this.dataFormFilter.patchValue({data_filter_by: 1});
    }

    autoDigit(number) {
        return (number < 10) ? '0'.concat(number) : number;
    }

    getDatatable() {
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
                this.logisticReportDeliveryPlanService.indexDatatables(dataTablesParameters, this.dataFormFilter)
                    .pipe(untilDestroyed(this))
                    .subscribe(resp => {
                        this.datasets = resp.data.data;
                        console.info(resp);
                        callback({
                            recordsTotal: resp.data.total,
                            recordsFiltered: resp.data.total_filter,
                            data: !!resp.data.total ? [{
                                no: '',
                                date: '',
                                id: '',
                                sales_rep: '',
                                branch: '',
                                breaktime: '',
                                visited: '',
                                visit_time: '',
                                driving: '',
                                plan: '',
                                alert: '',
                                permissions: '',
                                cancel: '',
                                packing_slip: '',
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
                {data: 'no', orderable: false},
                {data: 'date', orderable: true},
                {data: 'id', orderable: true},
                {data: 'sales_rep', orderable: false},
                {data: 'branch', orderable: true},
                {title: 'Break Time', data: 'breaktime', orderable: false},
                {title: 'Visited', data: 'visited', orderable: false},
                {title: 'Visit Time', data: 'visit_time', orderable: false},
                {title: 'Driving', data: 'driving', orderable: false},
                {title: 'Plan', data: 'plan', orderable: false},
                {title: 'Alert', data: 'alert', orderable: false},
                {title: 'Permission', data: 'permissions', orderable: false},
                {data: 'cancel', orderable: false},
                {title: 'Packing Slip', data: 'packing_slip', orderable: false},
                {data: 'action', orderable: false},
            ],
        };
    }

    print() {
        const start_date = this.dataFormFilter.controls['date_start'].value;
        const end_date = this.dataFormFilter.controls['date_end'].value;
        console.info('Print');
        let popupWin, x, table, row, i;
        i = 0;
        table = '';
        for (x of this.datasets) {
            // @ts-ignore
            const date = new Date(x.date);
            const dataTotal = Object.keys(x.data_activity).length;
            const totalActual = String((dataTotal <= 1) ? 0 : (dataTotal - 1));
            i = i + 1;
            row = '';
            row += '<tr>';
            row += '<td>' + i + '</td>';
            row += '<td>' + (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear() + '</td>';
            row += '<td>' + x.user.name + '</td>';
            row += '<td>' + x.user.branch_name + '</td>';
            row += '<td>' + x.data_performance.break_time + '</td>';
            row += '<td>' + x.data_performance.visited + '</td>';
            row += '<td>' + x.data_performance.visit_time + '</td>';
            row += '<td>' + x.data_performance.driving_time + '</td>';
            row += '<td>' + x.data_performance.plan + '</td>';
            row += '<td>' + x.data_performance.alert + '</td>';
            row += '<td>' + x.data_performance.permission + '</td>';
            row += '<td>' + x.data_performance.cancel + '</td>';
            row += '<td>' + x.data_performance.packing_slip + '</td>';
            row += '</tr>';
            table += row;
        }
        // document.getElementById('list_section').innerHTML;
        popupWin = window.open('', '_blank', 'width=500,toolbar=no,location=no');
        popupWin.document.open();
        popupWin.document.write(`
      <html>
        <head>
          <title id="title"></title>
          <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css"/>
          <style type="text/css" media="print">
            @page { size: landscape; }
          </style>
        </head>
        <body>
          <h1 class="page-header">Report Delivery Plan</h1>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>No.</th>
                <th>Date</th>
                <th>Sales Rep</th>
                <th>Branch</th>
                <th>Break Time</th>
                <th>Visited</th>
                <th>Stop Time</th>
                <th>Driving</th>
                <th>Plan</th>
                <th>Alert</th>
                <th>Permissions</th>
                <th>Cancel</th>
                <th>Packing Slip</th>
              </tr>
            </thead>
            <tbody id="list_section"></tbody>
          </table>
        </body>
      </html>
    `);
        popupWin.document.getElementById('title').innerHTML = 'Print By : ' + this.profileUser.username + ' - ' + this.profileUser.name;
        popupWin.document.getElementById('list_section').innerHTML = table;
        popupWin.print();
        popupWin.document.close();
    }

    export() {
        let x, i, row, data, row_place = '';
        i = 0;
        data = [];
        for (x of this.datasets) {
            i = i + 1;
            if (x.branch_name) {
                row_place = x.branch_name;
            } else {
                row_place = x.customer_code;
            }
            // @ts-ignore
            const date = new Date(x.date);
            row = {
                'No.': i,
                'Date': (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear(),
                'Sales Rep': x.user.name,
                'Branch': x.user.branch_name,
            };
            data.push(row);
        }
        this.excelService.exportAsExcelFile(data, 'logistic-visit');
    }

    openDetail(data) {
        this.dataDetail = data;
        this.seeDetail = true;
        this.plan = data;
    }

    toggleDetail() {
        if (this.seeDetail) {
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.draw();
            });
            Object.assign(this.dataDetail, {});
            this.seeDetail = false;
            this.summaryCompetitorView = false;
            this.summaryCompetitorViewLabel = 'View Summary & Competitor';
        } else {
            this.seeDetail = true;
        }
    }

    exportExcel() {
        this.toasterService.popAsync('info', 'Start Download', 'Generating, Pleasewait...');
        this.logisticReportDeliveryPlanService.exportExcel(this.dtParams, this.dataFormFilter).subscribe(data => {
                console.info(`excel data: ${data}`);
                fileSaver.saveAs(data, 'delivery-plan-report.xlsx');
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
                setTimeout(() => {
                    this.location.back();
                }, 2000);
            },
            () => console.info('Completed file download.'));
    }

    exportPdf() {
        this.toasterService.popAsync('info', 'Start Download', 'Generating, Pleasewait...');
        this.logisticReportDeliveryPlanService.exportPdf(this.dtParams, this.dataFormFilter).subscribe(data => {
                console.info(`pdf data: ${data}`);
                fileSaver.saveAs(data, 'delivery-plan-report.pdf');
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
            () => console.info('Completed file download.'),
        );
    }

    dataFilter() {
        const activeModal = this.modalService.open(FilterDeliveryPlanComponent, {
            size: 'lg',
            container: 'nb-layout',
            backdrop: 'static',
        });

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

    toggleSummaryCompetitorView() {
        if (this.summaryCompetitorView) {
            this.summaryCompetitorViewLabel = 'View Summary & Competitor';
            this.summaryCompetitorView = false;
        } else {
            this.summaryCompetitorViewLabel = 'View Timeline';
            this.summaryCompetitorView = true;
        }
    }


    ngOnDestroy() {
        //
    }
}

@Pipe({name: 'ActualVisit'})
export class ActualVisit implements PipeTransform {
    transform(dataActivity): string {
        const dataTotal = Object.keys(dataActivity).length;
        const result = String((dataTotal <= 1) ? 0 : (dataTotal - 1));
        return result;
    }
}
