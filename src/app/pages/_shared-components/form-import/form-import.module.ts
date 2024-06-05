import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormImportComponent } from './form-import.component';
import { NbCardModule } from '@nebular/theme';
import { ToasterModule } from 'angular2-toaster'
import { ThemeModule } from '../../../@theme/theme.module';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    NbCardModule,
    ToasterModule.forRoot(),
  ],
  exports: [
    FormImportComponent,
  ],
  declarations: [
    FormImportComponent,
  ],
})
export class FormImportModule {
}
