import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AbsencesRoutingModule, routedComponents} from './absences-routing.module';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { FormInputMdModule } from '../../_shared-components/form-input-md/form-input-md.module';
import { FormLoadingModule } from '../../_shared-components/form-loading/form-loading.module';
import { DevModeModule } from '../../_shared-components/dev-mode/dev-mode.module';
import { LoaderModule } from '../../../helper/Loader.module';
import { ThemeModule } from '../../../@theme/theme.module';
import { ToasterModule } from 'angular2-toaster';
import { AbsenceService } from '../../../services/absence.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { TextMaskModule } from 'angular2-text-mask';
import { FormImportModule } from '../../_shared-components/form-import/form-import.module';
import { ModalDeleteModule } from '../../_shared-components/modal-delete/modal-delete.module';
import { IndexApprovalFlagModule } from '../../_shared-components/index-approval-flag/index-approval-flag.module';

import {IndexTableModule} from "../../_shared-components/index-table/index-table.module";
import { ExcelService } from "../../../services/excel.service";
import { UserService } from "../../../services/user.service";
import { FilterAbsencesComponent } from './entry/filter-absences.component';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { FilterAbsencesDateRangeComponent } from './entry/filter-absences-date-range.component';
import { FilterAbsencesCheckInComponent } from './entry/filter-absences-check-in.component';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    ToasterModule.forRoot(),
    AbsencesRoutingModule,
    NgbModule.forRoot(),
    ScrollToModule.forRoot(),
    NgxMyDatePickerModule.forRoot(),
    DevModeModule,
    FormInputMdModule,
    FormLoadingModule,
    DataTablesModule,
    NgSelectModule,
    LoaderModule,
    TextMaskModule,
    FormImportModule,
    ModalDeleteModule,
    IndexApprovalFlagModule,
    IndexTableModule,
  ],
  declarations: [
    ...routedComponents,
    FilterAbsencesComponent,
    FilterAbsencesDateRangeComponent,
    FilterAbsencesCheckInComponent,
  ],
  providers: [
    AbsenceService, ExcelService, UserService
  ],
  entryComponents: [
    FilterAbsencesComponent, FilterAbsencesDateRangeComponent, FilterAbsencesCheckInComponent
  ],
})
export class AbsencesModule { }
