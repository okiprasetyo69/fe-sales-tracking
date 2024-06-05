import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MenuService } from '../../../../services/menu.service';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
import { NbThemeService } from '@nebular/theme';
import { SalesDashboardService } from '../../../../services/sales-dashboard.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';
import { ChartData } from 'app/abstract/ChartData';
import { HorizontalBarComponent } from '../../../_shared-components/chart/horizontal-bar/horizontal-bar.component';

// custom chart
import { PieComponent } from '../../../_shared-components/chart/pie/pie.component';
import { DoughnutComponent } from '../../../_shared-components/chart/doughnut/doughnut.component';
import { VerticalBarComponent } from '../../../_shared-components/chart/vertical-bar/vertical-bar.component';
import { RadarComponent } from '../../../_shared-components/chart/radar/radar.component';

// custom func
import { Router } from '@angular/router';
import { OauthService } from '../../../../services/oauth.service';

@Component({
  selector: 'ngx-sales-dashboard-index',
  templateUrl: './sales-dashboard-index.component.html',
  styleUrls: ['./sales-dashboard-index.component.scss'],
})
export class SalesDashboardIndexComponent implements OnInit, OnDestroy {

  @ViewChild('barPlan') viewBarPlan: HorizontalBarComponent;
  // @ViewChild('barCategory') viewBarCategory: HorizontalBarComponent;

  // @ViewChild('barInvoice') viewBarInvoice: HorizontalBarComponent;
  // @ViewChild('orderSales') viewOrderSales: HorizontalBarComponent;

  // custom
  // @ViewChild('pieCategoryVisit') viewPieCategoryVisit: PieComponent;
  // @ViewChild('pieCollectMethod') viewPieCollectMethod: PieComponent;
  @ViewChild('doughnutCategoryVisit') viewDoughnutCategoryVisit: DoughnutComponent;
  // @ViewChild('radarCategoryVisit') viewRadarCategoryVisit: RadarComponent;
  // @ViewChild('verticalCategoryVisit') viewVerticalCategoryVisit: VerticalBarComponent;

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
  dateStringTitle = this.default_date;

  serverErrors = [];

  name: string;
  dataSetting: FormGroup;

  totalVisit;
  totalPlan;
  category_visit: any;
  data_category_visit: Array<any> = [];
  data_collect_method: Array<any> = [];

  totalVisitCollector;
  totalPlanCollector;

  totalInvoice;
  totalInvoicePaid;
  totalInvoiceAmount;
  totalInvoiceAmountPayment;
  totalPaymentConfirmed;
  totalRequestOrder;
  totalSalesOrder;

  allOrder;

  barPlan = [];
  pieInvoice = [];

  barCategory = [];
  pieCategoryVisit = [];
  doughnutCategoryVisit = [];
  pieCollectMethod: Array<any> = [];
  radarCategoryVisit = [];
  verticalCategoryVisit = [];

  start_date: any;

  color = Chart.helpers.color;

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

