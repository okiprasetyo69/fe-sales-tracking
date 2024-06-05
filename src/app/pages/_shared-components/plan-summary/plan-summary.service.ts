import { Injectable } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Observable } from 'rxjs';
import { DefaultResponse } from '@Model/response-default';
import { PaginationClass } from '@Model/response-pagination';
import { PlanSummaryClass } from '@Model/response-plan-summary';
import { PlanModel, PlanSummaryType } from '@Model/response-plan';

@Injectable({
  providedIn: 'root',
})
export class PlanSummaryService {

  constructor(private apiService: ApiService) {
  }

  show(planSummaryType: PlanSummaryType, plan: PlanModel): Observable<DefaultResponse<PaginationClass<PlanSummaryClass>>> {
    console.info(`Call API /${planSummaryType.endPoint}/plan/${plan.id}/summary`)
    return this.apiService.get_py(`/${planSummaryType.endPoint}/plan/${plan.id}/summary`).map(data => data);
  }
}
