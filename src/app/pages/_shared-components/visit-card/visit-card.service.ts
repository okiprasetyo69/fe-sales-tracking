import { Injectable } from '@angular/core';
import { PlanModel, PlanSummaryType } from '@Model/response-plan';
import { Observable } from 'rxjs';
import { DefaultResponse } from '@Model/response-default';
import { PaginationClass } from '@Model/response-pagination';
import { PlanSummaryClass } from '@Model/response-plan-summary';
import { ApiService } from '../../../services/api.service';

@Injectable({
  providedIn: 'root',
})
export class VisitCardService {

  constructor(private apiService: ApiService) {
  }

  show(planSummaryType: PlanSummaryType, plan: PlanModel): Observable<DefaultResponse<PaginationClass<PlanSummaryClass>>> {
    return this.apiService.get_py(`/${planSummaryType.endPoint}/plan/${plan.id}/summary`).map(data => data);
  }
}