  profileUser: any;

  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService,
    private themeService: NbThemeService,
    private salesDashboardService: SalesDashboardService,
    private fb: FormBuilder,
    private router: Router,
    private oauth: OauthService,
  ) {
  }

  ngOnInit() {
    this.profileUser = this.oauth.getProfile();

    this.dataSetting = this.fb.group({
      start_date: this.start_date,
      end_date: null,
    });
    this.prepareFilterForm();

    this.dynamicDashboard();
  }

  dynamicDashboard() {
    this.salesDashboardService.planDonut_with_filter(this.dataFormFilter).pipe(untilDestroyed(this)).subscribe(res => {
      //chart bar - sales
      this.totalVisit = res.data.total_visit_actual.visited;
      this.totalPlan = res.data.total_visit_actual.plan;
      this.barPlan = [];
      this.barPlan.push({
        'Plan': { 'Value': this.totalPlan, },
      });
      this.barPlan.push({
        'Visit': { 'Value': this.totalVisit, },
      });
      this.viewBarPlan.emit(this.barPlan, [new ChartData('Value')]);
      
      // chart doughnut - sales category visit
      this.doughnutCategoryVisit = [];
      this.data_category_visit = [];

      let keys = Object.keys(res.data.category_visit);
      for(var i=0; i<keys.length; i++){
        let dough = {};
        let key = keys[i];
        let val = res.data.category_visit[key];
        dough['label'] = key;
        dough['value'] = val;
        this.doughnutCategoryVisit.push(dough);
        // table
        this.data_category_visit.push(dough);
      }
      this.viewDoughnutCategoryVisit.emitingData(this.doughnutCategoryVisit);

    });


    // custom collector
    // this.salesDashboardService.collectDonut_with_filter(this.dataFormFilter).pipe(untilDestroyed(this)).subscribe(res => {      
    //   this.totalVisitCollector = res.data.total_visit_actual.visited;
    //   this.totalPlanCollector = res.data.total_visit_actual.plan;
    //   this.barPlan = [];
    //   this.barPlan.push({
    //     'Plan': { 'Value': this.totalPlanCollector, },
    //   });
    //   this.barPlan.push({
    //     'Visit': { 'Value': this.totalVisitCollector, },
    //   });
    //   this.viewBarInvoice.emit(this.barPlan, [new ChartData('Value')]);

    //   this.pieCollectMethod = [];
    //   this.data_collect_method = [];
      
    //   // custom       
    //   let keys = Object.keys(res.data.collect_method);
      
    //   for(var i=0; i<keys.length; i++){
    //     // pie
    //     let pie = {};
    //     let key = keys[i];
    //     let val = res.data.collect_method[key];
    //     pie['label'] = key;
    //     pie['value'] = val;        
    //     this.pieCollectMethod.push(pie);
    //     // table
    //     this.data_collect_method.push(pie);
    //   }

    //   // this.viewBarCategory.emit(barCategory, [new ChartData('Category visit')]);
    //   this.viewPieCollectMethod.emitingData(this.pieCollectMethod);      
    // });


    // this.salesDashboardService.invoiceDonut_with_filter(this.dataFormFilter).pipe(untilDestroyed(this)).subscribe(res => {
    //   console.info('Invoice');
    //   console.info(res);
    //   this.totalInvoice = res.data.total_invoice_payment.invoice;
    //   this.totalInvoicePaid = res.data.total_invoice_payment.payment;
    //   this.totalInvoiceAmount = res.data.total_amount.invoice;
    //   this.totalInvoiceAmountPayment = res.data.total_amount.payment_wo;
    //   this.totalPaymentConfirmed = res.data.total_amount.payment;
    //   this.pieInvoice = [];
    //   this.pieInvoice.push({
    //     'Invoice': {
    //       'Value': this.totalInvoice,
    //     },
    //   });
    //   this.pieInvoice.push({
    //     'Paid': {
    //       'Value': this.totalInvoicePaid,
    //     },
    //   });
    //   this.viewBarInvoice.emit(this.pieInvoice, [new ChartData('Value')]);
    // });

    // this.salesDashboardService.orders_with_filter(this.dataFormFilter).pipe(untilDestroyed(this)).subscribe(data => {
    //   console.info('Orders');
    //   console.info(data);
    //   // Menampung data pada variabel
    //   this.totalRequestOrder = data.data.total_ro_so['Request Order']; // Untuk request order ( Order Sales )
    //   this.totalSalesOrder = data.data.total_ro_so['Sales Order']; // Untuk Sales Order
    //   this.allOrder = data.data.data_ro_so; // Menyimpan seluruh data so dan ro
    //   this.viewOrderSales.emit(this.allOrder, [new ChartData('Request Order'), new ChartData('Sales Order', true)]);
    // });
  }

  prepareFilterForm() {
    this.dataFormFilter = this.fb.group({
      date_start: null,
      date_end: null,
    });
    this.dataFormFilter.patchValue({date_start: this.default_date});
    this.dataFormFilter.patchValue({date_end: this.default_date});
  }

  autoDigit(number) {
    return (number < 10) ? '0'.concat(number) : number;
  }

  onDateStartChanged(event: IMyDateModel) {
    const value = {};
    if (event.epoc == 0) {
      value['date_start'] = null;
    } else {
      value['date_start'] = event.formatted;
    }
    this.dataFormFilter.patchValue(value);
    const errorCounted = this.validateDate();
  }

  onDateEndChanged(event: IMyDateModel) {
    const value = {};
    if (event.epoc == 0) {
      value['date_end'] = null;
    } else {
      value['date_end'] = event.formatted;
    }
    this.dataFormFilter.patchValue(value);
    const errorCounted = this.validateDate();
  }

  validateDate() {
    let dataError = [];
    let errorCounted = 0;

    const current_date_start = this.dataFormFilter.controls['date_start'].value;
    const current_date_start_splited = this.dataFormFilter.controls['date_start'].value.split('-');
    const current_day_start = current_date_start_splited[2];
    const current_month_start = current_date_start_splited[1];
    const current_year_start = current_date_start_splited[0];

    const current_date_end = this.dataFormFilter.controls['date_end'].value;
    const current_date_end_splited = this.dataFormFilter.controls['date_end'].value.split('-');
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
      const default_date = this.default_date;
      const start_date = current_date_start;
      const end_date = current_date_end;

      let stringData = '';
      if (start_date === default_date && end_date === default_date) {
        this.dateStringTitle = default_date;
      } else {
        if (start_date === default_date) {
          stringData = default_date;
        } else {
          stringData = start_date;
        }
        stringData = stringData.concat(' - ');
        if (end_date === default_date) {
          stringData = stringData.concat(' ').concat(default_date);
        } else {
          stringData = stringData.concat(end_date);
        }
        this.dateStringTitle = stringData;
      }

      this.dynamicDashboard();
    }
    return errorCounted;
  }

  gotoVisitPerformanceChart(job_function:String){
    this.router.navigate([`/pages/sales/dashboard/detail/performance/visit/${job_function}`]).then();
  }

  gotoSalesPerformanceChart(job_function:String){
    this.router.navigate([`/pages/sales/dashboard/detail/performance/sales/${job_function}`]).then();
  }

  gotoTrackingDeliveryBySales(job_function:String){
    this.router.navigate([`/pages/sales/dashboard/detail/tracking-delivery/${job_function}`]).then();
  }

  ngOnDestroy() {
    //
  }

  reload(): void {
    console.info("reload function");
    
  }

}
