import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MenuService} from '../../../../services/menu.service';
import {LogisticDashboardService} from '../../../../services/logistic-dashboard.service';
import {HorizontalBarComponent} from '../../../_shared-components/chart/horizontal-bar/horizontal-bar.component';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ChartData} from 'app/abstract/ChartData';

@Component({
  selector: 'ngx-logistic-dashboard-index',
  templateUrl: './logistic-dashboard-index.component.html',
  styleUrls: ['./logistic-dashboard-index.component.scss'],
})
export class LogisticDashboardIndexComponent implements OnInit, OnDestroy {
  @ViewChild('barPlan') viewBarPlan: HorizontalBarComponent;
  // @ViewChild('barSalesPacking') barSalesPacking: HorizontalBarComponent;
  @ViewChild('packingSlipBar') viewPackingSlipBar: HorizontalBarComponent;

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

  totalPlan;
  totalCancel;
  totalDelivery;

  // Packing slip
  totalPackingSlip;
  totalPackingSlipAccept;
  totalPackingSlipCancel;
  totalSalesOrder;
  allPackingSlip;

  piePlan;
  pieSalesPacking;

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
    private logisticDashboardService: LogisticDashboardService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.menuService.getMenuReloaded(this.route.snapshot.data['route_code']);
    this.prepareFilterForm();
    this.dynamicDashboard();
  }

  dynamicDashboard() {
    this.logisticDashboardService.delivery_with_filter(this.dataFormFilter).pipe(untilDestroyed(this)).subscribe(res => {
      console.info('Delivery');
      console.info(res);
      this.totalPlan = res.data.total_delivery_actual.plan;
      this.totalCancel = res.data.total_delivery_actual.cancel;
      this.totalDelivery = res.data.total_delivery_actual.delivery;

      this.piePlan = [];
      this.piePlan.push({
        'Plan': {
          'Value': this.totalPlan,
        },
      });
      this.piePlan.push({
        'Delivery': {
          'Value': this.totalDelivery,
        },
      });
      this.piePlan.push({
        'Undelivered': {
          'Value': this.totalCancel,
        },
      });
      this.viewBarPlan.emit(this.piePlan, [new ChartData('Value')]);
    });

    this.logisticDashboardService.packing_slip_with_filter(this.dataFormFilter).pipe(untilDestroyed(this)).subscribe(res => {
      console.info('Packing Slip');
      console.info(res);
      this.totalPackingSlip = res.data.total_packing_slip.packing_slip;
      this.totalPackingSlipAccept = res.data.total_packing_slip.packing_slip_accept;
      this.totalPackingSlipCancel = res.data.total_packing_slip.packing_slip_cancel;
      this.totalSalesOrder = res.data.total_packing_slip.sales_order;
      this.allPackingSlip = res.data.data_packing_slip;

      this.pieSalesPacking = [];
      this.pieSalesPacking.push({
        'Packing Slip': {
          'Value': this.totalPackingSlip,
        },
      });
      this.pieSalesPacking.push({
        'Sales Order': {
          'Value': this.totalPackingSlip,
        },
      });
      // this.barSalesPacking.emit(this.pieSalesPacking, [new ChartData('Value')]);

      this.viewPackingSlipBar.emit(this.allPackingSlip, [new ChartData('Packing Slip'), new ChartData('Accept'), new ChartData('Rejected'), new ChartData('Sales Order', true)]);
    });

    this.logisticDashboardService.report_with_filter(this.dataFormFilter).pipe(untilDestroyed(this)).subscribe(res => {
      console.info('Report');
      console.info(res);
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
