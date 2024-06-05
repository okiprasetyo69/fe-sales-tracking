import { Injectable } from '@angular/core';


@Injectable()
export class OauthService {

  getToken(): String {
    return window.localStorage['oauthToken'];
  }

  getId() {
    return window.localStorage['id'];
  }

  getProfile(): Object {
    const dataProfile = {
      username: window.localStorage['username'],
      email: window.localStorage['email'],
      name: window.localStorage['name'],
      branch_privilege_id: window.localStorage['branch_privilege_id'],
      division_privilege_id: window.localStorage['division_privilege_id'],
      is_supervisor_logistic: window.localStorage['is_supervisor_logistic'],
      is_supervisor_sales: window.localStorage['is_supervisor_sales'],
      is_collector_only: window.localStorage['is_collector_only'],
    };
    // console.info("data profile : is_collector_Only :" + dataProfile.is_collector_only);
    return dataProfile;
  }

  saveToken(token: String) {
    window.localStorage['oauthToken'] = token;
  }

  saveProfile(username: String, email: String, name: String, id, branch_privilege_id, division_privelege_id, is_supervisor_logistic, is_supervisor_sales, is_collector_only) {
    window.localStorage['username'] = username;
    window.localStorage['email'] = email;
    window.localStorage['name'] = name;
    window.localStorage['id'] = id;
    window.localStorage['branch_privilege_id'] = branch_privilege_id;
    window.localStorage['division_privilege_id'] = division_privelege_id;
    window.localStorage['is_supervisor_logistic'] = is_supervisor_logistic;
    window.localStorage['is_supervisor_sales'] = is_supervisor_sales;
    window.localStorage['is_collector_only'] = is_collector_only;
    console.info('save profile : ' + window.localStorage['username'])
  }

  destroyToken() {
    window.localStorage.removeItem('oauthToken');
    window.localStorage.removeItem('username');
    window.localStorage.removeItem('email');
    window.localStorage.removeItem('name');
    window.localStorage.removeItem('id');
    window.localStorage.removeItem('branch_privilege_id');
    window.localStorage.removeItem('division_privilege_id');
    window.localStorage.removeItem('is_supervisor_logistic');
    window.localStorage.removeItem('is_supervisor_sales');
    window.localStorage.removeItem('is_collector_only');
    window.location.reload();
  }

  setTheme(themeName: string) {
    window.localStorage['theme'] = themeName;
  }


  getTokenJSON() {
    const token = this.getToken();
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }
}
