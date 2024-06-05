import { UserLogistic, UserSales } from '@Model/response-user';

export interface ResponseApproval<T> {
  approved_by?: any;
  approved_date?: any;
  approved_user: UserSales | UserLogistic;
  create_by: number;
  create_date: string;
  create_user: UserSales | UserLogistic;
  data: T;
  data_id: string;
  id: number;
  is_approved: number;
  is_rejected: number;
  prefix: string;
  rejected_by?: any;
  rejected_date?: any;
  rejected_user: UserSales | UserLogistic;
  type: string;
  update_date: string;
  // Key di bawah adalah key yang ada pada halaman approval tertentu
  is_branch?: any;
  lat?: any;
  lng?: any;
  data_activity?: any;
  date?: any;
  customer?: any;
}
