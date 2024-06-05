/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {Component, OnInit} from '@angular/core';
import {AnalyticsService} from './@core/utils/analytics.service';
import {ToasterConfig} from 'angular2-toaster';
import { CompanyLevel, CompanyNameFull, CompanyNameShort } from './configs/configs';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'ngx-app',
  template: `
    <ngx-loading-bar></ngx-loading-bar>
    <router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
  // level = CompanyLevel;
  // title = CompanyNameShort;
  public config: ToasterConfig = new ToasterConfig({limit: 1});

  constructor(private analytics: AnalyticsService, private titleService: Title) {
    // this.titleService.setTitle(this.level + " " + this.title);
  }

  ngOnInit() {
    this.analytics.trackPageViews();
  }
}
