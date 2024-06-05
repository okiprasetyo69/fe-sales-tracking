import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from '../../../../services/payment.service';
import { ToasterService } from 'angular2-toaster';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-payment-import',
  templateUrl: './payment-import.component.html',
  styleUrls: ['./payment-import.component.scss'],
})
export class PaymentImportComponent implements OnInit {

  loading: boolean = false;
  fileToUpload: File = null;

  constructor(
    private fb: FormBuilder,
    public paymentService: PaymentService,
    private toasterService: ToasterService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
  ) {
  }

  ngOnInit() {
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  back() {
    this.location.back();
  }

  uploadFileToActivity() {
    // console.log(this.fileToUpload);
    if (this.fileToUpload == null) {
      this.toasterService.popAsync('error', 'Error', 'Please Choose File Before Uploading');
    } else {
      this.loading = true;
      this.paymentService.postFile(this.fileToUpload).subscribe(data => {
        this.toasterService.popAsync('success', 'Success', 'Data has been saved');
        setTimeout(() => {
          // this.router.navigate(['/pages/sales/activities/invoice/index']).then();
          this.router.navigate(['/pages/collector/activities/invoice/index']).then();
        }, 1000);
      }, errors => {
        const errorMessage = errors.error.message;
        this.toasterService.popAsync('error', 'Error', errorMessage);
        this.loading = false;
      });
    }
  }

}
