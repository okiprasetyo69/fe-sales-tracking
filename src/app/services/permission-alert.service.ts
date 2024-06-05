import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';

class PermissionData {
  public data: any;
  public error: number;
  public message: string;
}

@Injectable()
export class PermissionAlertService {
  public dataForm = {};
  public dataToggle = {
    ids: [],
  };
  public dataAllToggle = {};

  constructor(
    private apiService: ApiService,
    private location: Location,
  ) { }

  // datatable mockup
  indexDatatables(payload): Observable<any> {
    const params = {
      page: (payload.start / payload.length) + 1,
      limit: payload.length,
      search: payload.search.value,
      order_by_column: payload.columns[payload.order[0].column].data,
      order_direction: payload.order[0].dir,
    };

    this.location.replaceState('pages/sales/activities/permission_alert/index/page',
      'start=' + payload.start +
      '&length=' + payload.length +
      '&search=' + payload.search.value +
      '&order_col=' + payload.order[0].column +
      '&order_dir=' + payload.order[0].dir);

    const MOCK_OBJECT: Array<PermissionData> = [
      {
        data: {
          data: [{
            id: 1,
            date: '2018-04-30',
            time: '10:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 1',
          }, {
            id: 2,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 2',
          }, {
            id: 3,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 3',
          }, {
            id: 4,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 4',
          }, {
            id: 5,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 5',
          }, {
            id: 6,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 6',
          }, {
            id: 7,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 7',
          }, {
            id: 8,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 8',
          }, {
            id: 9,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 9',
          }, {
            id: 10,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 10',
          }],
          has_next: true,
          has_prev: false,
          total: 30,
          total_filter: 30,
        },
        error: 0,
        message: '',
      },
      {
        data: {
          data: [{
            id: 11,
            date: '2018-04-30',
            time: '10:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 11',
          }, {
            id: 12,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 12',
          }, {
            id: 13,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 13',
          }, {
            id: 14,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 14',
          }, {
            id: 15,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 15',
          }, {
            id: 16,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 16',
          }, {
            id: 17,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 17',
          }, {
            id: 18,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 18',
          }, {
            id: 19,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 19',
          }, {
            id: 20,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 20',
          }],
          has_next: true,
          has_prev: true,
          total: 30,
          total_filter: 30,
        },
        error: 0,
        message: '',
      },
      {
        data: {
          data: [{
            id: 21,
            date: '2018-04-30',
            time: '10:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 21',
          }, {
            id: 22,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 22',
          }, {
            id: 23,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 23',
          }, {
            id: 24,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 24',
          }, {
            id: 25,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 25',
          }, {
            id: 26,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 26',
          }, {
            id: 27,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 27',
          }, {
            id: 28,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 28',
          }, {
            id: 29,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 29',
          }, {
            id: 30,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 30',
          }],
          has_next: false,
          has_prev: true,
          total: 30,
          total_filter: 30,
        },
        error: 0,
        message: '',
      },
    ];
    return Observable.of(MOCK_OBJECT[params.page - 1]).map(data => data);
  }

  // custom collector
  indexDatatablesCollector(payload): Observable<any> {
    const params = {
      page: (payload.start / payload.length) + 1,
      limit: payload.length,
      search: payload.search.value,
      order_by_column: payload.columns[payload.order[0].column].data,
      order_direction: payload.order[0].dir,
    };

    this.location.replaceState('pages/collector/activities/permission_alert/index/page',
      'start=' + payload.start +
      '&length=' + payload.length +
      '&search=' + payload.search.value +
      '&order_col=' + payload.order[0].column +
      '&order_dir=' + payload.order[0].dir);

    const MOCK_OBJECT: Array<PermissionData> = [
      {
        data: {
          data: [{
            id: 1,
            date: '2018-04-30',
            time: '10:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 1',
          }, {
            id: 2,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 2',
          }, {
            id: 3,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 3',
          }, {
            id: 4,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 4',
          }, {
            id: 5,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 5',
          }, {
            id: 6,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 6',
          }, {
            id: 7,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 7',
          }, {
            id: 8,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 8',
          }, {
            id: 9,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 9',
          }, {
            id: 10,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 10',
          }],
          has_next: true,
          has_prev: false,
          total: 30,
          total_filter: 30,
        },
        error: 0,
        message: '',
      },
      {
        data: {
          data: [{
            id: 11,
            date: '2018-04-30',
            time: '10:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 11',
          }, {
            id: 12,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 12',
          }, {
            id: 13,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 13',
          }, {
            id: 14,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 14',
          }, {
            id: 15,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 15',
          }, {
            id: 16,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 16',
          }, {
            id: 17,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 17',
          }, {
            id: 18,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 18',
          }, {
            id: 19,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 19',
          }, {
            id: 20,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 20',
          }],
          has_next: true,
          has_prev: true,
          total: 30,
          total_filter: 30,
        },
        error: 0,
        message: '',
      },
      {
        data: {
          data: [{
            id: 21,
            date: '2018-04-30',
            time: '10:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 21',
          }, {
            id: 22,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 22',
          }, {
            id: 23,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 23',
          }, {
            id: 24,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 24',
          }, {
            id: 25,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 25',
          }, {
            id: 26,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 26',
          }, {
            id: 27,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 27',
          }, {
            id: 28,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 28',
          }, {
            id: 29,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 29',
          }, {
            id: 30,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 30',
          }],
          has_next: false,
          has_prev: true,
          total: 30,
          total_filter: 30,
        },
        error: 0,
        message: '',
      },
    ];
    return Observable.of(MOCK_OBJECT[params.page - 1]).map(data => data);
  }


