import { Injectable } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Observable } from 'rxjs/Observable';
import { DefaultResponse } from "../../../interface/response-default";

@Injectable()
export class FormDestinationService {

  constructor(
    private apiService: ApiService,
  ) {
  }

  generate_route(payload): Observable<DefaultResponse<any>> {
    return this.apiService.post_py(
      '/route/generate',
      payload,
    ).map(data => data);
  }
}
