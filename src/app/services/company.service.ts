import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class CompanyService {

    constructor(
        private apiService: ApiService,
    ) { }

    index(): Observable<any> {
        return this.apiService.get(`/company`)
            .map(data => data);
    }

    store(payload): Observable<any> {
        return this.apiService
            .post(
            '/company',
            { body: payload },
        ).map(data => data);
    }

    show(): Observable<any> {
        return this.apiService.get_py(`/setting/company`)
            .map(data => data);
    }

    update(payload): Observable<any> {
        return this.apiService
            .put_py(
            '/setting/company',
            payload,
        ).map(data => data);
    }
}