  indexDatatablesLog(payload): Observable<any> {
    const params = {
      page: (payload.start / payload.length) + 1,
      limit: payload.length,
      search: payload.search.value,
      order_by_column: payload.columns[payload.order[0].column].data,
      order_direction: payload.order[0].dir,
    };

    this.location.replaceState('pages/sales/activities/permission_alert/log/index/page',
      'start=' + payload.start +
      '&length=' + payload.length +
      '&search=' + payload.search.value +
      '&order_col=' + payload.order[0].column +
      '&order_dir=' + payload.order[0].dir);

    const MOCK_OBJECT: Array<PermissionData> = [
      {
        data: {
          data: [{
            id: 1,
            date: '2018-04-30',
            time: '10:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 1',
          }, {
            id: 2,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 2',
          }, {
            id: 3,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 3',
          }, {
            id: 4,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 4',
          }, {
            id: 5,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 5',
          }, {
            id: 6,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 6',
          }, {
            id: 7,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 7',
          }, {
            id: 8,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 8',
          }, {
            id: 9,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 9',
          }, {
            id: 10,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 10',
          }],
          has_next: true,
          has_prev: false,
          total: 30,
          total_filter: 30,
        },
        error: 0,
        message: '',
      },
      {
        data: {
          data: [{
            id: 11,
            date: '2018-04-30',
            time: '10:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 11',
          }, {
            id: 12,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 12',
          }, {
            id: 13,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 13',
          }, {
            id: 14,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 14',
          }, {
            id: 15,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 15',
          }, {
            id: 16,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 16',
          }, {
            id: 17,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 17',
          }, {
            id: 18,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 18',
          }, {
            id: 19,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 19',
          }, {
            id: 20,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 20',
          }],
          has_next: true,
          has_prev: true,
          total: 30,
          total_filter: 30,
        },
        error: 0,
        message: '',
      },
      {
        data: {
          data: [{
            id: 21,
            date: '2018-04-30',
            time: '10:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 21',
          }, {
            id: 22,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 22',
          }, {
            id: 23,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 23',
          }, {
            id: 24,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 24',
          }, {
            id: 25,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 25',
          }, {
            id: 26,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 26',
          }, {
            id: 27,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 27',
          }, {
            id: 28,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 28',
          }, {
            id: 29,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 29',
          }, {
            id: 30,
            date: '2018-04-20',
            time: '09:16',
            user_code: 'ADM0001',
            status: 'waiting',
            description: 'mau ganti rute ke jalan merdeka 30',
          }],
          has_next: false,
          has_prev: true,
          total: 30,
          total_filter: 30,
        },
        error: 0,
        message: '',
      },
    ];
    return Observable.of(MOCK_OBJECT[params.page - 1]).map(data => data);
  }

  set_dataform(data) {
    this.dataForm = data;
  }

  set_datatoggle (data) {
    this.dataToggle = data;
  }

  set_dataAllToggle (data) {
    this.dataAllToggle = data;
  }

  test_request(): Observable<any> {
    return this.apiService.get_ap(`/questions`)
      .map(data => data);
  }
}
