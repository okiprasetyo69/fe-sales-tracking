import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { EmployeeService } from '../../../../services/employee.service';
import { ToasterService } from 'angular2-toaster';
import { Location } from '@angular/common';
import { label_data_save } from '../../../../configs/configs';
import { checkZeroValue, convertZeroValue } from '../../../../helper/ExtraFunction';
import { ApprovalService } from '../../../../services/approval.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import {
  Collector,
  CollectorData,
  SalesData,
  CollectorEmployeeSales,
  CollectorInterface,
  EmployeeSalesClass,
} from '@Model/response-employee';

@Component({
  selector: 'ngx-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss'],
})
export class EmployeeEditComponent implements OnInit, OnDestroy {
  id: number;
  module: string;
  method: string;
  feature: string; // will consists: sales, administrator, or logistic
  dataForm: FormGroup;

  formCollector: FormGroup;

  formSupervisor: FormGroup;
  serverErrors = [];
  isSubmitting: boolean = false;
  isView: boolean = false;
  isApprovalView: boolean = false;
  isLoadingDropdown: boolean = false;
  isLoadingGeneral: boolean = false;
  job_function_dropdown: Array<any> = [];

  collector_dropdown: CollectorInterface[] = SalesData;
  dropdown_sales: CollectorInterface[] = SalesData;
  dropdown_collector: CollectorInterface[] = CollectorData;

