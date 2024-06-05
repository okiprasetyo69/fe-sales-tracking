import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';

@Injectable()
export class AuthPermissionService {

  constructor(
    private apiService: ApiService,
  ) { }

  /**
   * For this unique route_code we will get permission list for view, create, index, delete, import, etc
   * @param module_data
   * @returns {Observable<any>}
   */
  checkPermission(module_data): Observable<any> {
    return this.apiService.get_py(`/menu/access_rule`, {'code': module_data.route_code})
      .map(data => data);
  }

  /**
   * Will return JWT token
   * @param form_data
   * @returns {Observable<any>}
   */
  login(form_data): Observable<any> {
    return this.apiService.post_py(`/auth`, form_data)
      .map(data => data);
  }

  loginOIDC(): Observable<any> {
    return this.apiService.get_py(`/auth_oidc`).map(data => data);
  }
}
