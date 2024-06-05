import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { dropdown_limit } from '../configs/configs';


@Injectable()
export class UserGroupService {

  constructor(
    private apiService: ApiService,
    private location: Location,
  ) {}

  index(): Observable<any> {
    return this.apiService.get_py(`/user/groups`)
      .map(data => data);
  }

  store(payload): Observable<any> {
    return this.apiService
      .post_py(
        '/user/groups',
        payload,
      ).map(data => data);
  }

  show(id): Observable<any> {
    return this.apiService.get_py(`/user/groups/${id}`)
      .map(data => data);
  }

  update(payload, id): Observable<any> {
    return this.apiService
      .put_py(
        '/user/groups/' + id,
        payload,
      ).map(data => data);
  }

  index_dropdown(term = ''): Observable<any> {
    return this.apiService.get_py(`/user/groups`, {
      page: 1,
      limit: dropdown_limit.max,
      search: term,
      order_by_column: 'group_name',
      order_direction: 'asc',
    }).map(data => data);
  }


  indexDatatables(payload): Observable<any> {
    const params = {
      page: (payload.start / payload.length) + 1,
      limit: payload.length,
      search: payload.search.value,
      order_by_column: payload.columns[payload.order[0].column].data,
      order_direction: payload.order[0].dir,
    };
    this.location.replaceState('pages/settings/user_groups/index/page',
      'start=' + payload.start +
      '&length=' + payload.length +
      '&search=' + payload.search.value +
      '&order_col=' + payload.order[0].column +
      '&order_dir=' + payload.order[0].dir);
    return this.apiService
      .get_py(
        '/user/groups',
        params,
      ).map(data => data);
  }

  permission_default(): Observable<any> {
    return this.apiService.get_py(`/permission/user_group`)
      .map(data => data);
  }

  save(payload, id) {
    if (!!id) {
      return this.update(payload, id);
    } else {
      return this.store(payload);
    }
  }

  delete(id): Observable<any> {
    return this.apiService
      .delete_py(
        '/user/groups/' + id,
      ).map(data => data);
  }
}
