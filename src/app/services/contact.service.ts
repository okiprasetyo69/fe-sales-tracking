import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ContactService {
  all_form_data: Array<any> = [];
  form_data: Array<any> = [];
  constructor(
    private apiService: ApiService,
  ) { }

  index(): Observable<any> {
    return this.apiService.get(`/contact`)
      .map(data => data);
  }

  store(payload): Observable<any> {
    return this.apiService
      .post(
      '/contact',
      { body: payload },
    ).map(data => data);
  }

  show(id): Observable<any> {
    return this.apiService.get(`/contact/${id}`)
      .map(data => data);
  }

  update(payload, id): Observable<any> {
    return this.apiService
      .put(
      '/contact/' + id,
      { body: payload },
    ).map(data => data);
  }

  validate(payload): Observable<any> {
    return this.apiService
      .post(
      '/contact_validate',
      { body: payload },
    ).map(data => data);
  }

  getByCustomerId(id): Observable<any> {
    return this.apiService.get(`/contact/customer/${id}`)
      .map(data => data);
  }

}
