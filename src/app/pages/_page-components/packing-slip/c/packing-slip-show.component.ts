import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PackingSlipService } from '../../../../services/packing-slip.service';
import { Location } from '@angular/common';
import { ToasterService } from 'angular2-toaster';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'ngx-packing-slip-show',
  templateUrl: './packing-slip-show.component.html',
  styleUrls: ['./packing-slip-show.component.scss'],
})
export class PackingSlipShowComponent implements OnInit, OnDestroy {
  datasets: Array<any> = [];
  dataItems = [];
  id: number;
  isLoadingGeneral: boolean = true;

  constructor(
    private packService: PackingSlipService,
    private route: ActivatedRoute,
    private location: Location,
    private toasterService: ToasterService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number

      // get data detail
      this.packService.show(this.id)
        .pipe(untilDestroyed(this))
        .subscribe(resp => {
        // console.log(resp.data);
        if (!resp.data) {
          this.location.back();
        } else {
          this.datasets = resp.data;
          this.dataItems = resp.data.product;
          this.isLoadingGeneral = false;
        }
      }, errors => {
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

  ngOnDestroy() {
    //
  }
}
