import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetsRoutingModule } from './assets-routing.module';
import { AssetsComponent } from './assets.component';

@NgModule({
  imports: [
    CommonModule,
    AssetsRoutingModule,
  ],
  declarations: [AssetsComponent]
})
export class AssetsModule { }
