import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FormInputTdComponent } from './form-input-td.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CustomerService } from '../../../services/customer.service';
import { ThemeModule } from '../../../@theme/theme.module';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
// td is Template Driven

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    NgSelectModule,
    FormsModule,
    NgxMyDatePickerModule.forRoot(),
  ],
  exports: [
    FormInputTdComponent,
  ],
  declarations: [FormInputTdComponent],
  providers: [
    CustomerService
  ]
})
export class FormInputTdModule { }
