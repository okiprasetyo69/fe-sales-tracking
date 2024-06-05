export interface ConfigurationGeneral {
  activate_permission: number;
  alert_break_time: number;
  alert_wrong_route: number;
  blacklist_apps: string;
  create_date?: any;
  id: number;
  invoicing_time: number;
  is_using_nfc: number;
  logo_image: string;
  max_breaktime_time: number;
  max_geofence_area: number;
  max_idle_time: number;
  max_length_unloading: number;
  max_length_visit_time: number;
  max_order_sales_to_sales_order_time_reguler: number;
  max_order_sales_to_sales_order_time_special: number;
  max_sales_order_to_packing_slip_time_reguler: number;
  max_sales_order_to_packing_slip_time_special: number;
  update_date: string;
  visit_cycle_start: string;
}
