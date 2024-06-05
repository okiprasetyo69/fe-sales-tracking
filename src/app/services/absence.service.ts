import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { Location } from "@angular/common";
import { FormGroup } from '@angular/forms';
import { dropdown_limit } from '../configs/configs';
import { param } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService{

    private dataParams = new BehaviorSubject({});
    globalParams = this.dataParams.asObservable();
    dataFormFilter: FormGroup;
    constructor(
        private apiService: ApiService,
        private location: Location,
      ) {
    }

    private paramsFilter(payload, dataFormFilter: FormGroup) {
      const date_start = dataFormFilter.controls['date_start'].value;
      const date_end = dataFormFilter.controls['date_end'].value;
      const data_filter_by = dataFormFilter.controls['data_filter_by'].value;
      let paramsExtra = {};
      const params = {
        page: (payload.start / payload.length) + 1,
        limit: payload.length,
        search: payload.search.value,
        order_by_column: payload.columns[payload.order[0].column].data,
        order_direction: payload.order[0].dir,
        //type: 'web',
      };
      this.dataParams.next(params);
      if(date_start != ''){
        paramsExtra = params;
        Object.assign(paramsExtra, {start_date: date_start})
      } else {
        paramsExtra = params;
        Object.assign(paramsExtra, {start_date: ''})
      }
      /*
      if(date_start != ''){
        paramsExtra = params;
        Object.assign(paramsExtra, {
          page_filter: JSON.stringify(
            [{
              start_date: date_start,
            }]),
        });
      } else {
        paramsExtra = params;
        Object.assign(paramsExtra, {
          page_filter: JSON.stringify([{
            start_date: '',
          }]),
        });
      }
      */
      return paramsExtra;
    }

    index(): Observable<any> {
      return this.apiService.get(`/daily_absence/user`)
        .map(data => data);
    }

    indexDatatables(payload, dataFormFilter: FormGroup): Observable<any> { 

        const paramsExtra = this.paramsFilter(payload, dataFormFilter); 
        /*
        const params = {
          page: (payload.start / payload.length) + 1,
          limit: payload.length,
          search: payload.search.value,
          order_by_column: payload.columns[payload.order[0].column].data,
          order_direction: payload.order[0].dir,
          //start_date: '2020-02-24'
        };
        */
        //console.log(payload)
        //console.log(payload.order[0].column)
        this.location.replaceState('pages/absences/daily/index/page',
          'start=' + payload.start +
          '&length=' + payload.length +
          '&search=' + payload.search.value +
          '&order_col=' + payload.order[0].column +
          '&order_dir=' + payload.order[0].dir);
    
        return this.apiService
          .get_py(
            '/daily_absence/user',
            paramsExtra,
          ).map(data => data);
    }

    exportDailyAbsences(date_start: string){
      return this.apiService.exportExcel(`/absence/report/daily_absence/export?start_date=${date_start}`);
    }
    exportRangeAbsences(date_start: string, date_end:string){
      return this.apiService.exportExcel(`/absence/report/export?start_date=${date_start}&end_date=${date_end}`);
    }
    exportReportCheckIn(date_start: string){
      return this.apiService.exportExcel(`/absence/report/total_check_in/export?start_date=${date_start}`);
    }
}