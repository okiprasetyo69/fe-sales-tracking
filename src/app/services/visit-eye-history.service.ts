import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { DefaultResponse } from "@Model/response-default";
import { Pagination } from "@Model/response-pagination";
import { Area } from "@Model/response-area";
import { ApiService } from "./api.service";
import { UserVisitEye } from "@Model/response-user";

@Injectable({
  providedIn: 'root',
})
export class VisitEyeHistoryService {

  constructor(private apiService: ApiService) {
  }

  getListArea(): Observable<DefaultResponse<Pagination<Area>>> {
    const params = {
      page: 1,
      limit: 1000,
    };

    return this.apiService
      .get_py(
        '/area',
        params,
      ).map(data => data);
  }

  getListUser(): Observable<DefaultResponse<Pagination<UserVisitEye>>> {
    const params = {
      page: 1,
      limit: 1000,
    };

    return this.apiService
      .get_py(
        '/visiteye/user',
        params,
      ).map(data => data);
  }
}
