import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { dropdown_limit } from '../configs/configs';


@Injectable()
export class AssetService {

  constructor(
    private apiService: ApiService,
    private location: Location,
  ) {
  }

  index(): Observable<any> {
    return this.apiService.get(`/assets`)
      .map(data => data);
  }

  indexDatatables(payload): Observable<any> {
    const params = {
      page: (payload.start / payload.length) + 1,
      limit: payload.length,
      search: payload.search.value,
      order_by_column: payload.columns[payload.order[0].column].data,
      order_direction: payload.order[0].dir,
      // type: 'web',
    };

    this.location.replaceState('pages/assets/assets/index/page',
      'start=' + payload.start +
      '&length=' + payload.length +
      '&search=' + payload.search.value +
      '&order_col=' + payload.order[0].column +
      '&order_dir=' + payload.order[0].dir +
      '&type=' + 'web');

    return this.apiService
      .get_py(
        '/assets',
        params,
      ).map(data => data);
  }

  show(id): Observable<any> {
    return this.apiService.get_py(`/assets/${id}`)
      .map(data => data);
  }

  update(payload, id): Observable<any> {
    console.info(payload);
    return this.apiService
      .put_py(
        '/assets/' + id,
        payload,
      ).map(data => data);
  }

  getAssetByTag(tag, term = ''): Observable<any> {
    return this.apiService
      .get_py(`/assets`, {
        page: 1,
        limit: dropdown_limit.max,
        dropdown: true,
        search: term,
        tag,
        order_by_column: 'create_date',
        order_direction: 'desc',
      }).map(data => data);
  }

  dropdownAssetType() {
    const params = {
      page: 1,
      limit: dropdown_limit.max,
      dropdown: true,
      order_by_column: 'name',
      order_direction: 'asc',
    };
    return this.apiService
      .get_py('/assets/type',
        params,
      ).map(data => data);
  }

  save(payload, id) {
    if (!!id) {
      console.info('Masuk Update');
      return this.update(payload, id);
    } else {
      console.info('Masuk Create');
      return this.create(payload);
    }
  }

  create(payload): Observable<any> {
    console.info('Payload Checked : ', payload);
    return this.apiService
      .post_py(
        '/assets',
        payload,
      ).map(data => data);
  }

  delete(id): Observable<any> {
    return this.apiService
      .delete_py(
        '/assets/' + id,
      ).map(data => data);
  }
}
