import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PaymentService } from '../../../../services/payment.service';
import { Location } from '@angular/common';
import { ToasterService } from 'angular2-toaster';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { label_data_save } from '../../../../configs/configs';
import { IMyDateModel, INgxMyDpOptions } from 'ngx-mydatepicker';

@Component({
  selector: 'ngx-receipt-checker-form',
  templateUrl: './receipt-checker-form.component.html',
  styleUrls: ['./receipt-checker-form.component.scss'],
})
export class ReceiptCheckerFormComponent implements OnInit, OnDestroy {

  dataForm: FormGroup;
  serverErrors = [];
  isSubmitting: boolean = false;
  dataName = label_data_save.submit;
  myOptions: INgxMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
    appendSelectorToBody: true,
  };

  constructor(
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    private location: Location,
    private toasterService: ToasterService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.dataForm = this.fb.group({
      date: [],
      code: [],
    });
  }

  // For Type Date
  onDateChanged(event: IMyDateModel) {
    const value = {};
    if (event.epoc == 0) {
      value['date'] = null;
    } else {
      value['date'] = event.formatted;
    }
    this.dataForm.patchValue(value);
  }

  submitChecker() {
    this.isSubmitting = true;
    this.paymentService.checkReceipt(this.dataForm.value)
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        console.info('hasil check', res);
        this.serverErrors = [];
        let type = (res.error) ? 'error' : 'success';
        this.toasterService.popAsync(type, res.data);
        this.isSubmitting = false;
      }, errors => {
        console.info(errors);
        this.serverErrors = [];
        this.isSubmitting = false;
        let field;
        if (!!errors.error.data && errors.error.data.length) {
          this.toasterService.popAsync('warning', 'Error', 'Please make sure all data are valid');
          for (const error of errors.error.data) {
            field = error['field'];
            this.serverErrors[field] = error['message'];
          }
        } else {
          const errorMessage = errors.error.message;
          this.toasterService.popAsync('error', 'Error', errorMessage);
        }
      })
  }

  back() {
    this.location.back();
  }

  ngOnDestroy() {
    //
  }
}
