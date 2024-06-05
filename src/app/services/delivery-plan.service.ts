import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';

import { ApiService } from './api.service';

@Injectable()
export class DeliveryPlanService {

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

  show(id): Observable<any> {
    return this.apiService.get_py(`/visit/plan/${id}`)
      .map(data => data);
  }

  update(payload, id): Observable<any> {
    return this.apiService
      .put_py(
        '/visit/cycle/' + id,
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

  indexDatatables(payload): Observable<any> {
    const params = {
      page: (payload.start / payload.length) + 1,
      limit: payload.length,
      search: payload.search.value,
      order_by_column: payload.columns[payload.order[0].column].data,
      order_direction: payload.order[0].dir,
      type: 'web',
    };

    this.location.replaceState('pages/sales/activities/visit_plan/index/page',
      'start=' + payload.start +
      '&length=' + payload.length +
      '&search=' + payload.search.value +
      '&order_col=' + payload.order[0].column +
      '&order_dir=' + payload.order[0].dir);

    return this.apiService
      .get_py(
        '/visit/plan',
        params,
      ).map(data => data);
  }

  save(payload, id) {
    if (!!id) {
      return this.update(payload, id);
    }
  }

  dropdownPackingSlip(division_id) {
    const params = {
      page: 1,
      limit: 50,
      dropdown: true,
      division: division_id,
    };
    return this.apiService
      .get_py('/packing/slip',
        params,
      ).map(data => data);
  }

  dropdownUser() {
    const params = {
      page: 1,
      limit: 50,
    };
    return this.apiService
      .get_py('/user',
        params,
      ).map(data => data);
  }

  get_auto_packing_slip(customer_code, division_id): Observable<any> {
    const params = {
      page: 1,
      limit: 1000,
      customer_code: customer_code,
      division: division_id,
    };
    return this.apiService
      .get_py(
        '/packing/slip/customer',
        params,
      ).map(data => data);
  }

}
