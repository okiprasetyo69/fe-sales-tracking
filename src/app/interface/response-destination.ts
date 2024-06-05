// Created by supan adit pratama<supan.aditp@xenos.co.id>

export interface DestinationSimple {
  customer_code: string;
  order_route?: any;
  note?: any;
  customer_name: string;
  address: string;
}

export interface Destination extends DestinationSimple {
  customer_email?: any;
  invoice: any[];
  lat: number;
  lng: number;
  nfcid: string;
  phone: string;
  pic_job_position: string;
  pic_mobile: string;
  pic_name: string;
  pic_phone: string;
  total_invoice: number;
}
