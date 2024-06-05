import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class JobFunctionService {

    constructor(
        private apiService: ApiService,
    ) { }

    index_by_job_group(job_group_id): Observable<any> {
        return this.apiService.get(`/job_function_by_job_group/${job_group_id}`)
            .map(data => data);
    }

}
