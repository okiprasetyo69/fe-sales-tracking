import { Product } from '@Model/response-product';
import { User } from '@Model/response-user';

export interface PackingSlip {
  customer_code: string;
  id_packing_slip: string;
  product: Product[];
  sales_order_id?: any;
  status: string;
  user: User;
  is_confirm: number;
  customer_name: string;
}
