import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterService } from 'angular2-toaster';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'ngx-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss'],
})
export class ModalDeleteComponent implements OnInit, OnDestroy {
  dtElement: DataTableDirective;
  modalHeader: string;
  id: number;
  job_function: string;
  service: any;
  type: string;

  @Output() result = new EventEmitter<boolean>();

  isSubmitting = false;
  error = false;
  errorMessage = 'Error';

  constructor(
    private activeModal: NgbActiveModal,
    private toasterService: ToasterService,
  ) {
  }

  ngOnInit() {
  }

  closeModal() {
    this.activeModal.close();
    this.activeModal.dismiss();
  }

  confirm() {
    console.info('Confirm Triggered');
    this.isSubmitting = true;
    if (this.isDeleteFunction()) {
      switch (this.type) {
        case 'employee':
          console.info('Process Delete Employee');
          this.service.delete(this.id, this.job_function)
            .pipe(untilDestroyed(this))
            .subscribe(results => {
            // console.info(results);
            this.processResult(true, results);
          }, errors => {
            this.processResult(false, errors);
          });
          break;
        default:
          console.info('Process Default Format Delete');
          this.service.delete(this.id)
            .pipe(untilDestroyed(this))
            .subscribe(results => {
            this.processResult(true, results);
          }, errors => {
            console.info(errors);
            this.processResult(false, errors);
          });
          break;
      }
    } else {
      this.error = true;
      this.errorMessage = 'Delete Function not ready on service.';
      this.isSubmitting = false;
    }
  }

  private isDeleteFunction() {
    console.info(typeof this.service.delete);
    if (typeof this.service.delete != 'function') {
      return false;
    } else {
      return true;
    }
  }

  private processResult(status, data = null) {
    if (status) {
      console.info('Success');
      const successMessage = data.message;

      this.toasterService.popAsync('success', 'Success', successMessage);
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.draw();
        // Disimpan didalam table, agar modal dan loading mati disaat table sudah di reload kembali
        this.isSubmitting = false;
        this.activeModal.close();
        this.activeModal.dismiss();
      });
    } else {
      console.info('Error ', data);
      if (data.length != 0) {
        const errorMessage = data.error.message;
        this.toasterService.popAsync('error', 'Error', errorMessage);
      }
      this.isSubmitting = false;
    }
  }

  ngOnDestroy() {
    //
  }
}
