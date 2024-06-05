import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators';
import { dropdown_limit } from '../configs/configs';
import { DefaultResponse } from '@Model/response-default';


@Injectable()
export class UserService {

  constructor(
    private apiService: ApiService,
    private location: Location,
  ) {
  }

  index_dropdown(): Observable<any> {
    return this.apiService.get_py(`/user`, {page: 1, limit: 10000})
      .map(data => data);
  }

  dropdownUserLogistic() {
    const params = {
      page: 1,
      limit: dropdown_limit.max,
      order_by_column: 'create_date',
      order_direction: 'desc',
    };
    return this.apiService
      .get_py('/user/logistic',
        params,
      ).map(data => data);
  }

  dropdownUserSales() {
    const params = {
      page: 1,
      limit: dropdown_limit.max,
      order_by_column: 'create_date',
      order_direction: 'desc',
    };
    return this.apiService
      .get_py('/user/sales',
        params,
      ).map(data => data);
  }

  dropdownUser() {
    const params = {
      page: 1,
      limit: dropdown_limit.max,
      order_by_column: 'create_date',
      order_direction: 'desc',
    };
    return this.apiService
      .get_py('/user/sales',
        params,
      ).map(data => data);
  }

  dropdownUserCollector() {
    const params = {
      page: 1,
      limit: dropdown_limit.max,
      order_by_column: 'create_date',
      order_direction: 'desc',
    };
    return this.apiService
      .get_py('/user/collector',
        params,
      ).map(data => data);
  }

  store(payload): Observable<any> {
    return this.apiService
      .post_py(
        '/user',
        payload,
      ).map(data => data);
  }

  show(id): Observable<any> {
    return this.apiService.get_py(`/user/${id}`)
      .map(data => data);
  }

  update(payload, id): Observable<any> {
    return this.apiService
      .put_py(
        '/user/' + id,
        payload,
      ).map(data => data);
  }

  indexDatatables(payload): Observable<any> {
    const params = {
      page: (payload.start / payload.length) + 1,
      limit: payload.length,
      search: payload.search.value,
      order_by_column: payload.columns[payload.order[0].column].data,
      order_direction: payload.order[0].dir,
    };
    this.location.replaceState('pages/settings/user/index/page',
      'start=' + payload.start +
      '&length=' + payload.length +
      '&search=' + payload.search.value +
      '&order_col=' + payload.order[0].column +
      '&order_dir=' + payload.order[0].dir);
    return this.apiService
      .get_py(
        '/user',
        params,
      ).map(data => data);
  }

  listArea(term = ''): Observable<any> {
    return this.apiService
      .get_py(`/area`, {page: 1, limit: 10000, search: term})
      .map(data => data);
  }

  postFile(fileToUpload: File): Observable<boolean> {
    const formData: FormData = new FormData();
    formData.append('files', fileToUpload, fileToUpload.name);
    return this.apiService
      .upload_py('/user/import', formData);
  }

  permission_default(): Observable<DefaultResponse<any>> {
    return this.apiService.get_py(`/permission/user`)
      .map(data => data);
  }

  save(payload, id) {
    if (!!id) {
      return this.update(payload, id);
    } else {
      return this.store(payload);
    }
  }

  delete(id): Observable<any> {
    return this.apiService
      .delete_py(
        '/user/' + id,
      ).map(data => data);
  }

  dropdown_customer(term = ''): Observable<any> {
    return this.apiService.get_py(`/customer`, {page: 1, limit: 100000, search: term})
      .map(data => data);
  }

  dropdown_customer_searchable(term): Observable<any> {
    let limit = dropdown_limit.max;
    if (term == '') {
      limit = dropdown_limit.min;
    }
    return this.apiService.get_py(`/customer`, {
      page: 1,
      limit: limit,
      search: term,
      order_by_column: 'name',
      order_direction: 'asc',
    }).map(data => data);
  }

