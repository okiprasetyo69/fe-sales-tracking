import { Component, OnDestroy, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {RequestOrderService} from '../../../../services/request-order.service';
import {Location} from '@angular/common';
import {ToasterService} from 'angular2-toaster';
import {DomSanitizer} from '@angular/platform-browser';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'ngx-request-order-show',
  templateUrl: './request-order-show.component.html',
  styleUrls: ['./request-order-show.component.scss'],
})
export class RequestOrderShowComponent implements OnInit, OnDestroy {
  datasets: Array<any> = [];
  dataItems: Array<any> = [];
  userData = [];
  id: number;
  isLoadingGeneral: boolean = true;
  listProduct: Array<any> = [];
  customerData = [];
  imageData: any;

  public fileReader: FileReader;

  constructor(
    private roService: RequestOrderService,
    private route: ActivatedRoute,
    private location: Location,
    private toasterService: ToasterService,
    private _sanitizer: DomSanitizer,
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      this.roService.productList(this.id)
        .pipe(untilDestroyed(this))
        .subscribe(resp => {
        console.info(resp.data.data);
        this.listProduct = resp.data.data;
      }, errors => {
        console.info(errors);
      });
      this.roService.requestOrderImage(this.id)
        .pipe(untilDestroyed(this))
        .subscribe(resp => {
        if (resp.data.data.length != 0) {
          const data = resp.data.data[0];
          console.info(data.file);
          this.imageData = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + data.file.toString());
        } else {
          this.imageData = null;
        }
        // console.info('Data Image');
        // console.info(this.blobToFile(data.file, data.filename));
      }, error => {
        console.info(error);
      });
      // get data detail
      this.roService.show(this.id)
        .pipe(untilDestroyed(this))
        .subscribe(resp => {
          console.info(resp.data);
          if (!resp.data) {
            this.location.back();
          } else {
            this.datasets = resp.data;
          }
          this.isLoadingGeneral = false;
          this.userData = resp.data.user;
          this.customerData = resp.data.customer;
          console.info(this.userData);
        },
        errors => {
          this.toasterService.popAsync('error', 'Error', errors.error.message);
          setTimeout(() => {
            this.location.back();
          }, 5000);
        });
    });
  }

  blobToFile = (theBlob: Blob, fileName: string): File => {
    const b: any = theBlob;
    // A Blob() is almost a File() - it's just missing the two properties below which we will add
    // @ts-ignore
    b.lastModifiedDate = new Date();
    b.name = fileName;

    // Cast to a File() type
    return <File>theBlob;
  }

  back() {
    this.location.back();
  }

  ngOnDestroy() {
    //
  }
}
