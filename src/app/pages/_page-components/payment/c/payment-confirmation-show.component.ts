import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../../../../services/payment.service';
import { Location } from '@angular/common';
import { ToasterService } from 'angular2-toaster';
import { DomSanitizer } from '@angular/platform-browser';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'ngx-payment-confirmation-show',
  templateUrl: './payment-confirmation-show.component.html',
  styleUrls: ['./payment-confirmation-show.component.scss'],
})
export class PaymentConfirmationShowComponent implements OnInit, OnDestroy {

  datasets: Array<any> = [];
  dataItems: Array<any> = [];
  invoiceItem: Array<any> = [];
  id: number;
  isLoadingGeneral: boolean = true;
  total = 0;
  account_name: string;
  account_no: string;
  bank_name: string;
  transfer_to: string;
  isConfirm: number;
  isCancel: number;
  isConfirmCancel: number;
  paymentStatus: string;
  // Variable untuk seluruh jumlah payment ammount
  totalPaymentAmount: number = 0;
  // Variable untuk seluruh jumlah invoice ammount
  totalInvoiceAmount: number = 0;
  // Variable untuk balance
  totalBalance: number = 0;
  paymentImage = [];

  payment_cash_data: Array<any> = [];
  payment_giro_data: Array<any> = [];
  payment_cheque_data: Array<any> = [];
  payment_transfer_data: Array<any> = [];
  payment_kontrabon_data: Array<any> = [];

  constructor(
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    private location: Location,
    private toasterService: ToasterService,
    private router: Router,
    private _sanitizer: DomSanitizer,
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
      // get data detail
      this.paymentService.showConfirmation(this.id)
        .pipe(untilDestroyed(this))
        .subscribe(resp => {
            console.info(resp.data);
            if (!resp.data) {
              this.location.back();
            } else {
              this.datasets = resp.data;
              this.invoiceItem = resp.data.invoice;
              this.isLoadingGeneral = false;
              // this.bank_name = this.datasets['payment_info']['bank_name'];
              // this.account_name = this.datasets['payment_info']['account_name'];
              // this.account_no = this.datasets['payment_info']['account_no'];
              // this.transfer_to = this.datasets['payment_info']['transfer_to'];
              this.isConfirm = this.datasets['is_confirm'];
              this.isCancel = +this.datasets['is_canceled'];
              this.isConfirmCancel = +this.datasets['is_confirm_cancel'];
              this.paymentStatus = this.datasets['payment_status'];
              this.paymentImage = [];
              // Menghitung jumlah payment ammount, sekaligus mendapatkan data image
              let key;
              for (key of resp.data.invoice) {
                // Increment Payment Amount
                this.totalPaymentAmount += key.payment_amount;
                // Increment Invoice Amount
                this.totalInvoiceAmount += key.invoice_amount;
                let x, payment_info;
                payment_info = key.payment_info;
                for (x of payment_info) {
                  if (x.payment_method == 'cash') {
                    this.payment_cash_data[key.invoice_id] = {
                      total_payment: x.total_payment,
                    }
                  } else if (x.payment_method == 'giro') {
                    this.payment_giro_data[key.invoice_id] = {
                      total_payment: x.total_payment,
                      account_name: x.account_name,
                      account_no: x.account_no,
                      bank_name: x.bank_name,
                      due_date: x.due_date,
                      transfer_to: x.transfer_to,
                    }
                  } else if (x.payment_method == 'cek') {
                    this.payment_cheque_data[key.invoice_id] = {
                      total_payment: x.total_payment,
                      account_name: x.account_name,
                      account_no: x.account_no,
                      bank_name: x.bank_name,
                      due_date: x.due_date,
                    }
                  } else if (x.payment_method == 'trf') {
                    this.payment_transfer_data[key.invoice_id] = {
                      total_payment: x.total_payment,
                      account_name: x.account_name,
                      account_no: x.account_no,
                      bank_name: x.bank_name,
                      transfer_to: x.transfer_to,
                    }
                  } else if (x.payment_method == 'kontrabon') {
                    this.payment_kontrabon_data[key.invoice_id] = {
                      due_date: x.due_date,
                      total_payment: x.total_payment,
                    }
                  }
                  if (typeof x.file != 'undefined') {
                    let picture;
                    for (picture of x.file) {
                      const imageData = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + picture.toString());
                      this.paymentImage.push(imageData);
                    }
                  }
                }
                console.info(this.paymentImage);
              }
              // if(resp.data.invoice.length == 1){
              //   this.totalPaymentAmount = resp.data.invoice[0]['payment_amount'];
              //   this.totalInvoiceAmount = resp.data.invoice[0]['invoice_amount'];
              // }
              // Menghitung balance
              this.totalBalance = this.totalInvoiceAmount - this.totalPaymentAmount;
            }
          },
          errors => {
            const errorMessage = 'Something wrong with error: ' +
              errors.message + '. Error detail: ' + errors.error.message;
            this.toasterService.popAsync('error', 'Error', errorMessage);
            setTimeout(() => {
              this.location.back();
            }, 2000);
          });
    });
  }

  back() {
    this.location.back();
  }

  confirm() {
    this.paymentService.confirm(this.id)
      .pipe(untilDestroyed(this))
      .subscribe(
        () => {
          this.toasterService.popAsync('success', 'Success', 'Payment Confirmed');
          setTimeout(() => {
            this.router.navigate(['/pages/sales/activities/payment/index']).then();
          }, 2000);
        }, () => {
          // console.log(errors.error.data);
        },
      );
  }

  cancel() {
    this.paymentService.cancel(this.id)
      .pipe(untilDestroyed(this))
      .subscribe(
        () => {
          this.toasterService.popAsync('success', 'Success', 'Payment Canceled');

          setTimeout(() => {
            this.router.navigate(['/pages/sales/activities/payment/index']).then();
          }, 2000);
        }, () => {
          // console.log(errors.error.data);
        },
      );
  }

  ngOnDestroy() {
    //
  }
}
