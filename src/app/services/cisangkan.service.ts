import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CisangkanService {

  feature: string;

  constructor(
    private apiService: ApiService
  ) { }

  performanceVisitCategory(job_function: string, payload: string, data_filter: FormGroup):Observable<any>{
    const params = {
      user_id: payload,
      start_date: data_filter.controls['date_start'].value,
      end_date: data_filter.controls['date_end'].value,
    };

    return this.apiService
      .get_py(
        `/visit_summary/${job_function}/category`,
        params,
      ).map(data => data);
  }

}
