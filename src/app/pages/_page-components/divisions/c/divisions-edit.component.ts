import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';

import { DivisionsService } from '../../../../services/divisions.service';
import { ToasterService } from 'angular2-toaster';
import { label_data_save } from '../../../../configs/configs';
import { checkZeroValue } from '../../../../helper/ExtraFunction';
import { ApprovalService } from '../../../../services/approval.service';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'ngx-divisions-edit',
  styleUrls: ['./divisions-edit.component.scss'],
  templateUrl: './divisions-edit.component.html',
})
export class DivisionsEditComponent implements OnInit, OnDestroy {
  id: number;
  dataForm: FormGroup;
  serverErrors = [];
  isSubmitting: boolean = false;
  isView: boolean = false;
  method: string;
  isLoadingDropdown: boolean = false;
  isLoadingGeneral: boolean = true;
  public division_code_mask = [/[a-z A-Z 0-9]/, /[a-z A-Z 0-9]/];
  dataName = label_data_save.saving;
  isApprovalView: boolean = false;

  constructor(
    private divisionsService: DivisionsService,
    private fb: FormBuilder,
    private toasterService: ToasterService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private approvalService: ApprovalService,
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      const id = +params['id'];
      const id_approval = +params['id_approval'];

      if (!!id) {
        // id not empty => edit form
        this.prepareEditForm(id);
      } else if (!!id_approval) {
        this.prepareViewApproval(id_approval);
        this.isApprovalView = true;
      } else {
        this.isLoadingGeneral = false;
      }
    });

    this.dataForm = this.fb.group({
      division_name: [],
      division_code: [],
    });

    if (this.route.snapshot.data['method'] === 'view') {
      this.isView = true;
    }
    ;

    this.method = this.route.snapshot.data['method'];
  }

  back() {
    this.location.back();
  }

  prepareViewApproval(id) {
    // get data detail
    this.approvalService.show_approval(id)
      .pipe(untilDestroyed(this))
      .subscribe(divisions => {
        const division_data = divisions.data.data;
        if (divisions.error == 0) {
          if (!division_data) {
            this.toasterService.popAsync('error', 'Error', 'Data Not Found');
            setTimeout(() => {
              this.location.back();
            }, 2000);
          } else {
            this.dataForm.setValue({
              division_name: division_data.division_name,
              division_code: division_data.division_code,
            });
          }
          this.isLoadingGeneral = false;
        } else {
          this.toasterService.popAsync('error', 'Error', 'Data Not Found');
          setTimeout(() => {
            this.location.back();
          }, 2000);
        }
      }, () => {
        // console.log(errors);
        this.toasterService.popAsync('error', 'Error', 'Data Not Found');
        setTimeout(() => {
          this.location.back();
        }, 2000);
      });
  }

  prepareEditForm(id) {
    // get data detail
    this.divisionsService.show(id)
      .pipe(untilDestroyed(this))
      .subscribe(divisions => {
        const division_data = divisions.data;
        // console.log(division_data);
        if (divisions.error == 0) {
          if (!division_data) {
            this.toasterService.popAsync('error', 'Error', 'Data Not Found');
            setTimeout(() => {
              this.location.back();
            }, 2000);
          } else {
            this.dataForm.setValue({
              division_name: division_data.division_name,
              division_code: division_data.division_code,
            });
          }
          this.isLoadingGeneral = false;
        } else {
          this.toasterService.popAsync('error', 'Error', 'Data Not Found');
          setTimeout(() => {
            this.location.back();
          }, 2000);
        }
      }, () => {
        // console.log(errors);
        this.toasterService.popAsync('error', 'Error', 'Data Not Found');
        setTimeout(() => {
          this.location.back();
        }, 2000);
      });
  }

  saveData(formValue, nextAction) {
    this.isSubmitting = true;
    this.serverErrors = [];
    // console.log(formValue);
    if (checkZeroValue(this.dataForm, 'division_code', this.serverErrors, this.toasterService)) {
      this.divisionsService.save(formValue, this.id)
        .pipe(untilDestroyed(this))
        .subscribe((res) => {
          // this.dataForm.reset('');

          this.toasterService.popAsync('success', 'Success', res.message);
          if (nextAction === 'close') {
            this.dataName = label_data_save.redirect;
            setTimeout(() => {
              this.location.back();
            }, 2000);
          } else if (nextAction === 'new') {
            this.dataForm.reset();
            // this.dataForm.reset('');
            this.isSubmitting = false;
          } else {
            this.isSubmitting = false;
          }
        }, errors => {
          // console.log(errors.error.data);
          console.info(errors);
          this.isSubmitting = false;
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
    } else {
      this.isSubmitting = false;
    }
  }

  dataEdit() {
    this.router.navigate([`pages/settings/divisions/edit/${this.id}`]).then();
    // this.location.replaceState(`pages/settings/divisions/edit/${this.id}`);
    // this.isView = false;
    // this.method = 'EDIT';
  }

  ngOnDestroy() {
    //
  }
}
