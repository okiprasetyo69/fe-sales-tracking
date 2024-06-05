import { Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { PlanSummaryService } from './plan-summary.service';
import { Image, PlanSummaryClass } from '@Model/response-plan-summary';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ImageModel, PlanModel, PlanSummaryTypeInterface } from '@Model/response-plan';
// import * as jQuery from 'jquery';
declare var jQuery: any;

@Component({
  selector: 'ngx-plan-summary',
  templateUrl: './plan-summary.component.html',
  styleUrls: ['./plan-summary.component.scss'],
})
export class PlanSummaryComponent implements OnInit {
  @Input() PlanSummaryType: PlanSummaryTypeInterface;

  protected Plan: PlanModel;

  loading = true;
  isShow = false;

  planPhotos: ImageModel[] = [];
  competitorPhotos: ImageModel[] = [];

  constructor(private planSummaryService: PlanSummaryService, private _sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.loading = false;
    jQuery(document).ready(function () {
      console.info('Ready');
    });
  }

  toImageModel(image: Image, customer_code: string, create_date: string): ImageModel {
    const base64: string = 'data:image/jpg;base64,' + image.image.toString();
    const imageData: SafeResourceUrl = this._sanitizer.bypassSecurityTrustResourceUrl(base64);
    return new ImageModel(
      base64,
      imageData,
      image.desc,
      customer_code,
      create_date,
    );
  }

  getListVisitImage(planSummary: PlanSummaryClass[]): ImageModel[] {
    let imageModelInitial: ImageModel[] = [];
    planSummary.forEach((planSummaryChild) => {
      planSummaryChild.visit_images.forEach((image: Image) => {
        imageModelInitial.push(this.toImageModel(image, planSummaryChild.customer_code, planSummaryChild.create_date));
      });
    });
    return imageModelInitial;
  }

  getListCompetitorImage(planSummary: PlanSummaryClass[]): ImageModel[] {
    let imageModelInitial: ImageModel[] = [];
    planSummary.forEach((planSummaryChild) => {
      planSummaryChild.competitor_images.forEach((image: Image) => {
        imageModelInitial.push(this.toImageModel(image, planSummaryChild.customer_code, planSummaryChild.create_date));
      });
    });
    return imageModelInitial;
  }

  setPlan(plan: PlanModel, autoShow = false) {
    this.Plan = plan;
    this.loading = true;
    this.planSummaryService.show(this.PlanSummaryType, plan).subscribe((planSummary) => {
      if (planSummary.data.data.length != 0) {
        this.planPhotos = this.getListVisitImage(planSummary.data.data);
        this.competitorPhotos = this.getListCompetitorImage(planSummary.data.data);
      }
      this.loading = false;
    }, error => {
      console.info('Kesalahan ', error);
      this.loading = false;
    });
    if (autoShow) {
      this.isShow = true;
    }
  }


  clearPlan(autoHide = false) {
    this.Plan = null;
    this.planPhotos = [];
    if (autoHide) {
      this.isShow = false;
    }
  }

  show() {
    this.isShow = true;
  }

  hide() {
    this.isShow = false;
  }

  openNewTab(base64) {
    const newTab = window.open();
    newTab.document.body.innerHTML = '<img src="' + base64 + '">';
  }
}
