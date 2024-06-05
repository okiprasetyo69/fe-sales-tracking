export interface CompetitorImage {
  desc: string;
  image: string;
  create_date: string;
}

export interface Notifications {
  delivery_received?: any;
  delivery_rejected?: any;
  invoice_reminder?: any;
  nfc_not_read?: any;
  payment_confirmation?: any;
  payment_receipt_not_read?: any;
  payment_received?: any;
  request_order_create?: any;
  sales_order_return?: any;
  sales_order_status_changed?: any;
  visit_plan_reminder?: any;
}

export interface Contact {
  email?: string;
  job_position: string;
  mobile: string;
  name: string;
  note?: any;
  notifications: Notifications;
  phone?: string;
}

export interface ListContact {
  email: string;
  mobile: string;
  name: string;
  phone: string;
}

export interface CustomerSimple {
  address: string;
  code: string;
  contacts?: Contact[];
  lat: number;
  lng: number;
  name: string;
}

export interface Customer extends CustomerSimple {
  approval_by: number;
  branch: any[];
  business_activity: string[];
  competitor_images?: CompetitorImage[];
  create_by?: any;
  create_date?: any;
  edit_data?: any;
  email?: any;
  import_by: number;
  import_date: string;
  is_approval: number;
  is_branch: number;
  is_delete_approval: number;
  is_delete_approval_by?: any;
  is_deleted: number;
  list_address: string[];
  list_contacts: ListContact[];
  nfcid: string;
  parent_code?: any;
  password?: any;
  phone: string;
  update_date: string;
  username?: any;
  customer_branch?: any;
  data_statistic_total?: any;
  /** custom field */
  category: any;
}

// Customer Visit & Delivery

export interface CustomerVisitDelivery {
  area: Area[];
  customer: Customer[];
  customer_gantt: CustomerGantt[];
}

export interface Area {
  approval_by: number;
  create_by: number;
  create_date: string;
  description?: any;
  edit_data?: any;
  id: number;
  is_approval: number;
  is_delete_approval: number;
  is_delete_approval_by?: any;
  is_deleted: number;
  marker_color: string;
  marker_type: string;
  markers: Marker[];
  name: string;
  update_date: string;
}

export interface CustomerGantt {
  desc: string;
  name: string;
  values: ValueGantt[];
}

export interface ValueGantt {
  desc: string;
  from: string;
  label: number;
  to: string;
}

export interface Marker {
  lat: number;
  lng: number;
}

