import { Component, ElementRef, NgZone, OnInit, ViewChild, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { BranchService } from '../../../../services/branch.service';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';
import { ToasterService } from 'angular2-toaster';
import { ScrollToConfigOptions, ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { DivisionsService } from '../../../../services/divisions.service';
import { label_data_save } from '../../../../configs/configs';
import { checkZeroValue, convertZeroValue } from '../../../../helper/ExtraFunction';
import { ApprovalService } from '../../../../services/approval.service';
import { untilDestroyed } from 'ngx-take-until-destroy';

declare var google: any;

@Component({
  selector: 'ngx-branch-edit',
  styleUrls: ['./branch-edit.component.scss'],
  templateUrl: './branch-edit.component.html',
})

export class BranchEditComponent implements OnInit, OnDestroy {
  id: number;
  latitude: number;
  longitude: number;
  address: string;
  public zoom: number;
  public searchControl: FormControl;
  isSubmitting: boolean = false;
  isLoadingDropdown: boolean = false;
  isLoadingGeneral: boolean = true;
  isPickMap: boolean = false;
  isView: boolean = false;
  method: string;
  @ViewChild('search')
  public searchElementRef: ElementRef;
  dataForm: FormGroup;
  serverErrors = [];
  public mask_time = [/\d/, /\d/, ':', /\d/, /\d/];
  public branch_code_mask = [/[a-z A-Z 0-9]/, /[a-z A-Z 0-9]/];

  divisionsDropdownList: Array<any> = [];
  areaData: Array<any> = [];
  dayData: Array<any> = [];
  dataName = label_data_save.saving;
  loadingDropdownArea = false;
  loadingDropdownDivision = false;
  isApprovalView: boolean = false;

  constructor(
    private branchService: BranchService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private fb: FormBuilder,
    private toasterService: ToasterService,
    private _scrollToService: ScrollToService,
    private router: Router,
    private route: ActivatedRoute,
    private divisionsService: DivisionsService,
    private location: Location,
    private approvalService: ApprovalService,
  ) {
  }

  ngOnInit() {

    // this.selectedArea = this.areaData[0]
    // console.log(this.selectedArea);

    this.dayData = [
      {
        key: 'Monday',
        val: 'Monday',
      },
      {
        key: 'Tuesday',
        val: 'Tuesday',
      },
      {
        key: 'Wednesday',
        val: 'Wednesday',
      },
      {
        key: 'Thursday',
        val: 'Thursday',
      },
      {
        key: 'Friday',
        val: 'Friday',
      },
      {
        key: 'Saturday',
        val: 'Saturday',
      },
      {
        key: 'Sunday',
        val: 'Sunday',
      },
    ];

    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      const id = +params['id'];
      const id_approval = +params['id_approval'];

      if (!!id) {
        // id not empty => edit form
        this.prepareEditForm(id);

        // if (id === 1) { // id = 1 is main company
        //   this.location.back();
        // } else {
        //   this.prepareEditForm(id);
        // }
      } else if (!!id_approval) {
        this.prepareViewApproval(id_approval);
        this.isApprovalView = true;
      } else {
        this.isLoadingGeneral = false;
      }
    });
    // for map search
    // create search FormControl
    this.searchControl = new FormControl();

    if (this.route.snapshot.data['method'] === 'view') {
      this.isView = true;
    }

    this.method = this.route.snapshot.data['method'];

    this.dataForm = this.fb.group({
      name: [{value: null, disabled: this.id == 1}],
      email: [{value: null, disabled: this.id == 1}],
      phone: [{value: null, disabled: this.id == 1}],
      address: [{value: null, disabled: this.id == 1}],
      lat: [{value: null, disabled: this.id == 1}],
      lng: [{value: null, disabled: this.id == 1}],
      working_day_start: [{value: null, disabled: (this.id == 1 || this.isView)}],
      working_day_end: [{value: null, disabled: (this.id == 1 || this.isView)}],
      working_hour_start: [{value: null, disabled: this.id == 1}],
      working_hour_end: [{value: null, disabled: this.id == 1}],
      nfcid: [{value: this.id ? this.id : '-', disabled: true}],
      division_id: [{value: null, disabled: this.isView}],
      area_id: [{value: null, disabled: this.isView}],
      branch_code: [{value: null, disabled: this.id == 1}],
    });
  }

  back() {
    this.location.back();
  }

  prepareViewApproval(id) {
    this.openDropdownDivision();
    this.openDropdownArea();
    // get data detail
    let working_hour_start = '00:00', working_hour_end = '00:00';
    this.approvalService.show_approval(id)
      .pipe(untilDestroyed(this))
      .subscribe(branch => {
      const branch_data = branch.data.data;
      if (branch.error == 0) {
        if (!branch_data) {
          this.location.back();
        } else {
          this.latitude = branch_data.lat;
          this.longitude = branch_data.lng;
          if (!!branch_data.working_hour_start) {
            working_hour_start = branch_data.working_hour_start;
          }
          if (!!branch_data.working_hour_end) {
            working_hour_end = branch_data.working_hour_end;
          }
          const dh_start = working_hour_start.split(':'); // date hour start
          const dh_end = working_hour_end.split(':'); // date hour start
          this.dataForm.setValue({
            name: branch_data.name,
            email: branch_data.email,
            phone: branch_data.phone,
            address: branch_data.address,
            lat: branch_data.lat,
            lng: branch_data.lng,
            working_day_start: branch_data.working_day_start,
            working_day_end: branch_data.working_day_end,
            working_hour_start: `${dh_start[0]}`.padStart(2, '0') + ':'
              + `${dh_start[1]}`.padStart(2, '0'),
            working_hour_end: `${dh_end[0]}`.padStart(2, '0') + ':'
              + `${dh_end[1]}`.padStart(2, '0'),
            nfcid: this.id ? this.id : '-',
            division_id: branch_data.division_id,
            area_id: branch_data.area_id,
            branch_code: branch_data.branch_code,
          });
        }
        this.isLoadingGeneral = false;
      } else {
        this.toasterService.popAsync('error', 'Error', 'Data Not found');
        setTimeout(() => {
          this.location.back();
        }, 2000);
      }

    }, errors => {
      const errorMessage = 'Something wrong with error: ' +
        errors.message + '. Error detail: ' + errors.error.message;
      // console.log(errors);
      this.toasterService.popAsync('error', 'Error', errorMessage);
      setTimeout(() => {
        this.location.back();
      }, 2000);
    });
  }

  prepareEditForm(id) {
    this.openDropdownDivision();
    this.openDropdownArea();
    // get data detail
    let working_hour_start = '00:00', working_hour_end = '00:00';
    this.branchService.show(id)
      .pipe(untilDestroyed(this))
      .subscribe(branch => {
      const branch_data = branch.data;
      if (branch.error == 0) {
        if (!branch_data) {
          this.location.back();
        } else {
          this.latitude = branch_data.lat;
          this.longitude = branch_data.lng;
          if (!!branch_data.working_hour_start) {
            working_hour_start = branch_data.working_hour_start;
          }
          if (!!branch_data.working_hour_end) {
            working_hour_end = branch_data.working_hour_end;
          }
          const dh_start = working_hour_start.split(':'); // date hour start
          const dh_end = working_hour_end.split(':'); // date hour start
          this.dataForm.setValue({
            name: branch_data.name,
            email: branch_data.email,
            phone: branch_data.phone,
            address: branch_data.address,
            lat: branch_data.lat,
            lng: branch_data.lng,
            working_day_start: branch_data.working_day_start,
            working_day_end: branch_data.working_day_end,
            working_hour_start: `${dh_start[0]}`.padStart(2, '0') + ':'
              + `${dh_start[1]}`.padStart(2, '0'),
            working_hour_end: `${dh_end[0]}`.padStart(2, '0') + ':'
              + `${dh_end[1]}`.padStart(2, '0'),
            nfcid: this.id ? this.id : '-',
            division_id: branch_data.division_id,
            area_id: branch_data.area_id,
            branch_code: branch_data.branch_code,
          });
        }
        this.isLoadingGeneral = false;
      } else {
        this.toasterService.popAsync('error', 'Error', 'Data Not found');
        setTimeout(() => {
          this.location.back();
        }, 2000);
      }

    }, errors => {
      const errorMessage = 'Something wrong with error: ' +
        errors.message + '. Error detail: ' + errors.error.message;
      // console.log(errors);
      this.toasterService.popAsync('error', 'Error', errorMessage);
      setTimeout(() => {
        this.location.back();
      }, 2000);
    });
  }

  /**
   * Callback after dragging a marker
   * @param $event
   */
  dragEnd($event) {
    if (!!this.isView || this.id === 1) {
      this.toasterService.popAsync('info', 'Info', `You can't modify this data`);
    } else {
      this.latitude = $event.coords.lat;
      this.longitude = $event.coords.lng;
      this.dataForm.patchValue({
        lat: $event.coords.lat,
        lng: $event.coords.lng,
      });
      const latlng = {lat: $event.coords.lat, lng: $event.coords.lng};

      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({'location': latlng}, (results, status) => {
        this.ngZone.run(() => {
          if (status === google.maps.GeocoderStatus.OK) {
            this.address = results[0].formatted_address;
            this.dataForm.patchValue({
              address: results[0].formatted_address,
            });
          } else {
            //
          }
        });
      });
    }
  }

  /**
   * Save data
   * @param formValue
   * @param nextAction
   */
  saveData(formValue, nextAction) {
    this.isSubmitting = true;
    this.serverErrors = [];
    if (checkZeroValue(this.dataForm, 'branch_code', this.serverErrors, this.toasterService)) {
      if (convertZeroValue(this.dataForm, 'phone', this.serverErrors, this.toasterService)) {
        this.branchService.save(this.dataForm.value, this.id)
          .pipe(untilDestroyed(this))
          .subscribe(
          (res) => {
            this.toasterService.popAsync('success', 'Success', res.message);
            if (nextAction === 'close') {
              this.dataName = label_data_save.redirect;
              this.location.back();
            } else if (nextAction === 'new') {
              this.dataForm.reset();
              // this.dataForm.reset('');
              this.isSubmitting = false;
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
      } else {
        this.isSubmitting = false;
      }
    } else {
      this.isSubmitting = false;
    }
  }

  dataEdit() {
    this.router.navigate([`pages/settings/branch/edit/${this.id}`]).then();

    // this.location.replaceState(`pages/settings/branch/edit/${this.id}`);
    // this.isView = false;
    this.method = 'EDIT';
  }

  /**
   * Show the picker map
   */
  pickMap() {
    this.isPickMap = true;
    const config: ScrollToConfigOptions = {
      target: 'pickmap_input',
    };

    this._scrollToService.scrollTo(config);
    // set google maps defaults
    this.zoom = 17;

    setTimeout(() => {
      // load Places Autocomplete
      this.mapsAPILoader.load().then(() => {
        const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
        autocomplete.addListener('place_changed', () => {
          this.ngZone.run(() => {

            const place: google.maps.places.PlaceResult = autocomplete.getPlace();

            // verify result
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }

            // set latitude, longitude and zoom
            // console.log(place);
            this.address = place.formatted_address;
            this.latitude = place.geometry.location.lat();
            this.longitude = place.geometry.location.lng();
            this.zoom = 17;

            this.dataForm.patchValue({
              address: place.formatted_address,
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            });
            // if (!!this.isView) {
            //   this.toasterService.popAsync('info', 'Info', `You can't modify this data`);
            // } else {
            //   // get the place result
            //   const place: google.maps.places.PlaceResult = autocomplete.getPlace();
            //
            //   // verify result
            //   if (place.geometry === undefined || place.geometry === null) {
            //     return;
            //   }
            //
            //   // set latitude, longitude and zoom
            //   // console.log(place);
            //   this.address = place.formatted_address;
            //   this.latitude = place.geometry.location.lat();
            //   this.longitude = place.geometry.location.lng();
            //   this.zoom = 17;
            //
            //   this.dataForm.patchValue({
            //     address: place.formatted_address,
            //     lat: place.geometry.location.lat(),
            //     lng: place.geometry.location.lng(),
            //   });
            // }
          });
        });
      });
    }, 2000);

  }

  /**
   * Hide map input
   */
  hideMap() {
    this.isPickMap = false;
    const config: ScrollToConfigOptions = {
      target: 'address_input',
    };

    this._scrollToService.scrollTo(config);
  }

  openDropdownArea() {
    this.loadingDropdownArea = true;
    this.areaData = [];
    this.branchService.listArea()
      .pipe(untilDestroyed(this))
      .subscribe(results => {
      this.areaData = results.data.data;
      this.loadingDropdownArea = false;
    });
  }

  openDropdownDivision() {
    this.divisionsDropdownList = [];
    this.loadingDropdownDivision = true;
    this.divisionsService.index_dropdown()
      .pipe(untilDestroyed(this))
      .subscribe(divisions => {
      this.divisionsDropdownList = divisions.data.data;
      this.loadingDropdownDivision = false;
    });
  }

  selectAll() {
    let value = {};
    value['division_id'] = this.divisionsDropdownList.map(x => x.id);
    this.dataForm.patchValue(value);
  }

  unselectAll() {
    let value = {};
    value['division_id'] = null;
    this.dataForm.patchValue(value);
  }

  ngOnDestroy() {
    //
  }
}
