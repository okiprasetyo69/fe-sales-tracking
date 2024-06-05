import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DatepickerOptions } from 'ng2-datepicker';
import { VisitCollectPlanService } from '../../../../services/visitcollect-plan.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'ngx-collect-plan-generate',
  templateUrl: './collect-plan-generate.component.html',
  styleUrls: ['./collect-plan-generate.component.scss'],
})
export class CollectPlanGenerateComponent implements OnInit, OnDestroy {
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
  public mask_date = [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
  dataUser: Array<any>;

  loadingGenerate: boolean = false;

  dataName = 'Generating...';

  constructor(
    private location: Location,
    private visitCollectPlanService: VisitCollectPlanService,
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
    this.visitCollectPlanService.generate(dataBody)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
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
    this.visitCollectPlanService.dropdownUser()
      .pipe(untilDestroyed(this))
      .subscribe(results => {
        this.isLoadingDropdownUser = false;
        this.dataUser = results.data.data;
      }, () => {
        this.isLoadingDropdownUser = false;
      });
  }

  ngOnDestroy() {
    //
  }
}
