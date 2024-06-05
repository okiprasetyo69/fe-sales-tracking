import {Component, ElementRef, NgZone, OnDestroy, OnInit, Pipe, PipeTransform, ViewChild} from '@angular/core';
import {CustomerService} from '../../../../services/customer.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MapsAPILoader} from '@agm/core';
import {ToasterService} from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import {ScrollToConfigOptions, ScrollToService} from '@nicky-lenaers/ngx-scroll-to';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Location} from '@angular/common';
import {datatable_configs, label_data_save} from '../../../../configs/configs';
import {checkZeroValue, convertZeroValue} from '../../../../helper/ExtraFunction';
import {ApprovalService} from '../../../../services/approval.service';
import {Subject} from 'rxjs/Subject';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {CompetitorImage, Customer} from "@Model/response-customer";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

declare var google: any;

@Component({
  selector: 'ngx-customers-edit',
  styleUrls: ['./customers-edit.component.scss'],
  templateUrl: './customers-edit.component.html',
})

export class CustomersEditComponent implements OnInit, OnDestroy {
  datasets: Array<any> = []; // branch have initial value as blank array
  datasetsDeliveries: Array<any> = []; // branch have initial value as blank array
  dtOptions: any = {};
  dtOptionsDelivery: any = {};
  dtParams: any;
  dtParamsDelivery: any;
  page_start: number = datatable_configs.page_start;
  page_length: number = 3000;
  page_search: string = datatable_configs.page_search;
  page_order_col: number = 1; // default sort by date
  page_order_dir: string = datatable_configs.page_order_dir;
  dataBranch: Array<any> = [];
  dataCustomer: Customer;
  id: number;
  module: string;
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
  dropdownBusinessActivity: Array<any> = [];
  /** custom field category */
  dropdownCategory: any;
  /** custom field end */
  isBranch: boolean = false;
  isCreateContact: boolean = false;
  isEditContact: boolean = false;
  contactForm: FormGroup;
  idContactEdit: number;
  branchFalse: boolean = false;
  // dataParent = [];
  parent_name: string;
  parent_code: string;
  codeCustomer: any;
  dataName = label_data_save.saving;
  isApprovalView: boolean = false;

  contactErrors = [];

  customerInput$ = new Subject<any>();
  dataCustomerSearch: Array<any> = [];
  isLoadingDropdownCustomer: boolean = false;

  competitorPhotos: ImageModel[] = [];

  constructor(
    private customerService: CustomerService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private fb: FormBuilder,
    private toasterService: ToasterService,
    private _scrollToService: ScrollToService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private location: Location,
    private approvalService: ApprovalService,
    private _sanitizer: DomSanitizer,
  ) {
  }

