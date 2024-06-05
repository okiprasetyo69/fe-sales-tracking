import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormPlanComponent} from './form-plan.component';
import { ThemeModule } from '../../../@theme/theme.module';
import { ToasterModule } from 'angular2-toaster';
import { RouteMapModule } from '../route-map/route-map.module';
import { FormInputMdModule } from '../form-input-md/form-input-md.module';
import { FormInputTdModule } from '../form-input-td/form-input-td.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { DevModeModule } from '../dev-mode/dev-mode.module';

@NgModule({
  imports: [
    ThemeModule,
    ToasterModule.forRoot(),
    RouteMapModule,
    FormInputMdModule,
    FormInputTdModule,
    NgSelectModule,
    DevModeModule,
  ],
  declarations: [FormPlanComponent],
  exports: [FormPlanComponent],
})
export class FormPlanModule {
}
