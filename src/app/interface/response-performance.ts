// Created by supan adit pratama<supan.aditp@xenos.co.id>

export interface DataPerformance {
  alert: number;
  break_time: number;
  cancel: number;
  driving_time: number;
  payment: number;
  payment_amount: number;
  payment_amount_wo_confirm: number;
  payment_cancel: number;
  payment_wo_confirm: number;
  permission: number;
  plan: number;
  report_location: number;
  report_nfc: number;
  report_print: number;
  reprint: number;
  request_order: number;
  request_order_special: number;
  sales_order: number;
  sales_order_amount: number;
  total_distance: number;
  visit_time: number;
  visited: number;
}

export interface DataPerformanceSales extends DataPerformance {
  invoice: number;
  invoice_amount: number;
}

export interface DataPerformanceLogistic extends DataPerformance {
  packing_slip: any;
}
