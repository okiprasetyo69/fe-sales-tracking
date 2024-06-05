import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../../@theme/theme.module';
import { IndexApprovalFlagComponent } from './index-approval-flag.component';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
  ],
  declarations: [
    IndexApprovalFlagComponent,
  ],
  exports: [
    IndexApprovalFlagComponent,
  ],
  providers: [
  ],
})
export class IndexApprovalFlagModule {
}
