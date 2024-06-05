import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { OauthService } from './oauth.service';


@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient,
    private token: OauthService,
  ) {
  }

  private setHeaders(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json;charset=utf-8',
      'Accept': 'application/json',
    };

    if (this.token.getToken()) {
      headersConfig['Authorization'] = `JWT ${this.token.getToken()}`;
    }

    return new HttpHeaders(headersConfig);
  }

  private fileHeaders(): HttpHeaders {
    const headersConfig = {};

    if (this.token.getToken()) {
      headersConfig['Authorization'] = `JWT ${this.token.getToken()}`;
    }

    return new HttpHeaders(headersConfig);
  }

  private formatErrors(error: any) {
    // console.log(error);
    return Observable.throw(error);
  }

  get(path: string, params: any = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`, {headers: this.setHeaders(), params})
      .catch(this.formatErrors);
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.api_url}${path}`,
      JSON.stringify(body),
      {headers: this.setHeaders()},
    )
      .catch(this.formatErrors);
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.api_url}${path}`,
      JSON.stringify(body),
      {headers: this.setHeaders()},
    )
      .catch(this.formatErrors);
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${environment.api_url}${path}`,
      {headers: this.setHeaders()},
    )
      .catch(this.formatErrors);
  }

  // These code below are using python backend

  get_py(path: string, params: any = new HttpParams()): Observable<any> {
    // console.info(`Requesting ${environment.api_url_python}${path}`);
    return this.http.get(`${environment.api_url_python}${path}`, {headers: this.setHeaders(), params})
      .catch(this.formatErrors);
  }

  post_py(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.api_url_python}${path}`,
      JSON.stringify(body),
      {headers: this.setHeaders()},
    )
      .catch(this.formatErrors);
  }

  upload_py(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.api_url_python}${path}`,
      body,
      {headers: this.fileHeaders()},
    )
      .catch(this.formatErrors);
  }

  put_py(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.api_url_python}${path}`,
      JSON.stringify(body),
      {headers: this.setHeaders()},
    )
      .catch(this.formatErrors);
  }

  delete_py(path): Observable<any> {
    return this.http.delete(
      `${environment.api_url_python}${path}`,
      {headers: this.setHeaders()},
    )
      .catch(this.formatErrors);
  }

  // this code is using apiary as API
  get_ap(path: string, params: any = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.api_apiary}${path}`, {
      headers: this.setHeaders(), params
    }).catch(this.formatErrors);
  }

  exportExcel(path: string, params: any = new HttpParams()): Observable<any> {
    // console.info("requesting ", `Requesting ${environment.api_url_python}${path}`);
    let resultDefault;
    resultDefault = this.http.get(`${environment.api_url_python}${path}`, {
      headers: this.setHeaders(), 
      params, 
      responseType: 'blob',
    }).catch(this.formatErrors);


    // let resultCustom;
    // resultCustom = this.http.get<any>(`${environment.api_url_python}${path}`, {
    //   headers: this.setHeaders(),
    //   params,
    //   responseType: 'blob',
    // }).catch(this.formatErrors);
    

    return resultDefault;
  }
}