  ngOnInit() {
    this.loadCustomerSearch();

    this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
      const id = params['id'];
      const id_approval = params['id_approval'];

      if (!!id) {
        // id not empty => edit form
        this.prepareEditForm(id);
        this.getDatatable();
        this.getDatatableDeliveries();
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

    this.dataForm = this.fb.group({
      address: null,
      code: null,
      contacts: null,
      email: null,
      lng: null,
      lat: null,
      name: null,
      nfcid: this.codeCustomer,
      parent_code: null,
      password: null,
      phone: null,
      username: null,
      business_activity: [{value: null, disabled: this.isView}],
      category: [{value: null, disabled: this.isView}],
      is_branch: null,
    });

    this.codeCustomer = this.dataForm.controls['code'].value;

    this.contactForm = this.fb.group({
      name: null,
      email: null,
      job_position: null,
      note: null,
      phone: null,
      mobile: null,
      notifications: this.fb.group({
        request_order_create: null,
        sales_order_return: null,
        sales_order_status_changed: null,
        delivery_received: null,
        delivery_rejected: null,
        invoice_reminder: null,
        payment_received: null,
        payment_confirmation: null,
        payment_receipt_not_read: null,
        nfc_not_read: null,
        visit_plan_reminder: null,
      }),
    });

    this.method = this.route.snapshot.data['method'];
    this.module = this.route.snapshot.data['module'];

    // set dropdown business activity
    this.dropdownBusinessActivity = [
      {
        key: 'order_sales',
        value: 'Order sales',
      },
      {
        key: 'delivery',
        value: 'Delivery',
      },
      {
        key: 'invoicing',
        value: 'Invoicing',
      },
    ];

  // set dropdown customer category
  this.dropdownCategory = [
      {
        key: 'End user',
        value: 'End user',
      },
      {
        key: 'Konsultan',
        value: 'Konsultan',
      },
      {
        key: 'Pemborong',
        value: 'Pemborong',
      },
      {
        key: 'Developer',
        value: 'Developer'
      },
      {
        key: 'Penyalur',
        value: 'Penyalur'
      },
      {
        key: 'Government',
        value: 'Government'
      },
    ];

  }



  back() {
    this.location.back();
  }

  getListCompetitorImage(competitorImages: CompetitorImage[]): ImageModel[] {
    let imageModelInitial: ImageModel[] = [];
    if (competitorImages != null) {
      competitorImages.forEach((image: CompetitorImage) => {
        imageModelInitial.push(this.toImageModel(image));
      });
    }
    return imageModelInitial;
  }

  toImageModel(image: CompetitorImage): ImageModel {
    const base64: string = 'data:image/jpg;base64,' + image.image.toString();
    const imageData: SafeResourceUrl = this._sanitizer.bypassSecurityTrustResourceUrl(base64);
    return new ImageModel(
      base64,
      imageData,
      image.desc,
      image.create_date,
    );
  }

  prepareViewApproval(id) {
    // get customer data
    // console.info(id);
    this.approvalService.show_approval(id)
      .pipe(untilDestroyed(this))
      .subscribe(results => {
        console.info(results);
        this.dataCustomer = results.data.data;
        const data_customer = results.data.data;
        this.dataBranch = data_customer.branch;
        this.codeCustomer = data_customer.code;
        this.dataForm.setValue({
          address: data_customer.address,
          code: data_customer.code,
          contacts: data_customer.contacts,
          email: data_customer.email,
          lng: data_customer.lng,
          lat: data_customer.lat,
          name: data_customer.name,
          nfcid: this.codeCustomer,
          parent_code: data_customer.parent_code,
          password: data_customer.password,
          phone: data_customer.phone,
          username: data_customer.username,
          business_activity: data_customer.business_activity,
          /** custom field category */
          // category: data_customer.category,
          category: data_customer.category,
          /** custom field end */
          is_branch: data_customer.is_branch,
        });

        if (this.dataForm.value['is_branch'] === 1 && this.dataForm.value['parent_code'] != null) {
          this.customerService.show(data_customer.parent_code)
            .pipe(untilDestroyed(this))
            .subscribe(hasil => {
              this.parent_name = hasil.data.name;
            }, () => {
            });
        }

        this.isBranch = results.data.is_branch;
        this.isLoadingGeneral = false;
        if (results.data.lat != null && results.data.lng != null) {
          this.latitude = data_customer.lat;
          this.longitude = data_customer.lng;
        }
        if (results.data.is_branch === 0) {
          this.branchFalse = true;
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
    // get customer data
    // console.info(id);
    this.customerService.show(id)
      .pipe(untilDestroyed(this))
      .subscribe(results => {
        console.info(results);
        this.dataCustomer = results.data;
        const data_customer = results.data;
        this.dataBranch = data_customer.branch;
        this.codeCustomer = data_customer.code;
        this.competitorPhotos = this.getListCompetitorImage(results.data.competitor_images);
        this.dataForm.setValue({
          address: data_customer.address,
          code: data_customer.code,
          contacts: data_customer.contacts,
          email: data_customer.email,
          lng: data_customer.lng,
          lat: data_customer.lat,
          name: data_customer.name,
          nfcid: this.codeCustomer,
          parent_code: data_customer.parent_code,
          password: data_customer.password,
          phone: data_customer.phone,
          username: data_customer.username,
          business_activity: data_customer.business_activity,
          /** custom field category */
          category: data_customer.category,
          /** custom field end */
          is_branch: data_customer.is_branch,
        });

        if (this.dataForm.value['is_branch'] === 1 && this.dataForm.value['parent_code'] != null) {
          this.customerService.show(data_customer.parent_code)
            .pipe(untilDestroyed(this))
            .subscribe(hasil => {
              this.parent_name = hasil.data.name;
              this.parent_code = hasil.data.code;
            }, () => {
            });
        }

        this.isBranch = (results.data.is_branch == 1) ? true : false;
        this.isLoadingGeneral = false;
        if (results.data.lat != null && results.data.lng != null) {
          this.latitude = data_customer.lat;
          this.longitude = data_customer.lng;
        }
        if (results.data.is_branch === 0) {
          this.branchFalse = true;
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
   * Save data
   * @param formValue
   * @param nextAction
   */
  saveData(formValue, nextAction) {
    this.isSubmitting = true;
    this.serverErrors = [];
    if (formValue.controls['parent_code'].value == null) {
      formValue.patchValue({
        parent_code: this.parent_code,
      });
    }
    // console.log(formValue);
    convertZeroValue(formValue, 'phone');
    if (checkZeroValue(formValue, 'code', this.serverErrors, this.toasterService)) {
      this.customerService.save(formValue.value, this.id)
        .pipe(untilDestroyed(this))
        .subscribe((res) => {
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
            this.isSubmitting = false;
            let field;
            if (!!errors.error.data && errors.error.data.length) {
              this.toasterService.popAsync('warning', 'Error', 'Please make sure all data are valid');
              for (const error of errors.error.data) {
                field = error['field'];
                this.serverErrors[field] = error['message'];
              }
              if (this.serverErrors['contacts']) {
                this.toasterService.popAsync('error', 'Error', 'Please add at least 1 contact.');
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
      console.info('set timeout pick map');
      // load Places Autocomplete
      this.mapsAPILoader.load().then(() => {
        console.info('maps api loader');

        const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
        autocomplete.addListener('place_changed', () => {
          console.info('autocomplete');

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

  // Contact
  dataContactCreate() {
    this.isCreateContact = true;
  }

  dataContactEdit(id) {
    this.isCreateContact = true;
    this.isEditContact = true;
    this.contactForm.setValue(
      this.dataForm.value['contacts'][id],
    );
    this.idContactEdit = id;
  }

  dataContactDelete(id) {
    const currentId = id;
    const currentContacts = this.dataForm.value['contacts'];
    const concatContact = [];
    for (let i = 0; i < currentContacts.length; i++) {
      if (i !== currentId) {
        concatContact.push(currentContacts[i]);
      }
    }
    this.dataForm.patchValue({
      contacts: concatContact,
    });
  }

  // Customer
  dataEdit() {
    this.router.navigate([`pages/settings/customers/edit/${this.id}`]);
    this.method = 'EDIT';
  }

  dataContactView(id) {
    // this.contactForm.patchValue(this.dataForm.value['contacts'][id]);
    this.isCreateContact = true;
    this.contactForm.setValue(
      this.dataForm.value['contacts'][id],
    );
  }

  addContact(myValue) {
    const currentContacts = (this.dataForm.value['contacts'] == null) ? [] : this.dataForm.value['contacts'];
    console.info('Data Contact Baru : ', myValue);
    if (myValue.name != null && myValue.name != '') {
      const newContact = myValue;
      const concatContacts = currentContacts;
      concatContacts.push(newContact);
      this.dataForm.patchValue({
        contacts: concatContacts,
      });
      this.isCreateContact = false;
      this.setContactFormToNull();
    } else {
      this.contactErrors['name'] = 'Name shouldn\'t empty.';
    }
  }

  editContact(valueContact) {
    const currentContacts = this.dataForm.value['contacts'];
    const currentId = this.idContactEdit;
    const concatContacts = [];
    console.info(currentContacts.length);
    for (let i = 0; i < currentContacts.length; i++) {
      if (i === currentId) {
        concatContacts.push(valueContact);
      } else {
        concatContacts.push(currentContacts[i]);
      }
    }
    this.dataForm.patchValue({
      contacts: concatContacts,
    });
    this.isCreateContact = false;
    this.isEditContact = false;
    this.setContactFormToNull();
    console.info('Contact Nya', valueContact);
  }

  backContact() {
    this.setContactFormToNull();
    this.isCreateContact = false;
    this.isEditContact = false;
  }

  checkIsBranch() {
    this.dataForm.patchValue({
      parent_code: (this.isBranch) ? this.dataForm.value['parent_code'] : null,
    });
  }

  setContactFormToNull() {
    this.contactForm.setValue({
      name: '',
      email: '',
      job_position: '',
      note: '',
      phone: '',
      mobile: '',
      notifications: {
        request_order_create: '',
        sales_order_return: '',
        sales_order_status_changed: '',
        delivery_received: '',
        delivery_rejected: '',
        invoice_reminder: '',
        payment_received: '',
        payment_confirmation: '',
        payment_receipt_not_read: '',
        nfc_not_read: '',
        visit_plan_reminder: '',
      },
    });
    this.contactErrors = [];
  }

  codeOnType() {
    this.codeCustomer = this.dataForm.controls['code'].value;
  }

  getDatatable() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: this.page_length,
      serverSide: true,
      processing: true,
      displayStart: this.page_start,
      order: [[this.page_order_col, this.page_order_dir]],
      search: {search: this.page_search},
      ajax: (dataTablesParameters: any, callback) => {
        this.dtParams = dataTablesParameters;
        this.customerService.indexDatatablesOrder(dataTablesParameters, this.id)
          .pipe(untilDestroyed(this))
          .subscribe(resp => {
            this.datasets = resp.data.data;
            callback({
              recordsTotal: resp.data.total,
              recordsFiltered: resp.data.total_filter,
              data: !!resp.data.total ? [{
                no: '',
                date: '',
                branch: '',
                code: '',
                address: '',
                sales_rep: '',
                is_special_order: '',
                action: '',
              }] : [],
            });
          }, errors => {
            const errorMessage = 'Something wrong with error: ' +
              errors.message + '. Error detail: ' + errors.error.message;
            this.toasterService.popAsync('error', 'Error', errorMessage);
          });
      },
      columns: [
        {data: 'no', orderable: false, searchable: false},
        {data: 'date', searchable: false, orderable: true},
        {data: 'branch', orderable: false},
        {data: 'code', orderable: true, searchable: true},
        {data: 'address', searchable: true, orderable: false},
        {data: 'sales_rep', searchable: false, orderable: false},
        {data: 'is_special_order', searchable: false, orderable: true},
        {data: 'action', orderable: false, searchable: false},
      ],
    };
  }

  getDatatableDeliveries() {
    this.dtOptionsDelivery = {
      pagingType: 'full_numbers',
      pageLength: this.page_length,
      serverSide: true,
      processing: true,
      displayStart: this.page_start,
      order: [[this.page_order_col, this.page_order_dir]],
      search: {search: this.page_search},
      ajax: (dataTablesParameters: any, callback) => {
        this.dtParamsDelivery = dataTablesParameters;
        this.customerService.indexDatatablesDeliveriesCustomer(dataTablesParameters, this.id)
          .pipe(untilDestroyed(this))
          .subscribe(resp => {
            console.info('data history delivery', resp.data.data);
            this.datasetsDeliveries = resp.data.data;
            callback({
              recordsTotal: resp.data.total,
              recordsFiltered: resp.data.total_filter,
              data: !!resp.data.total ? [{
                no: '',
                delivery_date: '',
                packing_slip_code: '',
                user: '',
                status: '',
                action: '',
              }] : [],
            });
          }, errors => {
            const errorMessage = 'Something wrong with error: ' +
              errors.message + '. Error detail: ' + errors.error.message;
            this.toasterService.popAsync('error', 'Error', errorMessage);
          });
      },
      columns: [
        {data: 'no', orderable: false, searchable: false},
        {data: 'delivery_date', orderable: true},
        {data: 'packing_slip_code', orderable: true, searchable: true},
        {data: 'user', searchable: true, orderable: false},
        {data: 'status', searchable: false, orderable: false},
        {data: 'action', orderable: false, searchable: false},
      ],
    };
  }

  dataView(id) {
    window.open(`#/pages/sales/activities/request_order/view/${id}`);
  }

  dataViewDelivery(id) {
    window.open(`#/pages/logistic/activities/packing_slip/view/${id}`);
  }

  private loadCustomerSearch() {
    this.customerInput$.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      tap(() => this.isLoadingDropdownCustomer = true),
    ).subscribe(value => {
      console.info('subscribe customerinput value', value);
      // this.customer$ = this.userService.dropdown_customer_searchable_s(value);
      this.customerService.all_customer_searchable(value)
        .pipe(untilDestroyed(this))
        .subscribe(res => {
          console.info('result dari term', res);
          this.dataCustomerSearch = res.data.data;
          this.isLoadingDropdownCustomer = false;
        }, errors => {
          const errorMessage = 'Something wrong with error: ' +
            errors.message + '. Error detail: ' + errors.error.message;
          // console.log(errors);
          this.toasterService.popAsync('error', 'Error', errorMessage);
          this.isLoadingDropdownCustomer = false;
        })
    });
  }

  openNewTab(base64) {
    var newTab = window.open();
    newTab.document.body.innerHTML = '<img src="' + base64 + '">';
  }

  ngOnDestroy() {
    //
  }
}

export interface ImageModelInterface {
  image: SafeResourceUrl;
  note: String;
  create_date: String;
  base64: string;
}

export class ImageModel implements ImageModelInterface {
  base64: string;
  image: SafeResourceUrl;
  note: String;
  create_date: String;

  constructor(base64: string, image: SafeResourceUrl, note: String, create_date: String) {
    this.base64 = base64;
    this.image = image;
    this.note = note;
    this.create_date = create_date
  }
}

@Pipe({name: 'businessActivity'})
export class BusinessActivity implements PipeTransform {
  transform(name: Array<any> = []): string {
    console.info('Datanya');
    let dataCombined: string = '';
    for (const key of name) {
      const dataKey = key.toString().split('_');
      let dataTemp: string = '';
      for (const value of dataKey) {
        dataTemp = dataTemp.concat(value.charAt(0).toUpperCase() + value.slice(1)).concat(' ');
      }
      dataTemp = dataTemp.substr(0, (dataTemp.length - 1));
      dataCombined = dataCombined.concat(dataTemp).concat(', ');
    }
    dataCombined = dataCombined.substr(0, (dataCombined.length - 2));
    return dataCombined;
  }
}
