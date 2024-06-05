import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';

import { ApiService } from './api.service';
import { dropdown_limit } from '../configs/configs';
import { escape_me } from '../helper/ExtraFunction';
import { DefaultResponse, DefaultResponseClass } from '@Model/response-default';
import { VisitPlan, VisitPlanModel } from '@Model/response-plan';
import { UserResponseInterface } from '@Model/response-user';
import { Pagination } from '@Model/response-pagination';

@Injectable()
export class VisitCollectPlanService {

  constructor(
    private apiService: ApiService,
    private location: Location,
  ) {
  }

  index(): Observable<any> {
    return this.apiService.get(`/visit_cycle`)
      .map(data => data);
  }

  generate(payload): Observable<any> {
    return this.apiService
      .post_py(
        '/visit/plan/generate',
        payload,
      ).map(data => data);
  }

  generate_route(payload): Observable<any> {
    return this.apiService
      .post_py(
        '/route/generate',
        payload,
      ).map(data => data);
  }

  show(id): Observable<DefaultResponse<VisitPlan>> {
    return this.apiService.get_py(`/visit/plan/${id}`)
      .map(data => data);
  }

  update(payload, id): Observable<any> {
    return this.apiService
      .put_py(
        '/visit/plan/' + id,
        payload,
      ).map(data => data);
  }

  create(payload): Observable<any> {
    console.info('Payload Checked : ', payload);
    return this.apiService
      .post_py(
        '/visit/plan',
        payload,
      ).map(data => data);
  }

  indexByModule(module): Observable<any> {
    return this.apiService.get(`/visit_cycle/module/${module}`)
      .map(data => data);
  }

  indexByGroups(module): Observable<any> {
    return this.apiService.get(`/visit_cycle_groups`)
      .map(data => data);
  }

  indexDatatables(payload): Observable<DefaultResponse<Pagination<VisitPlanModel>>> {
    const params = {
      page: (payload.start / payload.length) + 1,
      limit: payload.length,
      search: payload.search.value,
      order_by_column: payload.columns[payload.order[0].column].data,
      order_direction: payload.order[0].dir,
      type: 'web',
    };

    this.location.replaceState('pages/collector/activities/collect_plan/index/page',
      'start=' + payload.start +
      '&length=' + payload.length +
      '&search=' + payload.search.value +
      '&order_col=' + payload.order[0].column +
      '&order_dir=' + payload.order[0].dir +
      '&type=' + 'web');

    console.info("this line was executed");

    return this.apiService
      .get_py(
        '/visit/plan/collector',
        params,
      ).map(data => data);
  }

  save(payload, id) {
    if (!!id) {
      console.info('Masuk Update');
      // console.info('Panjang Array : ', Object.keys(payload).length);
      let myData;
      myData = {};
      Object.keys(payload).forEach(function (key) {
        myData[key] = payload[key];
        if (key == 'destination') {
          payload[key].forEach(function (v, index) {
            myData[key][index]['address'] = escape_me(payload[key][index]['address']);
          });
        }
      });
      myData['create_date'] = null;
      myData['update_date'] = null;
      console.info('myData save visit-plan', myData);
      return this.update(myData, id);
    } else {
      console.info('Masuk Create');
      return this.create(payload);
    }
  }

  dropdownInvoice(division_id) {
    const params = {
      page: 1,
      limit: dropdown_limit.max,
      dropdown: true,
      division: division_id,
      order_by_column: 'invoice_date',
      order_direction: 'desc',
    };
    return this.apiService
      .get_py('/sales/invoice',
        params,
      ).map(data => data);
  }

  dropdownUser(): Observable<DefaultResponse<Pagination<UserResponseInterface>>> {
    const params = {
      page: 1,
      limit: dropdown_limit.max,
      order_by_column: 'create_date',
      order_direction: 'desc',
    };
    return this.apiService
      .get_py('/user/sales',
        params,
      ).map(data => data);
  }

  get_user(id): Observable<any> {
    return this.apiService.get_py(`/user/${id}`)
      .map(data => data);
  }

  dropdownCustomer(): Observable<any> {
    const params = {
      page: 1,
      limit: 50,
    };
    return this.apiService
      .get_py('/customer',
        params,
      ).map(data => data);
  }

  delete(id): Observable<any> {
    return this.apiService.delete_py(
      '/visit/plan/' + id,
    ).map(data => data);
  }

  get_auto_invoice(customer_code, division_id): Observable<any> {
    const params = {
      page: 1,
      limit: 1000,
      customer_code: customer_code,
      division: division_id,
    };
    return this.apiService
      .get_py(
        '/sales/invoice/customer',
        params,
      ).map(data => data);
  }

  addNewInvoice(idVisitPlan, invoiceList) {
    const params = {
      invoice : invoiceList.map(x => x.id_invoice),
    };
    return this.apiService
      .put_py(
        `/visit/plan/${idVisitPlan}/invoice`,
        params,
      ).map(data => data);
  }
}
