import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormImportConfirmComponent } from './form-import-confirm.component';
import { NbCardModule } from '@nebular/theme';
import { ToasterModule } from 'angular2-toaster'
import { ThemeModule } from '../../../@theme/theme.module';
// 
import { ConfirmReplaceComponent } from './entry/confirm-replace.component';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    NbCardModule,
    ToasterModule.forRoot(),
    //    
  ],
  exports: [
    FormImportConfirmComponent,
  ],
  declarations: [
    FormImportConfirmComponent,
    ConfirmReplaceComponent,
  ],
  entryComponents: [
    ConfirmReplaceComponent
  ],
})
export class FormImportConfirmModule {
}
