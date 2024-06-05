import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class CustomerBranchService {
  all_form_data: Array<any> = [];
  form_data;

  constructor(private apiService: ApiService) {
  }

  index(): Observable<any> {
    return this.apiService.get(`/customer_branch`).map(data => data);
  }

  store(payload): Observable<any> {
    return this.apiService
      .post(
        '/customer_branch',
        {body: payload}).map(data => data);
  }

  show(id): Observable<any> {
    return this.apiService.get_py(`/customer/${id}`)
      .map(data => data);
  }

  update(payload, id): Observable<any> {
    return this.apiService
      .put(
        '/customer_branch/' + id,
        {body: payload},
      ).map(data => data);
  }

  // validate(payload): Observable<any> {
  //   return this.apiService
  //     .post(
  //       '/customer_branch_validate',
  //       {body: payload},
  //     ).map(data => data);
  // }
  //
  // getByCustomerId(id): Observable<any> {
  //   return this.apiService.get(`/customer_branch/customer/${id}`)
  //     .map(data => data);
  // }
  //
  // // all branch array, to cache all branch data list
  // getAllFormData() {
  //   return this.all_form_data;
  // }
  //
  // setAllFormData(data) {
  //   this.all_form_data.push(data);
  // }
  //
  // destroyAllFormData() {
  //   this.all_form_data = [];
  // }
  //
  // updateAllFormData(dataOld, dataNew) {
  //   // console.log('update service');
  //   // console.log(this.all_form_data);
  //   // console.log(dataOld);
  //   // console.log(dataNew);
  //   this.all_form_data = this.all_form_data.filter((item) => item !== dataOld);
  //   setTimeout(() => {
  //     this.all_form_data.push(dataNew);
  //     // console.log('at last');
  //     // console.log(this.all_form_data);
  //   }, 2000);
  // }

  // single branch data, only hold one branch
  getFormData() {
    return this.form_data;
  }

  setFormData(data) {
    // console.log(data);
    this.form_data = data;
  }

  // destroyFormData() {
  //   this.form_data = [];
  // }

  save(payload, id) {
    if (!!id) {
      return this.update(payload, id);
    } else {
      return this.store(payload);
    }
  }

}