  dataName = label_data_save.saving;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private toasterService: ToasterService,
    private fb: FormBuilder,
    private location: Location,
    private approvalService: ApprovalService,
  ) {
  }

  ngOnInit() {
    // console.info('ng on init');
    // get module name from route data
    this.module = this.route.snapshot.data['module'];

    // get feature
    this.feature = this.route.snapshot.data['feature'];

    // get params :id value
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      const id = +params['id'];
      const id_approval = +params['id_approval'];
      if (!!id) {
        // id not empty => edit form
        this.prepareEditForm(id);
      } else if (!!id_approval) {
        this.isApprovalView = true;
        this.prepareViewApproval(id_approval);
      } else {
        this.isLoadingGeneral = false;
      }
    });
    // view or edit?
    if (this.route.snapshot.data['method'] === 'view') {
      this.isView = true;
    }

    this.formSupervisor = this.fb.group({
      is_supervisor_sales: 0,
      is_supervisor_logistic: 0,
    });

    this.formCollector = this.fb.group({
      collector: [{value: 3, disabled: this.isView}],
    });

    this.dataForm = this.fb.group({
      nip: [],
      name: [],
      job_function: [{value: null, disabled: this.isView}],
      is_supervisor_sales: this.formSupervisor.controls['is_supervisor_sales'].value,
      is_supervisor_logistic: this.formSupervisor.controls['is_supervisor_logistic'].value,
      phone: [],
      email: [],
      is_collector_only: 0,
      is_can_collect: 0,
    });

    // get method name
    this.method = this.route.snapshot.data['method'];

    // preparing dropdown for job function
    if (this.feature === 'sales') {
      this.job_function_dropdown = [
        {
          val: 'sales',
          label: 'Sales',
        },
      ];
    }else if (this.feature === 'collector'){
      this.job_function_dropdown = [
        {
          val: 'sales',
          label: 'Kolektor',
        }
      ]
    }else if (this.feature === 'logistic') {
      this.job_function_dropdown = [
        {
          val: 'driver',
          label: 'Driver',
        },
        {
          val: 'crew',
          label: 'Crew',
        },
      ];
    } else if (this.feature === 'supervisor') {
      this.job_function_dropdown = [
        {
          val: 'supervisor',
          label: 'Supervisor',
        },
        // {
        //   val: 'manager',
        //   label: 'Manager',
        // },
      ];
    }
  }

  back() {
    this.location.back();
  }

  prepareViewApproval(id) {
    console.info('prepare approval');
    // get data detail
    this.approvalService.show_approval(id)
      .pipe(untilDestroyed(this))
      .subscribe(res => {
        console.info('Prepare Approval View');
        console.info(res);
        if (!res.data.data) {
          this.toasterService.popAsync('error', 'Error', 'Data is empty');
          setTimeout(() => {
            this.location.back();
          }, 2000);
        } else {
          const employeeSales: EmployeeSalesClass = new EmployeeSalesClass(res.data.data, this.isView);
          this.dataForm = employeeSales.toFormGroup();

          if (this.feature == 'sales' || this.feature == 'collector') {
            this.formCollector = employeeSales.toCollectorFormGroup();
          }
        }
        this.isLoadingGeneral = false;

        this.formSupervisor.patchValue({
          is_supervisor_sales: (res.data.data.is_supervisor_sales == 0) ? false : true,
          is_supervisor_logistic: (res.data.data.is_supervisor_logistic == 0) ? false : true,
        });
      }, errors => {
        const errorMessage = 'Something wrong with error: ' +
          errors.message + '. Error detail: ' + errors.error.message;
        // console.info(errors);
        this.toasterService.popAsync('error', 'Error', errorMessage);
        setTimeout(() => {
          this.location.back();
        }, 2000);
      });
  }

  prepareEditForm(id) {
    console.info('edit/show original');
    // get data detail
    this.employeeService.show(id)
      .subscribe(res => {
        if (!res.data) {
          this.toasterService.popAsync('error', 'Error', 'Prepare data is empty');
          setTimeout(() => {
            this.location.back();
          }, 2000);
        } else {
          const employeeSales: EmployeeSalesClass = new EmployeeSalesClass(res.data, this.isView);
          this.dataForm = employeeSales.toFormGroup();

          if (this.feature == 'collector') {
            this.formCollector = employeeSales.toCollectorFormGroup();
          }
        }
        this.isLoadingGeneral = false;

        this.formSupervisor.patchValue({
          is_supervisor_sales: (res.data.is_supervisor_sales == 0) ? false : true,
          is_supervisor_logistic: (res.data.is_supervisor_logistic == 0) ? false : true,
        });
      }, errors => {
        const errorMessage = 'Something wrong with error: ' +
          errors.message + '. Error detail: ' + errors.error.message;
        // console.info(errors);
        this.toasterService.popAsync('error', 'Error', errorMessage);
        setTimeout(() => {
          this.location.back();
        }, 2000);
      });
  }

  /**
   * saving data
   * @param formValue
   * @param nextAction
   */
  saveData(formValue, nextAction) {
    this.isSubmitting = true;
    this.serverErrors = [];
    if (checkZeroValue(this.dataForm, 'nip', this.serverErrors, this.toasterService)) {
      if (convertZeroValue(this.dataForm, 'phone', this.serverErrors, this.toasterService)) {
        this.employeeService.save(this.dataForm.value, this.id)
          .pipe(untilDestroyed(this))
          .subscribe((results) => {
              this.toasterService.popAsync('success', 'Success', results.message);
              if (nextAction === 'close') {
                this.dataName = label_data_save.redirect;
                setTimeout(() => {
                  this.location.back();
                }, 2000);
              } else {
                this.isSubmitting = false;
              }
            }, errors => {
              this.isSubmitting = false;
              let field;
              console.info('Errors', errors);
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
      } else {
        this.isSubmitting = false;
      }
    } else {
      this.isSubmitting = false;
    }
  }

  dataEdit() {
    this.router.navigate([`pages/employee/${this.feature}/edit/${this.id}`]).then();
  }

  changeJobFunction() {
    this.formSupervisor.patchValue({
      is_supervisor_sales: 0,
      is_supervisor_logistic: 0,
    });
    this.dataForm.patchValue({
      is_supervisor_sales: this.formSupervisor.controls['is_supervisor_sales'].value,
      is_supervisor_logistic: this.formSupervisor.controls['is_supervisor_logistic'].value,
    });
  }

  opsiDropdown(){
    return this.feature === 'sales' ? this.dropdown_sales : this.dropdown_collector ;
  }

  changeCollector() {
    const collectorEmployee: CollectorEmployeeSales = Collector.toEmployeeSalesObject(this.formCollector.get(['collector']).value);
    console.info("change collector ", collectorEmployee);
    this.dataForm.patchValue({
      is_collector_only: collectorEmployee.is_collector_only,
    });
  }

  changeSales() {
    console.info(this.formSupervisor.controls['is_supervisor_sales'].value);
    this.dataForm.patchValue({
      is_supervisor_sales: (this.formSupervisor.controls['is_supervisor_sales'].value == false) ? 0 : 1,
    });
  }

  changeLogistic() {
    console.info(this.formSupervisor.controls['is_supervisor_logistic'].value);
    this.dataForm.patchValue({
      is_supervisor_logistic: (this.formSupervisor.controls['is_supervisor_logistic'].value == false) ? 0 : 1,
    });
  }

  ngOnDestroy() {
    //
  }
}
