import { NgModule } from '@angular/core';

import { ErrorPageComponent } from './error-page.component';
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    ErrorPageComponent,
  ],
})
export class ErrorPageModule { }
