import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { TitleCasePipe } from '@angular/common';
import { CommonModule } from '@angular/common';

import { AbsencesRoutingModule, routedComponents } from './absences-routing.module';
import { AbsenceService } from '../../services/absence.service';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    AbsencesRoutingModule
  ],
  declarations: [
      ...routedComponents
  ],
  providers: [
    AbsenceService,
    TitleCasePipe
  ],
})
export class AbsencesModule { }
