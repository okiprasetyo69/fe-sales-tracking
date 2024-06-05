import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class SettingNotificationsService {

  constructor(
    private apiService: ApiService,
  ) { }

  index(): Observable<any> {
    return this.apiService.get(`/setting_notifications`)
      .map(data => data);
  }

  _indexByCategory(category): Observable<any> {
    return this.apiService.get(`/setting_notifications/category/${category}`)
      .map(data => data);
  }

  indexByCategory(category): Observable<any> {
    return this.apiService.get_py(`/setting/notif/type/${category}`)
      .map(data => data);
  }

  show(id): Observable<any> {
    return this.apiService.get(`/setting_notifications/${id}`)
      .map(data => data);
  }

  update(payload, id): Observable<any> {
    return this.apiService
      .put_py(
        '/setting/notif/' + id,
        payload,
      ).map(data => data);
  }
}
