import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { NbMenuItem } from '@nebular/theme';
import { MenuService } from '../services/menu.service';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster/src/toaster.service';

@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-sample-layout>
      <toaster-container></toaster-container>
      <nb-menu [items]="menu" tag="sidebar"></nb-menu>
      <router-outlet>
        <!--<p>Haloo</p>-->
        <!--{{message}}-->
      </router-outlet>
    </ngx-sample-layout>
  `,
})

export class PagesComponent implements OnInit, OnDestroy {
  menu_subscription: Subscription;
  menu: NbMenuItem[] = [];

  constructor(
    private menuService: MenuService,
    private router: Router,
    private toasterService: ToasterService,
  ) {
  }

  ngOnInit() {
    this.getMenu();
    this.menu_subscription = this.menuService.menu.subscribe(menu => {
      this.menu = menu;
    });
  }

  /**
   * Get menu from backend
   */
  getMenu() {
    this.menuService.getAll().subscribe(resp => {
      // if using python backend
      this.menu = resp.data.menu;

      // if using laravel backend
      // this.menu = resp;
    }, errors => {
      // console.log(errors.error);
      console.info(errors);
      if (errors.error.status_code === 401) {
        this.router.navigate(['auth/login'], {
          queryParams: {
            returnUrl: 'pages/dashboard',
          },
        });
      } else {
        this.toasterService.popAsync(
          'error',
          'Error',
          'errors.message');
        console.info(errors.message);
      }
    });
  }

  ngOnDestroy() {
    this.menu_subscription.unsubscribe();
  }

}
