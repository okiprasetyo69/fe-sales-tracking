import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalsComponent } from './modals.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    ModalsComponent,
  ],
  declarations: [ModalsComponent],
  entryComponents: [ModalsComponent],
})
export class ModalsModule {
}
