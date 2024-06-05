import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/Observable';
import {Location} from '@angular/common';
import { dropdown_limit } from '../configs/configs';
import {DefaultResponse} from "@Model/response-default";
import {Customer} from "@Model/response-customer";

// custom
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';


class CustomerData {
  public id: number;
  public name: string;
}

@Injectable()
export class CustomerService {
  form_data: Array<any> = [];

  private dataParams = new BehaviorSubject({});
  globalParams = this.dataParams.asObservable();

  customerCategory = [
    {
      key: 'End user',
      value: 'End user',
    },
    {
      key: 'Konsultan',
      value: 'Konsultan',
    },
    {
      key: 'Pemborong',
      value: 'Pemborong',
    },
    {
      key: 'Developer',
      value: 'Developer'
    },
    {
      key: 'Penyalur',
      value: 'Penyalur'
    },
    {
      key: 'Government',
      value: 'Government'
    }
  ];

  constructor(
    private apiService: ApiService,
    private location: Location,
    ) {
  }

  index(): Observable<any> {
    return this.apiService.get_py(`/customer`).map(data => data);
  }

  index_dropdown(): Observable<any> {
    return this.apiService.get_py(`/customer`, {
      page: 1,
      limit: dropdown_limit.max,
      dropdown: true,
      order_by_column: 'create_date',
      order_direction: 'desc',
    }).map(data => data);
  }

  dropdown_customer_searchable(term): Observable<any> {
    let limit = dropdown_limit.max;
    if (term == '') {
      limit = dropdown_limit.min;
    }
    
    //Syntax before 
    return this.apiService.get_py(`/customer/only_assigned`, {
      page: 1,
      limit: limit,
      search: term,
      dropdown: true,
      order_by_column: 'name',
      order_direction: 'asc',
    }).map(data => data);
    
    
    /*
    return this.apiService.get_py(`/customer`, {
      page: 1,
      limit: limit,
      search: term,
      dropdown: true,
      order_by_column: 'name',
      order_direction: 'asc',
    }).map(data => data);
    */
  }

  all_customer_searchable(term): Observable<any> {
    let limit = dropdown_limit.max;
    if (term == '') {
      limit = dropdown_limit.min;
    }
    return this.apiService.get_py(`/customer`, {
      page: 1,
      limit: limit,
      search: term,
      order_by_column: 'name',
      order_direction: 'asc',
    }).map(data => data);
  }

  store(payload): Observable<any> {
    return this.apiService
      .post_py(
        '/customer',
        payload,
      ).map(data => data);
  }

  show(id): Observable<DefaultResponse<Customer>> {
    return this.apiService.get_py(`/customer/${id}`)
      .map(data => data);
  }

  update(payload, id): Observable<any> {
    return this.apiService
      .put_py(
        '/customer/' + id,
        payload,
      ).map(data => data);
  }

  save(payload, id) {
    if (!!id) {
      return this.update(payload, id);
    } else {
      return this.store(payload);
    }
  }

  // list_parent() {
  //   return this.apiService.get_py(
  //     '/customer/parent?page=1&limit=50',
  //   ).map(data => data);
  // }

  postFile(fileToUpload: File): Observable<boolean> {
    const formData: FormData = new FormData();
    formData.append('files', fileToUpload, fileToUpload.name);
    return this.apiService
      .upload_py('/customer/import', formData);
  }

  indexDatatables(payload, module): Observable<any> {
    let url_path;
    if (module === 'sales') {
      url_path = 'pages/customers/sales/index/page';
    } else if (module === 'logistic') {
      url_path = 'pages/customers/logistic/index/page';
    } else if (module === 'settings') {
      url_path = 'pages/settings/customers/index/page';
    }

    const params = {
      page: (payload.start / payload.length) + 1,
      limit: payload.length,
      search: payload.search.value,
      order_by_column: payload.columns[payload.order[0].column].data,
      order_direction: payload.order[0].dir,
    };

    this.location.replaceState(url_path,
      'start=' + payload.start +
      '&length=' + payload.length +
      '&search=' + payload.search.value +
      '&order_col=' + payload.order[0].column +
      '&order_dir=' + payload.order[0].dir,
    );

    return this.apiService
      .get_py(
        '/customer',
        params,
      ).map(data => data);
  }

  indexDatatablesOrder(payload, id): Observable<any> {
    const params = {
      page: (payload.start / payload.length) + 1,
      limit: payload.length,
      search: payload.search.value,
      order_by_column: payload.columns[payload.order[0].column].data,
      order_direction: payload.order[0].dir,
    };
    return this.apiService
      .get_py(
        '/sales/request?customer_code=' + id,
        params,
      ).map(data => data);
  }

  // pisah request backend jika parameter id:integer => get_delivery_by_delivery_id
  // jika parameter id:string => get_delivery_by_customer
  // fungis indexDatatablesDeliveriesCustomer hanya di komponen edit customer

  indexDatatablesDeliveriesCustomer(payload, id): Observable<any> {
    console.info('index datatables Deliveries Customer');
    const params = {
      page: (payload.start / payload.length) + 1,
      limit: payload.length,
      search: payload.search.value,
      order_by_column: payload.columns[payload.order[0].column].data,
      order_direction: payload.order[0].dir,
    };
    return this.apiService
      .get_py(
        '/delivery_by_customer/' + id,
        params,
      ).map(data => data);
  }

  indexDatatablesDeliveries(payload, id): Observable<any> {
    console.info('index datatables Deliveries default');
    const params = {
      page: (payload.start / payload.length) + 1,
      limit: payload.length,
      search: payload.search.value,
      order_by_column: payload.columns[payload.order[0].column].data,
      order_direction: payload.order[0].dir,
    };
    return this.apiService
      .get_py(
        '/delivery/' + id,
        params,
      ).map(data => data);
  }

