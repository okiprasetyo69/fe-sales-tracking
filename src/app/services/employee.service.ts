import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';

import { ApiService } from './api.service';
import { dropdown_limit } from '../configs/configs';
import { DefaultResponse } from '@Model/response-default';
import { EmployeeSales } from '@Model/response-employee';


@Injectable()
export class EmployeeService {

  constructor(
    private apiService: ApiService,
    private location: Location,
  ) { }

  index(): Observable<any> {
    return this.apiService.get(`/employee`)
      .map(data => data);
  }

  index_dropdown(term = ''): Observable<any> {
    return this.apiService.get_py(`/employee`, {
      page: 1,
      limit: dropdown_limit.max,
      search: term,
      order_by_column: 'create_date',
      order_direction: 'desc',
    }).map(data => data);
  }

  dropdown_searchable(term): Observable<any> {
    let limit = dropdown_limit.max;
    if (term == '') {
      limit = dropdown_limit.min;
    }
    return this.apiService.get_py(`/employee`, {
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
      '/employee',
      payload,
    ).map(data => data);
  }

  show(id): Observable<DefaultResponse<EmployeeSales>> {
    return this.apiService.get_py(`/employee/${id}`)
      .map(data => data);
  }

  update(payload, id): Observable<any> {
    return this.apiService
      .put_py(
      '/employee/' + id,
      payload,
    ).map(data => data);
  }

  getByJobGroup(job_group_id): Observable<any> {
    return this.apiService
      .get(`/employee_by_job_group/${job_group_id}`)
      .map(data => data);
  }

  indexDatatables(payload, feature): Observable<any> {
    // let endpoint;
    // if (feature === 'sales') {
    //   endpoint = '/employee';
    // } else if (feature === 'administrator') {
    //   endpoint = '/administrator';
    // }
    const path = `pages/employee/${feature}/index/page`;
    const endpoint = `/employee/${feature}`;
    const params = {
      page: (payload.start / payload.length) + 1,
      limit: payload.length,
      search: payload.search.value,
      order_by_column: payload.columns[payload.order[0].column].data,
      order_direction: payload.order[0].dir,
    };
    this.location.replaceState(path,
      'start=' + payload.start +
      '&length=' + payload.length +
      '&search=' + payload.search.value +
      '&order_col=' + payload.order[0].column +
      '&order_dir=' + payload.order[0].dir);
    return this.apiService
      .get_py(
        endpoint,
        params,
      ).map(data => data);
  }


  save(payload, id) {
    if (!!id) {
      return this.update(payload, id);
    } else {
      return this.store(payload);
    }
  }

  delete(id, job_function): Observable<any> {
    return this.apiService
      .delete_py(
        '/employee/' + job_function + '/' + id,
      ).map(data => data);
  }

  postFile(fileToUpload: File, feature): Observable<boolean> {
    const formData: FormData = new FormData();
    formData.append('files', fileToUpload, fileToUpload.name);
    return this.apiService
      .upload_py(`/employee/${feature}/import`, formData);
  }
}
