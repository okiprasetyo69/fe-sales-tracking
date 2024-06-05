import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

import { SettingNotificationsService } from '../../../../services/setting-notifications.service';
import { ToasterService } from 'angular2-toaster/src/toaster.service';
import { label_data_save } from '../../../../configs/configs';
import { MenuService } from '../../../../services/menu.service';

@Component({
  selector: 'ngx-setting-notifications-index',
  styleUrls: ['./setting-notifications-index.component.scss'],
  templateUrl: './setting-notifications-index.component.html',
})
export class SettingNotificationsIndexComponent implements OnInit {
  category: string;
  settingsData: Array<any> = [];
  empty_setting: boolean = false;
  isSubmitting: boolean = false;

  dataName = label_data_save.saving;
  isLoadingGeneral = true;

  constructor(
    private route: ActivatedRoute,
    private settingService: SettingNotificationsService,
    private toasterService: ToasterService,
    private titlecasePipe: TitleCasePipe,
    private menuService: MenuService,
  ) { }
  ngOnInit() {
    this.menuService.getMenuReloaded(this.route.snapshot.data['route_code']);

    this.route.params.subscribe(params => {
      // const category = params['category'];
      const category = this.route.snapshot.data['feature'];
      this.category = this.titlecasePipe.transform(category);
      this.settingService.indexByCategory(category).subscribe(settings => {
          this.isLoadingGeneral = false;
          this.settingsData = settings.data.data;
          if (!settings.data.data.length) {
            this.empty_setting = true;
          } else {
            this.empty_setting = false;
          }
          console.info(settings.data.data);
        },
          () => {
          // console.log('error setting notifications');
          // const errorMessage = 'Something wrong with error: ' +
          // errors.message + 'Error detail: ' + errors.error.message;
          // // console.log(errors);
          // this.toasterService.popAsync('error', 'Error', errorMessage);
          // setTimeout(() => {
          //     this.location.back();
          // }, 2000);
        });
    });
  }

  saveValue($event, id, field, index) {

    // console.info($event);
    this.isSubmitting = true;
    // console.log(id);
    const val = $event.returnValue;
    const payload = { [field]: val ? 1 : 0 };

    this.settingService.update(payload, +id)
      .subscribe((res) => {
        this.toasterService.popAsync('success', 'Success', res.message);
        this.isSubmitting = false;
      },
      () => {
      // rollback checkbox value
      if (+val === 0) {
        this.settingsData[index][field] = 1;
      } else {
        this.settingsData[index][field] = 0;
      }
      this.isSubmitting = false;
      this.toasterService.popAsync(
      'error',
      'Error',
      'Can not updating data. Please contact your administrator');
    });
  }
}

