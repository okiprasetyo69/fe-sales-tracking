import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GroupCycleService {

  constructor(
    private apiService: ApiService,
  ) { }

  index(): Observable<any> {
    return this.apiService.get(`/group_cycle`)
      .map(data => data);
  }

  store(payload): Observable<any> {
    return this.apiService
      .post(
        '/group_cycle',
        { body: payload },
      ).map(data => data);
  }

  show(id): Observable<any> {
    return this.apiService.get(`/group_cycle/${id}`)
      .map(data => data);
  }

  update(payload, id): Observable<any> {
    return this.apiService
      .put(
        '/group_cycle/' + id,
        { body: payload },
      ).map(data => data);
  }

  showByVisitCycleGroupNumber(visit_cycle_id, group_number): Observable<any> {
    return this.apiService
      .get('/group_cycle_by_visit_cycle_group_number/' + visit_cycle_id + '/' + group_number)
      .map(data => data);
  }

}
