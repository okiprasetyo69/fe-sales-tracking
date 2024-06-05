import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { DatepickerOptions } from 'ng2-datepicker';
import { ToasterService } from 'angular2-toaster';
import { Router } from '@angular/router';
import { DeliveryRouteService } from '../../../../services/delivery-route.service';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';

@Component({
  selector: 'ngx-delivery-route-generate',
  templateUrl: './delivery-route-generate.component.html',
  styleUrls: ['./delivery-route-generate.component.scss'],
})
export class DeliveryRouteGenerateComponent implements OnInit {
  date: Date;
  options: DatepickerOptions = {
    minYear: 1970,
    maxYear: 2030,
    displayFormat: 'MMM D[,] YYYY',
    barTitleFormat: 'MMMM YYYY',
    dayNamesFormat: 'dd',
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    // @ts-ignore
    minDate: new Date(Date.now()), // Minimal selectable date
    // @ts-ignore
    maxDate: new Date(Date.now()),  // Maximal selectable date
    barTitleIfEmpty: 'Click to select a date',
  };
  dataForm: FormGroup;
  serverErrors = [];
  isLoadingDropdownUser: boolean = false;

  private start_date: any = {
    // @ts-ignore
    year: new Date().getFullYear(),
    // @ts-ignore
    month: new Date().getMonth() + 1,
    // @ts-ignore
    day: new Date().getDate() - 1,
  };

  myDatePickerOptions: INgxMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
    appendSelectorToBody: true,
    disableUntil: this.start_date,
  };

  user_id: any;
  dataUser: Array<any>;

  loadingGenerate: boolean = false;

  dataName = 'Generating...';

  constructor(
    private location: Location,
    private deliveryRouteService: DeliveryRouteService,
    private fb: FormBuilder,
    private router: Router,
    private toasterService: ToasterService,
  ) {
    // @ts-ignore
    this.date = new Date();
    this.dataForm = this.fb.group({
      start_date: [{value: null, disabled: false}],
      end_date: [{value: null, disabled: false}],
      user_id: [{value: null, disabled: false}],
    });
    this.openDropdownUser();
  }

  ngOnInit() {
    this.dataUser = [
      {id: 1, name: 'hello World'},
    ];
  }

  back() {
    this.location.back();
  }

  generateData(bodyForm, nextAction) {
    this.loadingGenerate = true;
    const dataBody = bodyForm;
    console.info('Bodynya', bodyForm);
    this.deliveryRouteService.generate(dataBody).subscribe(() => {
        // this.isSubmitting = false;
        this.toasterService.popAsync('success', 'Success', 'Data has been saved');
        if (nextAction === 'close') {
          setTimeout(() => {
            this.dataName = 'Redirecting...';
            this.location.back();
          }, 2000);
        } else {
          this.loadingGenerate = false;
        }
      }, errors => {
        this.loadingGenerate = false;
        let field;
        if (!!errors.error.data && errors.error.data.length) {
          this.toasterService.popAsync('warning', 'Error', 'Please make sure all data are valid');
          for (const error of errors.error.data) {
            field = error['field'];
            this.serverErrors[field] = error['message'];
          }
        } else {
          const errorMessage = errors.error.message;
          this.toasterService.popAsync('error', 'Error', errorMessage);
        }
      },
    );
  }

  onDateStartChanged(event: IMyDateModel) {
    if (event.epoc == 0) {
      this.dataForm.patchValue({
        start_date: null,
      });
    } else {
      this.dataForm.patchValue({
        start_date: event.formatted,
      });
    }
  }

  onDateEndChanged(event: IMyDateModel) {
    if (event.epoc == 0) {
      this.dataForm.patchValue({
        end_date: null,
      });
    } else {
      this.dataForm.patchValue({
        end_date: event.formatted,
      });
    }
  }

  openDropdownUser() {
    this.isLoadingDropdownUser = true;
    this.deliveryRouteService.dropdownUser()
      .subscribe(results => {
        this.isLoadingDropdownUser = false;
        this.dataUser = results.data.data;
      }, () => {
        this.isLoadingDropdownUser = false;
      });
  }
}
