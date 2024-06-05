import { Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';

import { CompanyService } from '../../../../services/company.service';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';
import { ToasterService } from 'angular2-toaster';
import { ScrollToConfigOptions, ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { label_data_save } from "../../../../configs/configs";
import { untilDestroyed } from 'ngx-take-until-destroy';

declare var google: any;

@Component({
  selector: 'ngx-company-edit',
  styleUrls: ['./company-edit.component.scss'],
  templateUrl: './company-edit.component.html',
})
export class CompanyEditComponent implements OnInit, OnDestroy {
  id: number = 1; // main company always have id = 1
  latitude: number;
  longitude: number;
  address: string;
  public zoom: number;
  public searchControl: FormControl;
  isSubmitting: boolean = false;
  isLoading: boolean = false;
  isPickMap: boolean = false;
  @ViewChild('search')
  public searchElementRef: ElementRef;
  dataForm: FormGroup;
  serverErrors = [];
  dayData: Array<any> = [];
  public mask_time = [/\d/, /\d/, ':', /\d/, /\d/];
  dataName = label_data_save.saving;
  public branch_code_mask = [/[a-z A-Z 0-9]/, /[a-z A-Z 0-9]/];

  constructor(
    private companyService: CompanyService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private fb: FormBuilder,
    private toasterService: ToasterService,
    private _scrollToService: ScrollToService,
    private router: Router,
    private location: Location,
  ) {
  }

  ngOnInit() {
    this.isLoading = true;
    // get data detail
    this.companyService.show()
      .pipe(untilDestroyed(this))
      .subscribe(company => {
          // console.log(company.data);
          if (!company.data) {
            this.router.navigate(['/pages/settings/company/show']).then();
          } else {
            // set value for map picker
            this.latitude = company.data.lat;
            this.longitude = company.data.lng;

            // create new date object so that it could be formated with getHours and getMinutes
            const dh_start = company.data.working_hour_start.split(':'); // date hour start
            const dh_end = company.data.working_hour_end.split(':'); // date hour start
            console.info(company);
            this.dataForm.setValue({
              name: company.data.name,
              email: company.data.email,
              phone: company.data.phone,
              address: company.data.address,
              lat: company.data.lat,
              lng: company.data.lng,
              working_day_start: company.data.working_day_start,
              working_day_end: company.data.working_day_end,
              working_hour_start: `${dh_start[0]}`.padStart(2, '0') + ':'
              + `${dh_start[1]}`.padStart(2, '0'),
              working_hour_end: `${dh_end[0]}`.padStart(2, '0') + ':'
              + `${dh_end[1]}`.padStart(2, '0'),
              nfcid: company.data.nfcid,
              branch_code: company.data.branch_code,
            });
          }

          this.isLoading = false
        },
        errors => {
          this.isLoading = false;
          const errorMessage = 'Something wrong with error: ' +
            errors.message + 'Error detail: ' + errors.error.message;
          // console.log(errors);
          this.toasterService.popAsync('error', 'Error', errorMessage);
          setTimeout(() => {
            this.router.navigate(['/pages/settings/data/company']).then();
          }, 2000);
        });

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

    // for map search
    // create search FormControl
    this.searchControl = new FormControl();

    this.dataForm = this.fb.group({
      name: [],
      email: [],
      phone: [],
      address: [],
      lat: [],
      lng: [],
      working_day_start: [],
      working_day_end: [],
      working_hour_start: [],
      working_hour_end: [],
      nfcid: [],
      branch_code: [],
    });
  }

  /**
   * Callback after dragging a marker
   * @param $event
   */
  dragEnd($event) {
    // alert('drag end');
    // console.log($event);
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

  back() {
    this.location.back();
  }

  updateCompany(formValue, next) {
    this.isSubmitting = true;
    this.serverErrors = [];
    const companyBody = formValue;
    companyBody['id'] = 1;
    const phone = this.dataForm.controls['phone'].value;
    var reg = new RegExp('^\\d+$');
    if (reg.test(phone)) {
      let dataOutput = "";
      if (phone[0] == 0) {
        if (phone.length > 1) {
          dataOutput = phone[0].toString().concat("-").concat(phone.substr(1));
        } else {
          dataOutput = phone[0].toString();
        }
      } else {
        dataOutput = phone;
      }
      this.dataForm.patchValue({
        phone: dataOutput,
      });
      console.info(dataOutput);
    }
    this.companyService.update(companyBody)
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        this.toasterService.popAsync('success', 'Success', res.message);
        if (next == 'close') {
          this.dataName = label_data_save.redirect;
          setTimeout(() => {
            this.location.back();
          }, 1000);
        } else {
          this.isSubmitting = false;
        }
      },
      errors => {
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
            // get the place result
            const place: google.maps.places.PlaceResult = autocomplete.getPlace();

            // verify result
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }

            // set latitude, longitude and zoom
            // console.log(place);
            this.address = place.formatted_address;
            // this.dataForm.value['address'] = place.formatted_address;
            this.latitude = place.geometry.location.lat();
            // this.dataForm.value['lat'] = place.geometry.location.lat();
            this.longitude = place.geometry.location.lng();
            // this.dataForm.value['lng'] = place.geometry.location.lng();
            this.zoom = 17;

            this.dataForm.patchValue({
              address: place.formatted_address,
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            });
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

  ngOnDestroy() {
    //
  }
}
