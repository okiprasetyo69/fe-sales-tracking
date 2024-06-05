///<reference path="../../../../configs/configs.ts"/>
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// import { UserService } from '../../../../../services/user.service';
// import { BranchService } from '../../../../../services/branch.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { FormBuilder } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { ActivatedRoute, Router } from '@angular/router';
import { label_data_save } from '../../../../configs/configs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PackingSlipService } from '../../../../services/packing-slip.service';
import { CustomerService } from '../../../../services/customer.service';


@Component({
  selector: 'ngx-confirm-replace',
  templateUrl: './confirm-replace.component.html',
  styleUrls: ['./confirm-replace.component.scss'],
})


export class ConfirmReplaceComponent implements OnInit {
  loading: boolean = false;
  fileToUpload: File = null;
  @Input() service;
  @Input() title: String;
  @Input() is_employee: false;
  @Input() feature: String;
  dataName = label_data_save.saving;

  @Output() filterData: EventEmitter<any> = new EventEmitter();
  dataFormCloned: FormGroup;
  serverErrors = [];

  @Input() data : Array<any> = [];

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private toasterService: ToasterService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private packingSlipService: PackingSlipService,
    private customerService: CustomerService,
  ) {
  }

  ngOnInit() {
  }

  closeModal() {
    this.activeModal.close();
    this.activeModal.dismiss();
  }

  updatePackingSlip() {
    if (this.data == null) {
      this.toasterService.popAsync('error', 'Error', 'cannot read data');
    } else {
      this.loading = true;
      try {
        this.packingSlipService.updatePackingSlip(this.data).subscribe(data => {
          this.successImportToaster(data);
        }, errors => {
          this.errorImportToaster(errors);
        });
      } catch (ex) {
        this.loading = false;
        this.toasterService.popAsync('error', 'Error', 'Import ' + this.title + ' not available.');
        console.info('Error On : ', ex);
      }
    }
  }

  updateCustomer() {
    if (this.data == null) {
      this.toasterService.popAsync('error', 'Error', 'cannot read data');
    } else {
      this.loading = true;
      try {
        this.customerService.updateCustomerBatch(this.data).subscribe(data => {
          this.successImportToaster(data);
        }, errors => {
          this.errorImportToaster(errors);
        });
      } catch (ex) {
        this.loading = false;
        this.toasterService.popAsync('error', 'Error', 'Import ' + this.title + ' not available.');
        console.info('Error On : ', ex);
      }
    }
  }

  private successImportToaster(data) {
    this.closeModal();
    let successMessage = '';
    if (data && data.message) {
      successMessage = data.message + ' (' + this.title + ')';
    } else {
      successMessage = this.title + ' update successfully';
    }
    this.loading = false;

    this.toasterService.popAsync('success', 'Success', successMessage);
    if(this.title === 'Customers'){
      setTimeout(() => {
        this.router.navigate(['pages/settings/customers/index']);
      }, 1000);
    }else{
      setTimeout(() => {
        this.router.navigate(['/pages/logistic/activities/packing_slip/index']);
      }, 1000);
    }
    this.loading = false;
  }

  private errorImportToaster(errors) {
    const errorMessage = errors.error.message;
    this.toasterService.popAsync('error', 'Error Updating data', errorMessage);
      this.loading = false;
  }

}
