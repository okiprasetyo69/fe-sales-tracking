import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MychartsService {

  constructor(
    private apiService: ApiService,
  ) { }

  verticalBarPerformance(listUser:string, dataFormFilter: FormGroup): Observable<any> {
    const params = {
      user_id: listUser,
      start_date: dataFormFilter.controls['date_start'].value,
      end_date: dataFormFilter.controls['date_end'].value
    }
    return this.apiService.get_py(
      '/statistic/sales/performance',
      params,
    ).map(data => data);
  }


}
