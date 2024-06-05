import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserGroupService } from '../../../../services/user-group.service';
import { ToasterService } from 'angular2-toaster';
import {
  dropdown_crud_user_group,
  dropdown_menu_user_group,
  dropdown_import_user_group,
  label_data_save,
  permission_table, Permission,
} from '../../../../configs/configs';
import { Location } from '@angular/common';
import { ApprovalService } from '../../../../services/approval.service';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
    selector: 'ngx-user-groups-edit',
    styleUrls: ['./user-groups-edit.component.scss'],
    templateUrl: './user-groups-edit.component.html',
})

export class UserGroupsEditComponent implements OnInit, OnDestroy {
    id: number;
    isLoadingDropdown: boolean = false;
    isLoadingGeneral: boolean = true;
    isSubmitting: boolean = false;
    isView: boolean = false;
    method: string;
    serverErrors = [];
    dataPermissionTable: any = [];
    dataForm: any;
    yes_no_dropdown: Array<any> = [];
    have_asset: number = 0;

    // to make list of permission
    permissionTable: Permission[] = permission_table;
    dropDownMenu: Array<any> = dropdown_menu_user_group;
    dropDownCrud: Array<any> = dropdown_crud_user_group;
    dropDownImport: Array<any> = dropdown_import_user_group;
    dataName = label_data_save.saving;

    isApprovalView: boolean = false;

    constructor(
        private groupService: UserGroupService,
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
                this.prepareCreateForm();
            }
        });

        if (this.route.snapshot.data['method'] === 'view') {
            this.isView = true;
        }
        ;

        this.method = this.route.snapshot.data['method'];

        this.yes_no_dropdown = [
            {
                key: 0,
                val: 'No',
            },
            {
                key: 1,
                val: 'Yes',
            },
        ];

    }

    back() {
        this.location.back();
    }

    prepareViewApproval(id) {
        // preparing general data
        this.approvalService.show_approval(id)
            .pipe(untilDestroyed(this))
            .subscribe(results => {
                const result_data = results.data.data;
                console.info(results);
                // get permissions
                this.dataPermissionTable = result_data.permissions;
                // get general data
                this.dataForm = result_data;
                this.have_asset = result_data.have_asset;
                this.isLoadingGeneral = false;
            }, errors => {
                this.isLoadingGeneral = false;
                const errorMessage = 'Something wrong with error: ' +
                    errors.message + '. Error detail: ' + errors.error.message;
                // console.log(errors);
                this.toasterService.popAsync('error', 'Error', errorMessage);
                setTimeout(() => {
                    this.router.navigate(['/pages/settings/user/groups/index']);
                }, 2000);
            });
    }

    prepareEditForm(id) {
        // preparing general data
        this.groupService.show(id)
            .pipe(untilDestroyed(this))
            .subscribe(results => {
                console.info(results);
                // get permissions
                this.dataPermissionTable = results.data.permissions;
                // get general data
                this.dataForm = results.data;
                this.have_asset = results.data.have_asset;
                this.isLoadingGeneral = false;
            }, errors => {
                this.isLoadingGeneral = false;
                const errorMessage = 'Something wrong with error: ' +
                    errors.message + '. Error detail: ' + errors.error.message;
                // console.log(errors);
                this.toasterService.popAsync('error', 'Error', errorMessage);
                setTimeout(() => {
                    this.router.navigate(['/pages/settings/user/groups/index']);
                }, 2000);
            });
    }

    prepareCreateForm() {
        this.groupService.permission_default()
            .pipe(untilDestroyed(this))
            .subscribe(results => {
                this.dataPermissionTable = results.data;

                // initialize create form
                this.dataForm = {
                    asset: {
                        mobile_phone: false,
                        printer: false,
                    },
                    code: '',
                    group_name: '',
                    have_asset: 0,
                    permissions: results.data,
                };

                this.isLoadingGeneral = false;
            });
    }

    /**
     * Update user group
     * @param dataForm
     */
    saveData(formValue, nextAction) {
        this.isSubmitting = true;
        this.serverErrors = [];
        // console.log(formValue);
        const dataBody = formValue;
        this.groupService.save(dataBody, this.id)
            .pipe(untilDestroyed(this))
            .subscribe((res) => {
                    // console.log(data);
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
                    // console.log(errors.error.data);
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
    }

    dataEdit() {
        this.router.navigate([`/pages/settings/user_groups/edit/${this.id}`]).then();
    }

    setAssetToNull(val) {
        console.info(val);
        if (+val === 0) {
            this.have_asset = 0;
            console.info('masuk ke 0');
            this.dataForm.asset = {
                mobile_phone: false,
                printer: false,
            };
        } else {
            this.have_asset = 1;
        }
    }

    ngOnDestroy() {
        //
    }
}
