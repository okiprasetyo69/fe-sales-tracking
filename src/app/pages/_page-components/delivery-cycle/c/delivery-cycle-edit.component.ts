import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../../../../services/user.service';
import { CustomerService } from '../../../../services/customer.service';
import { DeliveryCycleService } from '../../../../services/delivery-cycle.service';
import { ToasterService } from 'angular2-toaster';
import { BranchService } from '../../../../services/branch.service';
import { Location } from '@angular/common';
import { label_data_save } from '../../../../configs/configs';
import { ApprovalService } from '../../../../services/approval.service';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'ngx-delivery-cycle-edit',
  templateUrl: './delivery-cycle-edit.component.html',
  styleUrls: ['./delivery-cycle-edit.component.scss'],
})
export class DeliveryCycleEditComponent implements OnInit, OnDestroy {
  id: number;
  isLoadingDropdown: boolean = false;
  isLoadingGeneral: boolean = true;
  isSubmitting: boolean = false;
  isView: boolean = false;
  method: string;
  serverErrors = [];
  dataForm: any;
  // dropdown
  userDropdown: Array<any> = [];
  userDropdownLoading: boolean = false;
  dataName = label_data_save.saving;
  isApprovalView: boolean = false;


  errorCycle = {
    cycle_monday: [],
    cycle_tuesday: [],
    cycle_wednesday: [],
    cycle_thursday: [],
    cycle_friday: [],
    cycle_saturday: [],
    cycle_sunday: [],
  };

  constructor(
    private userService: UserService,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private deliveryService: DeliveryCycleService,
    private toasterService: ToasterService,
    private router: Router,
    private branchService: BranchService,
    private location: Location,
    private approvalService: ApprovalService,
  ) {
  }

