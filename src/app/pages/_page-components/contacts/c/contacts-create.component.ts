import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { CustomerService } from '../../../../services/customer.service';
import { ContactService } from '../../../../services/contact.service';
import { ToasterService } from 'angular2-toaster/src/toaster.service';

@Component({
  selector: 'ngx-contacts-create',
  templateUrl: './contacts-create.component.html',
  styleUrls: ['./contacts-create.component.scss'],
})
export class ContactsCreateComponent implements OnInit {
  customer_id: number;
  dataCustomerBranch: Array<any> = [];
  dataForm: FormGroup;
  serverErrors = [];
  isSubmitting: boolean = false;

  constructor(
    private customerService: CustomerService,
    private contactService: ContactService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toasterService: ToasterService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.customer_id = this.route.snapshot.params['custId'];
    this.getCustomerBranch();
    this.dataForm = this.fb.group({
      name: [],
      phone: [],
      mobile: [],
      email: [],
      job_function: [],
      customer_branch_id: [],
      note: [],
      notif_order_confirm: [],
      notif_return_request_confirm: [],
      notif_order_status_change: [],
      notif_goods_received_confirm: [],
      notif_goods_rejected_confirm: [],
      notif_invoice_reminder: [],
      notif_payment_received: [],
      notif_payment_confirm: [],
      notif_payment_receipt_failed_to_print: [],
      notif_nfc_failed_to_read: [],
      notif_visit_plan_reminder: [],
    });
  }

  getCustomerBranch() {
    this.customerService.show(this.customer_id)
      .subscribe(results => {
        // console.log(results);
        this.dataCustomerBranch = results.data.customer_branch;
      }, errors => {

      });
  }

  storeData(formValue) {
    this.isSubmitting = true;
    this.serverErrors = [];
    this.contactService.store(formValue)
      .subscribe(results => {
        this.dataForm.reset('');
        this.isSubmitting = true;
        this.toasterService.popAsync('success', 'Success', 'Data has been saved');
        setTimeout(() => {
          this.router.navigate([`/pages/sales/customer_edit/${this.customer_id}`]);
        }, 1000);
      }, errors => {
        // console.log(errors);
        this.isSubmitting = false;
        let field;
        if (errors.error.errors) {
          this.toasterService.popAsync('warning', 'Error', 'Please make sure all data are valid');
          for (const error of Object.keys(errors.error.errors)) {
            field = error.split('.');
            if (field[0] === 'body') {
              this.serverErrors[field.pop()] = errors.error.errors[error];
            }
          }
        } else {
          const errorMessage = 'Something wrong with error: ' +
            errors.message + 'Error detail: ' + errors.error.message;
          // console.log(errors);
          this.toasterService.popAsync('error', 'Error', errorMessage);
        }
      })
  }

}
