import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FormInputMdComponent } from './form-input-md.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { CustomerService } from '../../../services/customer.service';
import { ThemeModule } from '../../../@theme/theme.module';
import { DevModeModule } from '../dev-mode/dev-mode.module';

// md is Model Driven Angular

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule,
    NgxMyDatePickerModule.forRoot(),
    DevModeModule,
  ],
  exports: [
    FormInputMdComponent,
  ],
  declarations: [FormInputMdComponent],
  providers: [
    CustomerService,
  ],
})
export class FormInputMdModule { }