  ngOnInit() {
    if (this.route.snapshot.data['method'] === 'view') {
      this.isView = true;
    }
    // get id params from url
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
        this.prepareCreateForm();
      }
    });

    // this.destinationForm = {
    //   customer_code: '',
    //   note: '',
    // };


    this.method = this.route.snapshot.data['method'];
  }

  back() {
    this.location.back();
  }

  prepareViewApproval(id) {
    this.loadUserDropdown();
    // preparing general data
    const cycle_day_array = [
      'cycle_monday',
      'cycle_tuesday',
      'cycle_wednesday',
      'cycle_thursday',
      'cycle_friday',
      'cycle_saturday',
      'cycle_sunday',
    ];
    this.approvalService.show_approval(id)
      .pipe(untilDestroyed(this))
      .subscribe(results => {
      const result_data = results.data.data;
      this.dataForm = result_data;
      for (const cycle_day of cycle_day_array) {
        if (!result_data[cycle_day]) {
          console.info(cycle_day);
          this.dataForm[cycle_day] = {
            destination: null,
            end_route_branch_id: null,
            route: null,
            start_route_branch_id: null,
            is_use_route: 0,
          };
        }
      }
      console.info(this.dataForm);
      this.isLoadingGeneral = false;
    },
    errors => {
      const errorMessage = 'Something wrong with error: ' +
        errors.message + '. Error detail: ' + errors.error.message;
      // console.log(errors);
      this.toasterService.popAsync('error', 'Error', errorMessage);
      setTimeout(() => {
        this.router.navigate(['/pages/logistic/delivery_cycle/index']).then();
      }, 2000);
    });
  }

  prepareEditForm(id) {
    this.loadUserDropdown();
    // preparing general data
    const cycle_day_array = [
      'cycle_monday',
      'cycle_tuesday',
      'cycle_wednesday',
      'cycle_thursday',
      'cycle_friday',
      'cycle_saturday',
      'cycle_sunday',
    ];
    this.deliveryService.show(id)
      .pipe(untilDestroyed(this))
      .subscribe(results => {
        this.dataForm = results.data;
        for (const cycle_day of cycle_day_array) {
          if (!results.data[cycle_day]) {
            console.info(cycle_day);
            this.dataForm[cycle_day] = {
              destination: null,
              end_route_branch_id: null,
              route: null,
              start_route_branch_id: null,
              is_use_route: 0,
            };
          }
        }
        console.info(this.dataForm);
        this.isLoadingGeneral = false;
      },
      errors => {
        const errorMessage = 'Something wrong with error: ' +
          errors.message + '. Error detail: ' + errors.error.message;
        // console.log(errors);
        this.toasterService.popAsync('error', 'Error', errorMessage);
        setTimeout(() => {
          this.router.navigate(['/pages/logistic/delivery_cycle/index']).then();
        }, 2000);
      });
  }

  prepareCreateForm() {
    this.dataForm = {
      user_id: null,
      asset_id: null,
      cycle_number: null,
      cycle_monday: {
        destination: null,
        end_route_branch_id: null,
        route: null,
        start_route_branch_id: null,
        destination_order: null,
        is_use_route: 0,
      },
      cycle_tuesday: {
        destination: null,
        end_route_branch_id: null,
        route: null,
        start_route_branch_id: null,
        destination_order: null,
        is_use_route: 0,
      },
      cycle_wednesday: {
        destination: null,
        end_route_branch_id: null,
        route: null,
        start_route_branch_id: null,
        destination_order: null,
        is_use_route: 0,
      },
      cycle_thursday: {
        destination: null,
        end_route_branch_id: null,
        route: null,
        start_route_branch_id: null,
        destination_order: null,
        is_use_route: 0,
      },
      cycle_friday: {
        destination: null,
        end_route_branch_id: null,
        route: null,
        start_route_branch_id: null,
        destination_order: null,
        is_use_route: 0,
      },
      cycle_saturday: {
        destination: null,
        end_route_branch_id: null,
        route: null,
        start_route_branch_id: null,
        destination_order: null,
        is_use_route: 0,
      },
      cycle_sunday: {
        destination: null,
        end_route_branch_id: null,
        route: null,
        start_route_branch_id: null,
        destination_order: null,
        is_use_route: 0,
      },
    };

    this.isLoadingGeneral = false;
  }

  saveData(formValue, nextAction) {
    this.isSubmitting = true;
    this.serverErrors = [];
    this.errorCycle = {
      cycle_monday: [],
      cycle_tuesday: [],
      cycle_wednesday: [],
      cycle_thursday: [],
      cycle_friday: [],
      cycle_saturday: [],
      cycle_sunday: [],
    };
    this.deliveryService.save(formValue, this.id)
      .pipe(untilDestroyed(this))
      .subscribe(res => {
        this.toasterService.popAsync('success', 'Success', res.message);
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
        let cycle;
        let cycleName;
        let cycleField;
        if (!!errors.error.data && errors.error.data.length) {
          for (const error of errors.error.data) {
            cycle = error['field'].split('.');
            if (cycle.length == 2) {
              cycleName = cycle[0];
              cycleField = cycle[1];
              const clearingName = cycleName.split('_');
              let displayName;
              displayName = '';
              let x;
              for (x of clearingName) {
                displayName = displayName.concat(x.charAt(0).toUpperCase().concat(x.substring(1))).concat(' ');
              }
              displayName.substring(0, (displayName.length - 1));

              let errorMessage = "";
              for (let message of error['message'].split(" ")) {
                if (message == cycleName) {
                  errorMessage = errorMessage + displayName + " ";
                } else {
                  errorMessage = errorMessage + message + " ";
                }
              }

              this.toasterService.popAsync('error', displayName + " Error", errorMessage);

              let errorField = {};
              if (typeof this.errorCycle[cycleName] != 'undefined') {
                let storeError = [];
                storeError = this.errorCycle[cycleName];
                storeError[cycleField] = error['message'];
                errorField = storeError;
                console.info('Ok', this.errorCycle[cycleName]);
              } else {
                errorField[cycleField] = cycleField;
                this.errorCycle[cycleName] = errorField;
              }
            } else {
              const field = error['field'];
              this.serverErrors[field] = error['message'];
            }
          }
        } else {
          const errorMessage = errors.error.message;
          this.toasterService.popAsync('error', 'Error', errorMessage);
        }
      },
    );
  }

  dataEdit() {
    this.router.navigate([`pages/logistic/delivery_cycle/edit/${this.id}`]).then();
  }

  loadUserDropdown() {
    this.userDropdownLoading = true;
    this.deliveryService.dropdownUser()
      .pipe(untilDestroyed(this))
      .subscribe(res => {
      this.userDropdownLoading = false;
      this.userDropdown = res.data.data;
    });
  }

  ngOnDestroy() {
    //
  }
}
