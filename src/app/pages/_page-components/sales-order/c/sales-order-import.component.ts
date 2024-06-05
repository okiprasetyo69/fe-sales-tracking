import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalesOrderService } from '../../../../services/sales-order.service';
import { ToasterService } from 'angular2-toaster';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-sales-order-import',
  templateUrl: './sales-order-import.component.html',
  styleUrls: ['./sales-order-import.component.scss'],
})
export class SalesOrderImportComponent implements OnInit {

  loading: boolean = false;
  fileToUpload: File = null;

  constructor(
    private fb: FormBuilder,
    public salesOrderService: SalesOrderService,
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
    if (this.fileToUpload == null) {
      this.toasterService.popAsync('error', 'Error', 'Please Choose File Before Uploading');
    } else {
      this.loading = true;
      this.salesOrderService.postFile(this.fileToUpload).subscribe(data => {
        this.toasterService.popAsync('success', 'Success', 'Data has been saved');
        this.loading = false;
        setTimeout(() => {
          this.router.navigate(['/pages/sales/activities/sales_order/index']);
        }, 3000);
      }, errors => {
        const errorMessage = errors.error.message;
        this.toasterService.popAsync('error', 'Error', errorMessage);
        this.loading = false;
      });
    }
  }

}