  delete(id): Observable<any> {
    return this.apiService
      .delete_py(
        '/customer/' + id,
      ).map(data => data);
  }

  // custom function
  updateCustomerBatch(payload): Observable<any> {    
    console.info("payload : " + payload);
    return this.apiService.post_py(
        '/customer/import/update', payload
      ).map(data => data);
  }

  // custom data table, hanya menampilkan customer yang sudah terdaftar saja kepada user (jika bukan admin)
  indexDatatablesOnlyAssigned(payload, module, dataFormFilter): Observable<any> {
    // console.log("dataFormFilter : ", dataFormFilter.controls);
    // const customer_code = dataFormFilter.controls['customer_code'].value;
    // const customer_name = dataFormFilter.controls['customer_name'].value;
    // const customer_parent = dataFormFilter.controls['customer_parent'].value;
    // const category = dataFormFilter.controls['category'].value;

    const paramsExtra = this.paramsFilter(payload, dataFormFilter);

    let url_path;
    if (module === 'sales') {
      url_path = 'pages/customers/sales/index/page';
    } else if (module === 'logistic') {
      url_path = 'pages/customers/logistic/index/page';
    } else if (module === 'settings') {
      url_path = 'pages/settings/customers/index/page';
    }

    // const params = {
    //   page: (payload.start / payload.length) + 1,
    //   limit: payload.length,
    //   search: payload.search.value,
    //   order_by_column: payload.columns[payload.order[0].column].data,
    //   order_direction: payload.order[0].dir,
    //   code: (customer_code != null ? JSON.stringify(customer_code) : ''),
    //   name: (customer_name != null ? JSON.stringify(customer_name) : ''),
    //   parent: (customer_parent != null ? JSON.stringify(customer_parent) : ''),
    //   category: (category != null ? JSON.stringify(category) : '')
    // };

    console.log("paramsExtra ", paramsExtra);

    this.location.replaceState(url_path,
      'start=' + payload.start +
      '&length=' + payload.length +
      '&search=' + payload.search.value +
      '&order_col=' + payload.order[0].column +
      '&order_dir=' + payload.order[0].dir,
    );

    
    //Syntax Before
    return this.apiService
      .get_py(
        '/customer/only_assigned',
        paramsExtra,
      ).map(data => data);
    

    /*
    return this.apiService
      .get_py(
        '/customer',
        paramsExtra,
      ).map(data => data);
      */
  }

  // custom
  private paramsFilter(payload, dataFormFilter: FormGroup) {
    const date_start = dataFormFilter.controls['date_start'].value;
    const date_end = dataFormFilter.controls['date_end'].value;
    const data_filter_by = dataFormFilter.controls['data_filter_by'].value;
    // const user_id = dataFormFilter.controls['user_id'].value;
    // const branch_id = dataFormFilter.controls['branch_id'].value;
    // const division_id = dataFormFilter.controls['division_id'].value;
    // const username = dataFormFilter.controls['username'].value;

    const code = dataFormFilter.controls['customer_code'].value;
    // const name = dataFormFilter.controls['customer_name'].value;
    const parent_code = dataFormFilter.controls['customer_parent'].value;
    const category = dataFormFilter.controls['category'].value;
    const contain = dataFormFilter.controls['contain'].value;

    let paramsExtra = {};
    const params = {
      page: (payload.start / payload.length) + 1,
      limit: payload.length,
      search: payload.search.value,
      order_by_column: payload.columns[payload.order[0].column].data,
      order_direction: payload.order[0].dir,
      type: 'web',
    };

    this.dataParams.next(params);
    if (data_filter_by == 2) {
      if ((date_start != null && date_start != '') && (date_end != null && date_end != '')) {
        paramsExtra = params;
        Object.assign(paramsExtra, {
          page_filter: JSON.stringify(
            [{
              start_date: date_start,
              end_date: date_end,
              code: code,
              contain: contain,
              parent_code: parent_code,
              category: category,
            }]),
        });
      } else {
        paramsExtra = params;
        if (!this.checkArrayIsEmpty(code) || !this.checkArrayIsEmpty(name) || !this.checkArrayIsEmpty(parent) || !this.checkArrayIsEmpty(category)) {
          Object.assign(paramsExtra, {
            page_filter: JSON.stringify([{
              start_date: '',
              end_date: '',
              code: code,
              contain: contain,
              parent_code: parent_code,
              category: category,
            }]),
          });
        }
      }
    } else {
      paramsExtra = params;
      if (!this.checkArrayIsEmpty(category) || !this.checkArrayIsEmpty(parent_code)) {
        Object.assign(paramsExtra, {
          page_filter: JSON.stringify([{
            start_date: '',
            end_date: '',
            code: code,
            contain: contain,
            parent_code: parent_code,
            category: category,
          }]),
        });
      }
    }
    return paramsExtra;
  }

  private checkArrayIsEmpty(data) {
    if (data == null) {
      return true;
    } else {
      if (data.length == 0) {
        return true;
      } else {
        return false;
      }
    }
  }

  exportExcel(payload, dataFormFilter: FormGroup): Observable<any> {
    const paramsExtra = this.paramsFilter(payload, dataFormFilter);
    return this.apiService.exportExcel('/customer/export3', paramsExtra).map(data => data);
  }

  getCustomerParentList(){
    const params = {
      type: 'web',
      field: 'parent_code'
    }
    return this.apiService.post_py('/customer/query', params).map(data=>data);
  }

  customerGetParents(): Observable<any> {
    const params = {
      field: 'parent_code',
      type: 'web'
    };
    return this.apiService.post_py('/customer/query', params).map(data => data);
  }

}
