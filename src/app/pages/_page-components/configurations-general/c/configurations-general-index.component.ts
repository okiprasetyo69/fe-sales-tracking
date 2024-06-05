import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster/src/toaster.service';
import { ConfigurationsGeneralService } from '../../../../services/configurations-general.service';
import { IMyDateModel, INgxMyDpOptions } from 'ngx-mydatepicker';
import { MenuService } from '../../../../services/menu.service';
import { ActivatedRoute } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { ConfigurationGeneral } from '@Model/response-configuration-general';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ngx-configurations-general',
  templateUrl: './configurations-general-index.component.html',
  styleUrls: ['./configurations-general-index.component.scss'],
})
export class ConfigurationsGeneralIndexComponent implements OnInit, OnDestroy {
  configsData: ConfigurationGeneral;
  configsDataDefault: any;
  showDate = false;

  toggleEditUseWrongAlertRoute = false;
  toggleUseWrongAlertValue = false;

  toggleUseBreakTimeAlert = false;
  toggleUseBreakTimeAlertValue = false;
  imageData = null;

  isChangeLogo = false;
  uploadingLogo = false;
  base64ImageData = null;

  myOptions: INgxMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
    appendSelectorToBody: true,
  };

  constructor(
    private toasterService: ToasterService,
    private configsService: ConfigurationsGeneralService,
    private menuService: MenuService,
    private route: ActivatedRoute,
    private _sanitizer: DomSanitizer,
  ) {
  }

  ngOnInit() {
    this.menuService.getMenuReloaded(this.route.snapshot.data['route_code']);

    this.configsService.show()
      .pipe(untilDestroyed(this))
      .subscribe(configs => {
        this.configsData = configs.data;
        this.toggleUseWrongAlertValue = (configs.data.alert_wrong_route == 1) ? true : false;
        this.configsDataDefault = JSON.parse(JSON.stringify(configs.data));
        if (configs.data.logo_image != null) {
          this.imageData = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + configs.data.logo_image.toString());
        }
      })
  }

  saveEditable(value, column) {
    // alert(value);
    // alert(column);
    if (column === 'visit_cycle_start' && (value === undefined || !value)) {
      this.toasterService.popAsync('error', 'The given data was invalid', `Value should not empty`);
      this.configsData[column] = this.configsDataDefault[column];
      return;
    }

    // prepare the data
    const data = {[column]: value};
    // call to http service
    this.configsService.update(data)
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
          this.configsDataDefault[column] = value;
          this.toasterService.popAsync('success', 'Success', res.message);
        },
        errors => {
          // console.log(errors);
          // rollback data
          this.configsData[column] = this.configsDataDefault[column];
          this.toasterService.popAsync('error', errors.error.message, errors.error.errors[column]);

        })
  }

  editableError(type: string = 'number') {
    this.toasterService.popAsync('error', 'The given data was invalid', `Value must be a ${type}`);
    // console.log('error');
  }

  onDateChanged(event: IMyDateModel) {
    // console.log('onDateChanged(): ', event.date, ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(), ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
    if (event.epoc == 0) {
      this.configsData.visit_cycle_start = null;
    } else {
      this.configsData.visit_cycle_start = event.formatted;
    }
  }

  changeDate() {
    if (this.configsData.visit_cycle_start == null) {
      this.toasterService.popAsync('error', 'Value can\'t null.', 'Please Select Visit Cycle Start Date');
    } else {
      if (this.showDate == true) {
        this.saveEditable(this.configsData.visit_cycle_start, 'visit_cycle_start');
      }
      this.showDate = (!this.showDate) ? true : false;
    }
  }

  toggleAlertWrongRouteForm(value = null) {
    if (value != null) {
      this.toggleEditUseWrongAlertRoute = value;
    } else {
      this.toggleEditUseWrongAlertRoute = !this.toggleEditUseWrongAlertRoute;
    }
  }

  toggleAlertBreakTimeForm(value = null) {
    if (value != null) {
      this.toggleUseBreakTimeAlert = value;
    } else {
      this.toggleUseBreakTimeAlert = !this.toggleUseBreakTimeAlert;
    }
  }

  toggleAlertWrongRouteField() {
    this.toggleUseWrongAlertValue = !this.toggleUseWrongAlertValue;
    this.configsData.alert_wrong_route = (this.toggleUseWrongAlertValue) ? 1 : 0;
    this.saveEditable(this.configsData.alert_wrong_route, 'alert_wrong_route');
  }

  toggleAlertBreakTimeField() {
    this.toggleUseBreakTimeAlertValue = !this.toggleUseBreakTimeAlertValue;
    this.configsData.alert_break_time = (this.toggleUseBreakTimeAlertValue) ? 1 : 0;
    this.saveEditable(this.configsData.alert_break_time, 'alert_break_time');
  }

  handleFileSelect(evt) {
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64ImageData = btoa(binaryString);
    const pleasewait = this.toasterService.popAsync('info', 'Uploading', `Please wait...`);
    // prepare the data
    const data = {['logo_image']: this.base64ImageData};
    // call to http service
    this.uploadingLogo = true;
    this.configsService.update(data)
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
          this.uploadingLogo = false;
          this.isChangeLogo = false;
          this.configsDataDefault['logo_image'] = this.base64ImageData;
          this.imageData = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + this.base64ImageData);
          this.toasterService.popAsync('success', 'Upload', 'Success');
        },
        errors => {
          this.uploadingLogo = false;
          this.isChangeLogo = false;
          // console.log(errors);
          // rollback data
          console.info('Failed Upload : ' + errors);
          this.configsData['logo_image'] = this.configsDataDefault['logo_image'];
          this.toasterService.popAsync('error', errors.error.message, errors.error.errors['logo_image']);

        })
  }

  toggleChangeLogo() {
    this.isChangeLogo = !this.isChangeLogo;
  }

  ngOnDestroy() {
    //
  }
}
