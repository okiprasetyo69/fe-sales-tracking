import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DestinationCycleService {

  constructor(
    private apiService: ApiService,
  ) { }

  index(): Observable<any> {
    return this.apiService.get(`/destination_cycle`)
      .map(data => data);
  }

  store(payload): Observable<any> {
    return this.apiService
      .post(
        '/destination_cycle',
        { body: payload },
      ).map(data => data);
  }

  show(id): Observable<any> {
    return this.apiService.get(`/destination_cycle/${id}`)
      .map(data => data);
  }

  update(payload, id): Observable<any> {
    return this.apiService
      .put(
        '/destination_cycle/' + id,
        { body: payload },
      ).map(data => data);
  }

  indexByGroupCycleId(id): Observable<any> {
    return this.apiService.get(`/destination_cycle/group_cycle/${id}`)
      .map(data => data);
  }

}
