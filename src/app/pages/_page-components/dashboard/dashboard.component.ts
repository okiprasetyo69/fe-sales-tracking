import { Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MenuService } from '../../../services/menu.service';
import { ActivatedRoute } from '@angular/router';
import { PieComponent } from '../../_shared-components/chart/pie/pie.component';
import { HorizontalBarComponent } from '../../_shared-components/chart/horizontal-bar/horizontal-bar.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Chart } from 'chart.js';
import { NbPopoverDirective, NbThemeService } from '@nebular/theme';
import { SalesDashboardService } from '../../../services/sales-dashboard.service';
import { LogisticDashboardService } from '../../../services/logistic-dashboard.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';
import { ChartData } from '../../../abstract/ChartData';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChildren(NbPopoverDirective) popoverComponents: QueryList<NbPopoverDirective>;
  @ViewChild('piePlan') viewPiePlan: PieComponent;
  @ViewChild('horizontalPlan') viewHorizontalPlan: HorizontalBarComponent;

  @ViewChild('horizontalBarCollector') horizontalBarCollector: HorizontalBarComponent;

  // @ViewChild('pieInvoice') viewPieInvoice: PieComponent;
  @ViewChild('barInvoice') viewBarInvoice: HorizontalBarComponent;

  @ViewChild('orderSales') viewOrderSales: HorizontalBarComponent;

  // @ViewChild('piePlanLogistic') viewPiePlanLogistic: PieComponent;
  @ViewChild('horizontalActual') viewPieBarLogistic: HorizontalBarComponent;
  @ViewChild('packingSlipBarLogistic') viewPackingSlipBarLogistic: HorizontalBarComponent;

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

  totalVisitCollector;
  totalPlanCollector;

  totalInvoice;
  totalInvoicePaid;
  totalInvoiceAmount;
  totalInvoiceAmountPayment;
  totalPaymentConfirmed;
  totalRequestOrder;
  totalSalesOrder;

  totalPlanLogistic;
  totalCancel;
  totalDelivery;

  // Packing slip
  totalPackingSlip;
  totalPackingSlipAccept;
  totalPackingSlipCancel;
  allPackingSlip;

  piePlanLogistic;

  allOrder;

  piePlan = [
    {label: 'Plan', value: 100, color: '#f0f'},
    {label: 'Visited', value: 10, color: '#ff0'},
  ];
  horizontalPlan = [];
  horizontalActual = [];

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

  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService,
    private themeService: NbThemeService,
    private salesDashboardService: SalesDashboardService,
    private fb: FormBuilder,
    private logisticDashboardService: LogisticDashboardService,
  ) {
  }

  ngOnInit() {
    this.dataSetting = this.fb.group({
      start_date: this.start_date,
      end_date: null,
    });

    this.prepareFilterForm();


    // this.salesDashboardService.activities().subscribe(data => {
    //   console.info('Activities');
    //   console.info(data);
    // });
    //
    // this.salesDashboardService.permission_alert().subscribe(data => {
    //   console.info('Permission Alert');
    //   console.info(data);
    // });
    //
    // this.salesDashboardService.report().subscribe(data => {
    //   console.info('Report');
    //   console.info(data);
    // });


    this.dynamicDashboard();

    // this.logisticDashboardService.report().subscribe(res => {
    //   console.info('Report');
    //   console.info(res);
    // });
  }

  dynamicDashboard() {

    this.salesDashboardService.planDonut_with_filter(this.dataFormFilter).pipe(untilDestroyed(this)).subscribe(res => {
      this.totalVisit = res.data.total_visit_actual.visited;
      this.totalPlan = res.data.total_visit_actual.plan;
      this.piePlan = [];
      this.horizontalPlan = [];
      this.piePlan.push({label: 'Plan', value: this.totalPlan, color: 'red'});
      this.piePlan.push({label: 'Visit', value: this.totalVisit, color: 'blue'});
      this.horizontalPlan.push({
        'Plan': {
          'Value': this.totalPlan,
        },
      });
      this.horizontalPlan.push({
        'Visit': {
          'Value': this.totalVisit,
        },
      });
      this.viewHorizontalPlan.emit(this.horizontalPlan, [new ChartData('Value')]);
    });

    // custom
    this.salesDashboardService.collectDonut_with_filter(this.dataFormFilter).pipe(untilDestroyed(this)).subscribe(res => {
      this.totalVisitCollector = res.data.total_visit_actual.visited;
      this.totalPlanCollector = res.data.total_visit_actual.plan;
      this.piePlan = [];
      this.horizontalPlan = [];
      this.piePlan.push({label: 'Plan', value: this.totalPlan, color: 'red'});
      this.piePlan.push({label: 'Visit', value: this.totalVisit, color: 'blue'});
      this.horizontalPlan.push({
        'Plan': {
          'Value': this.totalPlanCollector,
        },
      });
      this.horizontalPlan.push({
        'Visit': {
          'Value': this.totalVisitCollector,
        },
      });
      this.horizontalBarCollector.emit(this.horizontalPlan, [new ChartData('Value')]);
    });
    // custom end

    this.salesDashboardService.invoiceDonut_with_filter(this.dataFormFilter).pipe(untilDestroyed(this)).subscribe(res => {
      this.totalInvoice = res.data.total_invoice_payment.invoice;
      this.totalInvoicePaid = res.data.total_invoice_payment.payment;
      this.totalInvoiceAmount = res.data.total_amount.invoice;
      this.totalInvoiceAmountPayment = res.data.total_amount.payment_wo;
      this.totalPaymentConfirmed = res.data.total_amount.payment;
    });

    this.logisticDashboardService.delivery_with_filter(this.dataFormFilter).pipe(untilDestroyed(this)).subscribe(res => {
      this.totalPlanLogistic = res.data.total_delivery_actual.plan;
      this.totalCancel = res.data.total_delivery_actual.cancel;
      this.totalDelivery = res.data.total_delivery_actual.delivery;

      this.piePlanLogistic = [];
      this.horizontalActual = [];
      this.piePlanLogistic.push({label: 'Plan', value: this.totalPlanLogistic, color: 'red'});
      this.piePlanLogistic.push({label: 'Delivery', value: this.totalDelivery, color: 'blue'});
      this.piePlanLogistic.push({label: 'Undelivered', value: this.totalCancel, color: 'green'});
      this.horizontalActual.push({
        'Plan': {
          'Value': this.totalPlanLogistic,
        },
      });
      this.horizontalActual.push({
        'Delivery': {
          'Value': this.totalDelivery,
        },
      });
      this.horizontalActual.push({
        'Undelivered': {
          'Value': this.totalCancel,
        },
      });
      this.viewPieBarLogistic.emit(this.horizontalActual, [new ChartData('Value')]);
    });

    // this.salesDashboardService.orders_with_filter(this.dataFormFilter).pipe(untilDestroyed(this)).subscribe(data => {
    //   // Menampung data pada variabel
    //   this.totalRequestOrder = data.data.total_ro_so['Request Order']; // Untuk request order ( Order Sales )
    //   this.totalSalesOrder = data.data.total_ro_so['Sales Order']; // Untuk Sales Order
    //   this.allOrder = data.data.data_ro_so; // Menyimpan seluruh data so dan ro
    //   this.viewOrderSales.emit(this.allOrder, [new ChartData('Request Order'), new ChartData('Sales Order', true)]);
    // });

    this.logisticDashboardService.packing_slip_with_filter(this.dataFormFilter).pipe(untilDestroyed(this)).subscribe(res => {
      this.totalPackingSlip = res.data.total_packing_slip.packing_slip;
      this.totalPackingSlipAccept = res.data.total_packing_slip.packing_slip_accept;
      this.totalPackingSlipCancel = res.data.total_packing_slip.packing_slip_cancel;
      this.totalSalesOrder = res.data.total_packing_slip.sales_order;
      this.allPackingSlip = res.data.data_packing_slip;

      this.viewPackingSlipBarLogistic.emit(this.allPackingSlip, [new ChartData('Packing Slip'), new ChartData('Accept'), new ChartData('Undelivered'), new ChartData('Sales Order', true)]);
    });

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

  ngOnDestroy() {
    //
  }
}
