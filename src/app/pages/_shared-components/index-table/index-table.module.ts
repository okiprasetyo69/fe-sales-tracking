import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetValuePipe, IndexTableComponent } from './index-table.component';
import { DataTablesModule } from 'angular-datatables';
import { ThemeModule } from '../../../@theme/theme.module';
import { ToasterModule } from 'angular2-toaster';
import { IndexTableService } from './index-table.service';
import { ActionButtonComponent } from './component/action-button/action-button.component';
import { FilterButtonComponent } from './component/filter-button/filter-button.component';
import { FilterModalComponent } from './component/filter-button/filter-modal/filter-modal.component';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { IndexApprovalFlagModule } from '../index-approval-flag/index-approval-flag.module';
import { BranchService } from "../../../services/branch.service";

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    DataTablesModule,
    ToasterModule.forRoot(),
    NgSelectModule,
    NgxMyDatePickerModule.forRoot(),
    IndexApprovalFlagModule,
  ],
  declarations: [
    IndexTableComponent,
    ActionButtonComponent,
    GetValuePipe,
    FilterModalComponent,
    FilterButtonComponent,
  ],
  exports: [
    IndexTableComponent,
    FilterButtonComponent,
  ],
  providers: [
    IndexTableService,
    BranchService,
  ],
  entryComponents: [
    FilterModalComponent,
  ],
})
export class IndexTableModule {
}
