import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderDetailComponent } from './header-detail.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    HeaderDetailComponent,
  ],
  declarations: [HeaderDetailComponent],
})
export class HeaderDetailModule { }
