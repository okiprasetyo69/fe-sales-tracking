import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AssetService } from '../../../../services/asset.service';
import { ToasterService } from 'angular2-toaster';
import { label_data_save } from '../../../../configs/configs';
import { ApprovalService } from '../../../../services/approval.service';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'ngx-assets-edit',
  templateUrl: './assets-edit.component.html',
  styleUrls: ['./assets-edit.component.scss'],
})
export class AssetsEditComponent implements OnInit, OnDestroy {
  id: number;
  isView: boolean = false;
  dataForm: FormGroup;
  method: string;
  dropdownAssetType = [];
  serverErrors = [];
  asset_status = [
    {status: 'Active', value: 'active'},
    {status: 'Inactive', value: 'inactive'},
  ];
  isLoadingGeneral: boolean = true;
  isLoadingDropdownAssetType: boolean = false;
  isSubmitting = false;
  dataName = label_data_save.saving;
  isApprovalView: boolean = false;


  constructor(
    private location: Location,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private assetService: AssetService,
    private toasterService: ToasterService,
    private approvalService: ApprovalService,
  ) {
  }

  ngOnInit() {
    this.method = this.route.snapshot.data['method'];
    if (this.route.snapshot.data['method'] === 'view') {
      this.isView = true;
    }

    if (this.route.snapshot.data['method'] !== 'create') {
      this.route.params.subscribe(params => {
        this.id = params['id'];
        const id = params['id'];
        const id_approval = params['id_approval'];
        if (!!id) {
          this.prepareEditForm(id);
        } else if (!!id_approval) {
          this.prepareViewApproval(id_approval);
          this.isApprovalView = true;
        } else {
          this.isLoadingGeneral = false;
        }
      });
    } else {
      this.isLoadingGeneral = false;
    }

    this.dataForm = this.fb.group({
      asset_status: [{value: 'active', disabled: this.isView}],
      asset_type_id: [{value: null, disabled: this.isView}],
      code: [{value: null, disabled: this.isView}],
      device_code: [{value: null, disabled: this.isView}],
      id: [{value: null, disabled: this.isView}],
      isUsed: [{value: null, disabled: this.isView}],
      name: [{value: null, disabled: this.isView}],
      notes: [{value: null, disabled: this.isView}],
    });
    // this.checkAssetType();
  }

  prepareViewApproval(id) {
    this.openDropdownAssetType();
    // preparing general data
    this.approvalService.show_approval(id)
      .pipe(untilDestroyed(this))
      .subscribe(results => {
      // console.log(results);
      const dataAssets = results.data.data;
      const errorCode = results.error;
      console.info(results);
      if (errorCode == 0) {
        this.dataForm.patchValue({
          asset_status: (dataAssets.asset_status) ? dataAssets.asset_status : 'active',
          asset_type_id: dataAssets.asset_type_id,
          code: dataAssets.code,
          device_code: dataAssets.device_code,
          id: dataAssets.id,
          isUsed: dataAssets.is_used,
          name: dataAssets.name,
          notes: dataAssets.notes,
        });
      } else {
        this.toasterService.popAsync('error', 'Error', 'Data Not found');
        setTimeout(() => {
          this.location.back();
        }, 2000);
      }
      // this.checkAssetType();
      this.isLoadingGeneral = false;
    }, errors => {
      console.info(errors);
      this.toasterService.popAsync('error', 'Error', 'Data Not found');
      setTimeout(() => {
        this.location.back();
      }, 2000);
    });
  }

  prepareEditForm(id) {
    this.openDropdownAssetType();
    // preparing general data
    this.assetService.show(id)
      .pipe(untilDestroyed(this))
      .subscribe(results => {
      // console.log(results);
      const dataAssets = results.data;
      const errorCode = results.error;
      console.info(results);
      if (errorCode == 0) {
        this.dataForm.patchValue({
          asset_status: (dataAssets.asset_status) ? dataAssets.asset_status : 'active',
          asset_type_id: dataAssets.asset_type_id,
          code: dataAssets.code,
          device_code: dataAssets.device_code,
          id: dataAssets.id,
          isUsed: dataAssets.is_used,
          name: dataAssets.name,
          notes: dataAssets.notes,
        });
      } else {
        this.toasterService.popAsync('error', 'Error', 'Data Not found');
        setTimeout(() => {
          this.location.back();
        }, 2000);
      }
      // this.checkAssetType();
      this.isLoadingGeneral = false;
    }, errors => {
      console.info(errors);
      this.toasterService.popAsync('error', 'Error', 'Data Not found');
      setTimeout(() => {
        this.location.back();
      }, 2000);
    });
  }

  dataEdit() {
    this.router.navigate([`/pages/assets/assets/edit/${this.id}`]).then();
  }

  back() {
    this.location.back();
  }

  openDropdownAssetType() {
    this.isLoadingDropdownAssetType = true;
    this.assetService.dropdownAssetType()
      .pipe(untilDestroyed(this))
      .subscribe(result => {
        this.dropdownAssetType = result.data.data;
        this.isLoadingDropdownAssetType = false;
      });
  }

  save(nextAction) {
    this.isSubmitting = true;
    this.serverErrors = [];
    const code = this.dataForm.controls['code'].value;
    // let arrayData = [];
    // let x = 0;
    const reg = new RegExp('^\\d+$');
    if (reg.test(code)) {
      let dataOutput = '';
      if (code[0] == 0) {
        if (code.length > 1) {
          dataOutput = code[0].toString().concat('-').concat(code.substr(1));
        } else {
          dataOutput = code[0].toString();
        }
      } else {
        dataOutput = code;
      }
      // for (let i = 0; i < code.length; i++) {
      //   arrayData.push(code[i]);
      //   x = x + 1;
      //   if ((i + 1) != code.length) {
      //     if (x == 3) {
      //       arrayData.push('-');
      //       x = 0;
      //     }
      //   }
      // }
      // let dataConvert = "";
      // for (let z = 0; z < arrayData.length; z++) {
      //   dataConvert += arrayData[z];
      // }
      this.dataForm.patchValue({
        code: dataOutput,
      });
      console.info(dataOutput);
    }
    this.assetService.save(this.dataForm.value, this.id)
      .pipe(untilDestroyed(this))
      .subscribe(results => {
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
    });
  }

  // assetTypeChange() {
  //   console.log("Changed");
  //   this.checkAssetType();
  // }

  // checkAssetType() {
  //   let code = this.dataForm.get('code');
  //   if (this.dataForm.controls['asset_type_id'].value == null) {
  //     code.disable();
  //   } else {
  //     code.enable();
  //   }
  // }

  ngOnDestroy() {
    //
  }
}
