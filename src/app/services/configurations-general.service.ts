import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import { DefaultResponse } from '@Model/response-default';
import { ConfigurationGeneral } from '@Model/response-configuration-general';

@Injectable()
export class ConfigurationsGeneralService {

  constructor(private apiService: ApiService) {
  }

  show(): Observable<DefaultResponse<ConfigurationGeneral>> {
    return this.apiService.get_py(`/setting/general`)
      .map(data => data);
  }

  update(payload): Observable<any> {
    console.info(payload);
    return this.apiService
      .put_py(
        '/setting/general',
        payload,
      ).map(data => data);
  }

  // __update(payload): Observable<any> {
  //   return this.apiService
  //     .put(
  //       '/configurations_general/1',
  //       { data: payload },
  //     ).map(data => data);
  // }
}
