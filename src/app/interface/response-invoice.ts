import { Product } from "@Model/response-product";
import { CustomerSimple } from "@Model/response-customer";

// Created by supan adit pratama<supan.aditp@xenos.co.id>


export interface InvoiceSimpleInterface {
  id_invoice: string;
  is_confirm: number;
}

export interface InvoiceInterface extends InvoiceSimpleInterface {
  address: string;
  code: string;
  customer_code: string;
  customer_name: string;
  invoice_amount: number;
  invoice_due_date: string;
  packing_slip_code?: any;
  packing_slip_date: string;
  product: Product[];
  sales_order_id: string;
  invoice_code?: string;
  combined_name?: string;
  customer?: CustomerSimple;
}

export class Invoice implements InvoiceInterface {
  address: string;
  code: string;
  customer_code: string;
  customer_name: string;
  id_invoice: string;
  invoice_amount: number;
  invoice_due_date: string;
  is_confirm: number;
  packing_slip_code: any;
  packing_slip_date: string;
  product: Product[];
  sales_order_id: string;
  invoice_code: string;
  combined_name: string;
  customer: CustomerSimple;

  constructor(invoice: InvoiceInterface) {
    this.code = invoice.code;
    this.invoice_amount = invoice.invoice_amount;
    this.invoice_due_date = invoice.invoice_due_date;
    this.is_confirm = (invoice.is_confirm) ? invoice.is_confirm : 0;
    this.packing_slip_code = invoice.packing_slip_code;
    this.packing_slip_date = invoice.packing_slip_date;
    this.product = invoice.product;
    this.sales_order_id = invoice.sales_order_id;
    this.customer = invoice.customer;
    const customerName = (invoice.customer) ? invoice.customer.name : 'Customer Not Found';
    this.address = (invoice.customer) ? invoice.customer.address : "";
    this.customer_code = (invoice.customer) ? invoice.customer.code : "";
    this.customer_name = (invoice.customer) ? invoice.customer.name : "";
    this.combined_name = invoice.code.concat(" - ").concat(customerName);
    this.id_invoice = (invoice.id_invoice) ? invoice.id_invoice : invoice.code;
    this.invoice_code = (invoice.invoice_code) ? invoice.invoice_code : invoice.code;
  }

  toSimple(): InvoiceSimpleInterface {
    return {
      id_invoice: this.id_invoice,
      is_confirm: this.is_confirm,
    };
  }
}