  dropdown_customer_searchable_static(term: string = null): Observable<any> {
    let items = getMockPeople();
    if (term) {
      items = items.filter(x => x.name.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
    }
    return of(items).pipe(delay(500));
  }

  getUserLogin(username) {
    return this.apiService.get_py(`/auth/${username}`)
      .map(data => data);
  }

  userLoginDelete(username, type) {
    return this.apiService.delete_py(`/auth/${username}/${type}/delete`)
      .map(data => data);
  }

  indexDatatablesMyCustomer(payload): Observable<any> {
    const params = {
      page: (payload.start / payload.length) + 1,
      limit: payload.length,
      search: payload.search.value,
      order_by_column: payload.columns[payload.order[0].column].data,
      order_direction: payload.order[0].dir,
    };
    this.location.replaceState('pages/settings/user/index/page',
      'start=' + payload.start +
      '&length=' + payload.length +
      '&search=' + payload.search.value +
      '&order_col=' + payload.order[0].column +
      '&order_dir=' + payload.order[0].dir);
    return this.apiService
      .get_py(
        '/user',
        params,
      ).map(data => data);
  }


}

function getMockPeople() {
  return [
    {
      'id': '5a15b13c36e7a7f00cf0d7cb',
      'index': 2,
      'isActive': true,
      'picture': 'http://placehold.it/32x32',
      'age': 23,
      'name': 'Karyn Wright',
      'gender': 'female',
      'company': 'ZOLAR',
      'email': 'karynwright@zolar.com',
      'phone': '+1 (851) 583-2547',
    },
    {
      'id': '5a15b13c2340978ec3d2c0ea',
      'index': 3,
      'isActive': false,
      'picture': 'http://placehold.it/32x32',
      'age': 35,
      'name': 'Rochelle Estes',
      'disabled': true,
      'gender': 'female',
      'company': 'EXTRAWEAR',
      'email': 'rochelleestes@extrawear.com',
      'phone': '+1 (849) 408-2029',
    },
    {
      'id': '5a15b13c663ea0af9ad0dae8',
      'index': 4,
      'isActive': false,
      'picture': 'http://placehold.it/32x32',
      'age': 25,
      'name': 'Mendoza Ruiz',
      'gender': 'male',
      'company': 'ZYTRAX',
      'email': 'mendozaruiz@zytrax.com',
      'phone': '+1 (904) 536-2020',
    },
    {
      'id': '5a15b13cc9eeb36511d65acf',
      'index': 5,
      'isActive': false,
      'picture': 'http://placehold.it/32x32',
      'age': 39,
      'name': 'Rosales Russell',
      'gender': 'male',
      'company': 'ELEMANTRA',
      'email': 'rosalesrussell@elemantra.com',
      'phone': '+1 (868) 473-3073',
    },
    {
      'id': '5a15b13c728cd3f43cc0fe8a',
      'index': 6,
      'isActive': true,
      'picture': 'http://placehold.it/32x32',
      'age': 32,
      'name': 'Marquez Nolan',
      'gender': 'male',
      'company': 'MIRACLIS',
      'disabled': true,
      'email': 'marqueznolan@miraclis.com',
      'phone': '+1 (853) 571-3921',
    },
    {
      'id': '5a15b13ca51b0aaf8a99c05a',
      'index': 7,
      'isActive': false,
      'picture': 'http://placehold.it/32x32',
      'age': 28,
      'name': 'Franklin James',
      'gender': 'male',
      'company': 'CAXT',
      'email': 'franklinjames@caxt.com',
      'phone': '+1 (868) 539-2984',
    },
    {
      'id': '5a15b13cc3b9381ffcb1d6f7',
      'index': 8,
      'isActive': false,
      'picture': 'http://placehold.it/32x32',
      'age': 24,
      'name': 'Elsa Bradley',
      'gender': 'female',
      'company': 'MATRIXITY',
      'email': 'elsabradley@matrixity.com',
      'phone': '+1 (994) 583-3850',
    },
    {
      'id': '5a15b13ce58cb6ff62c65164',
      'index': 9,
      'isActive': true,
      'picture': 'http://placehold.it/32x32',
      'age': 40,
      'name': 'Pearson Thompson',
      'gender': 'male',
      'company': 'EZENT',
      'email': 'pearsonthompson@ezent.com',
      'phone': '+1 (917) 537-2178',
    },
    {
      'id': '5a15b13c90b95eb68010c86e',
      'index': 10,
      'isActive': true,
      'picture': 'http://placehold.it/32x32',
      'age': 32,
      'name': 'Ina Pugh',
      'gender': 'female',
      'company': 'MANTRIX',
      'email': 'inapugh@mantrix.com',
      'phone': '+1 (917) 450-2372',
    },
    {
      'id': '5a15b13c2b1746e12788711f',
      'index': 11,
      'isActive': true,
      'picture': 'http://placehold.it/32x32',
      'age': 25,
      'name': 'Nguyen Elliott',
      'gender': 'male',
      'company': 'PORTALINE',
      'email': 'nguyenelliott@portaline.com',
      'phone': '+1 (905) 491-3377',
    },
    {
      'id': '5a15b13c605403381eec5019',
      'index': 12,
      'isActive': true,
      'picture': 'http://placehold.it/32x32',
      'age': 31,
      'name': 'Mills Barnett',
      'gender': 'male',
      'company': 'FARMEX',
      'email': 'millsbarnett@farmex.com',
      'phone': '+1 (882) 462-3986',
    },
    {
      'id': '5a15b13c67e2e6d1a3cd6ca5',
      'index': 13,
      'isActive': true,
      'picture': 'http://placehold.it/32x32',
      'age': 36,
      'name': 'Margaret Reynolds',
      'gender': 'female',
      'company': 'ROOFORIA',
      'email': 'margaretreynolds@rooforia.com',
      'phone': '+1 (935) 435-2345',
    },
    {
      'id': '5a15b13c947c836d177aa85c',
      'index': 14,
      'isActive': false,
      'picture': 'http://placehold.it/32x32',
      'age': 29,
      'name': 'Yvette Navarro',
      'gender': 'female',
      'company': 'KINETICA',
      'email': 'yvettenavarro@kinetica.com',
      'phone': '+1 (807) 485-3824',
    },
    {
      'id': '5a15b13c5dbbe61245c1fb73',
      'index': 15,
      'isActive': false,
      'picture': 'http://placehold.it/32x32',
      'age': 20,
      'name': 'Elisa Guzman',
      'gender': 'female',
      'company': 'KAGE',
      'email': 'elisaguzman@kage.com',
      'phone': '+1 (868) 594-2919',
    },
    {
      'id': '5a15b13c38fd49fefea8db80',
      'index': 16,
      'isActive': false,
      'picture': 'http://placehold.it/32x32',
      'age': 33,
      'name': 'Jodie Bowman',
      'gender': 'female',
      'company': 'EMTRAC',
      'email': 'jodiebowman@emtrac.com',
      'phone': '+1 (891) 565-2560',
    },
    {
      'id': '5a15b13c9680913c470eb8fd',
      'index': 17,
      'isActive': false,
      'picture': 'http://placehold.it/32x32',
      'age': 24,
      'name': 'Diann Booker',
      'gender': 'female',
      'company': 'LYRIA',
      'email': 'diannbooker@lyria.com',
      'phone': '+1 (830) 555-3209',
    },
  ];
}
