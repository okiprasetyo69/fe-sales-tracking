import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDeleteComponent } from './modal-delete.component';
import { ModalDeleteService } from './modal-delete.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [ModalDeleteComponent],
  exports: [ModalDeleteComponent],
  entryComponents: [ModalDeleteComponent],
  providers: [
    ModalDeleteService,
  ],
})
export class ModalDeleteModule { }
