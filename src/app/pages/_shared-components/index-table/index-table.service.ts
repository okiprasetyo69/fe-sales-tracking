import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from '../../../services/api.service';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { dropdown_limit } from '../../../configs/configs';

@Injectable({
  providedIn: 'root',
})
export class IndexTableService {
  private dataParams = new BehaviorSubject({});

  constructor(
    private apiService: ApiService,
    private location: Location,
  ) {
  }

  private paramsFilter(payload, dataFormFilter: FormGroup, customFilter: boolean) {
    let paramsExtra = {};
    const params = {
      page: (payload.start / payload.length) + 1,
      limit: payload.length,
      search: payload.search.value,
      order_by_column: payload.columns[payload.order[0].column].data,
      order_direction: payload.order[0].dir,
      type: 'web',
    };

    this.dataParams.next(params);
    if (customFilter) {
      paramsExtra = params;
      if (dataFormFilter != null) {
        const listKey: Array<string> = Object.keys(dataFormFilter.controls);
        const pageFilter = {};
        let countingNull = 0;
        for (let x of listKey) {
          let thisKeyNull = false;
          if (typeof dataFormFilter.controls[x].value == 'object') {
            if (dataFormFilter.controls[x].value.length <= 0) {
              countingNull += 1;
              thisKeyNull = true;
            }
          } else {
            if (dataFormFilter.controls[x].value != "" && dataFormFilter.controls[x].value != null) {
              countingNull = countingNull + 1;
              thisKeyNull = true;
            }
          }
          // Jika key yang didapat tidak kosong
          // if (!thisKeyNull) {
          Object.assign(pageFilter, {
            [x]: dataFormFilter.controls[x].value,
          });
          // }
        }
        // Jika semua key tidak kosong
        // if (listKey.length != countingNull) {
        Object.assign(paramsExtra, {
          page_filter: JSON.stringify([pageFilter]),
        });
        // }
      }
      console.info(paramsExtra);
    } else {
      if (dataFormFilter != null) {
        const date_start = dataFormFilter.controls['date_start'].value;
        const date_end = dataFormFilter.controls['date_end'].value;
        const data_filter_by = dataFormFilter.controls['data_filter_by'].value;
        const user_id = dataFormFilter.controls['user_id'].value;
        const branch_id = dataFormFilter.controls['branch_id'].value;
        const division_id = dataFormFilter.controls['division_id'].value;
        const username = dataFormFilter.controls['username'].value;
        if (data_filter_by == 2) {
          if ((date_start != null && date_start != '') && (date_end != null && date_end != '')) {
            paramsExtra = params;
            Object.assign(paramsExtra, {
              page_filter: JSON.stringify(
                [{
                  start_date: date_start,
                  end_date: date_end,
                  user_id: user_id,
                  branch_id: branch_id,
                  division_id: division_id,
                  username: username,
                }]),
            });
          } else {
            paramsExtra = params;
            if (!this.checkArrayIsEmpty(user_id) || !this.checkArrayIsEmpty(branch_id) || !this.checkArrayIsEmpty(division_id)) {
              Object.assign(paramsExtra, {
                page_filter: JSON.stringify([{
                  start_date: '',
                  end_date: '',
                  user_id: user_id,
                  branch_id: branch_id,
                  division_id: division_id,
                  username: username,
                }]),
              });
            }
          }
        } else {
          paramsExtra = params;
          if (!this.checkArrayIsEmpty(user_id) || !this.checkArrayIsEmpty(branch_id) || !this.checkArrayIsEmpty(division_id)) {
            Object.assign(paramsExtra, {
              page_filter: JSON.stringify([{
                start_date: '',
                end_date: '',
                user_id: user_id,
                branch_id: branch_id,
                division_id: division_id,
                username: username,
              }]),
            });
          }
        }
      } else {
        paramsExtra = params;
      }
    }
    return paramsExtra;
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

  dropdownDivision(): Observable<any> {
    return this.apiService.get_py(`/division`, {
      page: 1,
      limit: dropdown_limit.max,
      order_by_column: 'division_name',
      order_direction: 'asc',
    }).map(data => data);
  }

  indexDatatables(payload, endPoint, urlReplacement, dataFormFilter: FormGroup, extraParams: Object, customFilter: boolean): Observable<any> {
    let paramsExtra = this.paramsFilter(payload, dataFormFilter, customFilter);
    if (extraParams != null) {
      Object.assign(paramsExtra, extraParams);
    }
    this.location.go(urlReplacement,
      'start=' + payload.start +
      '&length=' + payload.length +
      '&search=' + payload.search.value +
      '&order_col=' + payload.order[0].column +
      '&order_dir=' + payload.order[0].dir);

    return this.apiService.get_py(
      endPoint,
      paramsExtra,
    ).map(data => data);
  }

  private checkArrayIsEmpty(data) {
    if (data == null) {
      return true;
    } else {
      return data.length == 0;
    }
  }
}
