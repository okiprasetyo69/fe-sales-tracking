import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevModeComponent } from './dev-mode.component';
import { NbCardModule } from '@nebular/theme';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  imports: [
    CommonModule,
    NbCardModule,
    ClipboardModule,
  ],
  exports: [
    DevModeComponent,
  ],
  declarations: [DevModeComponent],
})
export class DevModeModule { }
