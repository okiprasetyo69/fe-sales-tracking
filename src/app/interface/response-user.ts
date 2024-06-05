// Created by supan adit pratama<supan.aditp@xenos.co.id>

import { Collector, EmployeeSales } from '@Model/response-employee';

export interface User {
  id: number;
  branch_id: number;
  branch_name: string;
  employee_id: number;
  name: string;
  username: string;
}

export interface UserSales extends User {
  division_id: number;
  division_name: string;
}

export interface UserLogistic extends User {
}

export interface UserResponseInterface {
  approval_by: number;
  area: any;
  area_id?: any;
  branch: Branch;
  branch_id: number;
  branch_privilege_id: string;
  create_by?: any;
  create_date: string;
  customer_id: string;
  division: Division;
  division_id: number;
  division_privilege_id: string;
  edit_data?: any;
  email: string;
  employee: EmployeeSales;
  employee_id: number;
  handle_division_id?: any;
  id: number;
  is_approval: number;
  is_delete_approval: number;
  is_delete_approval_by?: any;
  is_delete_count: number;
  is_deleted: number;
  is_super_admin: number;
  max_account_usages: number;
  mobile_device_id?: any;
  mobile_no_id?: any;
  password: string;
  permissions: Permissions;
  printer_device_id?: any;
  update_date: string;
  user_group: Usergroup;
  user_group_id: number;
  username: string;
}

export class UserResponseClass implements UserResponseInterface {
  approval_by: number;
  area: any;
  area_id: any;
  branch: Branch;
  branch_id: number;
  branch_privilege_id: string;
  create_by: any;
  create_date: string;
  customer_id: string;
  division: Division;
  division_id: number;
  division_privilege_id: string;
  edit_data: any;
  email: string;
  employee: EmployeeSales;
  employee_id: number;
  handle_division_id: any;
  id: number;
  is_approval: number;
  is_delete_approval: number;
  is_delete_approval_by: any;
  is_delete_count: number;
  is_deleted: number;
  is_super_admin: number;
  max_account_usages: number;
  mobile_device_id: any;
  mobile_no_id: any;
  password: string;
  permissions: Permissions;
  printer_device_id: any;
  update_date: string;
  user_group: Usergroup;
  user_group_id: number;
  username: string;

  constructor(userResponseInterface: UserResponseInterface) {
    this.approval_by = userResponseInterface.approval_by;
    this.area = userResponseInterface.area;
    this.area_id = userResponseInterface.area_id;
    this.branch = userResponseInterface.branch;
    this.branch_id = userResponseInterface.branch_id;
    this.branch_privilege_id = userResponseInterface.branch_privilege_id;
    this.create_by = userResponseInterface.create_by;
    this.create_date = userResponseInterface.create_date;
    this.customer_id = userResponseInterface.customer_id;
    this.division = userResponseInterface.division;
    this.division_id = userResponseInterface.division_id;
    this.division_privilege_id = userResponseInterface.division_privilege_id;
    this.edit_data = userResponseInterface.edit_data;
    this.email = userResponseInterface.email;
    this.employee = userResponseInterface.employee;
    this.employee_id = userResponseInterface.employee_id;
    this.handle_division_id = userResponseInterface.handle_division_id;
    this.id = userResponseInterface.id;
    this.is_approval = userResponseInterface.is_approval;
    this.is_delete_approval = userResponseInterface.is_delete_approval;
    this.is_delete_approval_by = userResponseInterface.is_delete_approval_by;
    this.is_delete_count = userResponseInterface.is_delete_count;
    this.is_deleted = userResponseInterface.is_deleted;
    this.is_super_admin = userResponseInterface.is_super_admin;
    this.max_account_usages = userResponseInterface.max_account_usages;
    this.mobile_device_id = userResponseInterface.mobile_device_id;
    this.mobile_no_id = userResponseInterface.mobile_no_id;
    this.password = userResponseInterface.password;
    this.permissions = userResponseInterface.permissions;
    this.printer_device_id = userResponseInterface.printer_device_id;
    this.update_date = userResponseInterface.update_date;
    this.user_group = userResponseInterface.user_group;
    this.user_group_id = userResponseInterface.user_group_id;
    this.username = userResponseInterface.username;
  }

  getCollectorType(): Collector {
    return Collector.fromEmployeeSales(this.employee);
  }
}


export interface Usergroup {
  asset: Asset;
  code: string;
  group_name: string;
  have_asset: number;
  id: number;
}

interface Asset {
  mobile_phone: boolean;
  printer: boolean;
}


interface Permissions {
  assets: any;
  dashboard: any;
  livemap: any;
  logistic: any;
  sales: any;
  setting: any;
  // custom
  collector: any;
}

interface Division {
  division_code: string;
  division_name: string;
  id: number;
}

interface Branch {
  address: string;
  area_id: number;
  branch_code: string;
  division_id: number[];
  email?: any;
  id: number;
  lat: number;
  lng: number;
  name: string;
  nfcid: string;
  phone?: any;
  working_day_end: string;
  working_day_start: string;
  working_hour_end: string;
  working_hour_start: string;
}

export interface UserVisitEye {
  username: string;
  customer_id: Array<string>;
}
