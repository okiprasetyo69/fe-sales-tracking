import { Component, EventEmitter, Input, OnInit, Output, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { BranchService } from '../../../services/branch.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { CustomerService } from '../../../services/customer.service';
import { FormDestinationService } from './form-destination.service';
import { RouteMapComponent } from '../route-map/route-map.component';
import { escape_me } from '../../../helper/ExtraFunction';
import { CreateGenerateRoute, GenerateRoute } from '@Model/response-generate-route';
import { Plan } from '@Model/response-plan';

@Component({
  selector: 'ngx-form-destination',
  templateUrl: './form-destination.component.html',
  styleUrls: ['./form-destination.component.scss'],
})
export class FormDestinationComponent implements OnInit {
  // Form Declaration
  formDestination: FormGroup;
  formTempDestination: FormGroup;
  // Branch Data
  branchDropdownLoading: boolean = false;
  branchDropdown: Array<any> = [];
  // Customer Data
  customerDropdown = [];

  oldStartBranch = null;
  oldEndBranch = null;
  customerListData: Array<any> = [];
  labelDestination: string = 'Destination';

  usingRoute = 0;
  usingRouteBoolean = false;


  @ViewChild(RouteMapComponent)
  set RouteMapComponent(x: RouteMapComponent) {
    if (x != null) {
      x.initRouteMap(this.formDestination);
      this.routeMap = x;
    }
  }

  private routeMap: RouteMapComponent;

  // Misc Variable
  @Input() isView: boolean = false;
  @Input() isFormGroup: boolean = true;
  @Input() arrayForm: any;
  @Input() withOrder: boolean = true;
  @Input() planModel: Plan;

  editedIndex = null;
  tempDestination = [];
  allRoutes = [];
  loadingGenerate: boolean = false;
  latitudeShare = null;
  longitudeShare = null;
  startPointShare = {lat: null, lng: null};
  endPointShare = {lat: null, lng: null};
  routeWay = [];
  dataName = 'Please wait generating routes...';
  isShowMap = false;
  planModelInSystem: Plan = null;

  // Inputed Variable
  @Input() startBranch;
  @Input() endBranch;
  @Input() destination;
  @Input() destinationOrder;
  @Input() route;

  // If using form group
  @Input() formGroup;
  @Input() fieldStartBranch;
  @Input() fieldEndBranch;
  @Input() fieldRoute;
  @Input() fieldDestination;
  @Input() fieldDestinationOrder;
  @Input() fieldUseRoute;

  isErrorDestination = false;
  isErrorDestinationMessage: string;

  @Input() isCycle: boolean = false;
  @Input() cycleName: string;
  @Input() serverErrors = [];
  @Output() customerVariable: EventEmitter<Array<any>> = new EventEmitter<Array<any>>();
  @Output() generateSuccessTriggered: EventEmitter<any> = new EventEmitter<any>();
  @Output() out_route = new EventEmitter<any>();
  @Output() out_destination_order = new EventEmitter<any>();
  @Output() out_destination = new EventEmitter<any>();
  @Output() checkbox_chage_state = new EventEmitter<any>();

  constructor(
    private branchService: BranchService,
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private toasterService: ToasterService,
    private formDestinationService: FormDestinationService,
  ) {
  }

  ngOnInit() {
    // @TODO this arrayForm branch name
    this.branchService.index_dropdown().subscribe(res => {
      this.branchDropdown = res.data.data;
    });

    this.formDestination = this.formBuilder.group({
      destination: [{value: [], disabled: this.isView}],
      end_route_branch_id: [{value: null, disabled: this.isView}],
      route: [{value: null, disabled: this.isView}],
      start_route_branch_id: [{value: null, disabled: this.isView}],
      destination_order: [{value: null}],
      is_use_route: [{value: this.usingRoute, disabled: this.isView}],
    });

    this.formTempDestination = this.formBuilder.group({
      customer_code: [{value: null, disabled: this.isView}],
      customer_name: [{value: null, disabled: this.isView}],
      address: [{value: null, disabled: this.isView}],
      order_route: [{value: null, disabled: this.isView}],
      note: [{value: null, disabled: this.isView}],
      mode: false,
    });

    if (typeof this.planModel != 'undefined') {
      this.planModelInSystem = this.planModel;
    }

    if (this.isFormGroup) {
      // @TODO : harus di perbaiki, form group tidak akan kosong, sedangkan pengecekan if dibawah jika tidak kosong, seharusnya dapat mengecek field yang ada dalam form...
      if (this.formGroup != null) {
        let dataForm, dataRoute, dataDestination, dataDestinationOrder, useRoute;
        dataForm = {};
        dataRoute = [];
        dataDestination = [];
        dataDestinationOrder = [];
        useRoute = 0;

        if (this.formGroup.controls[this.fieldRoute].value != null) {
          dataRoute = this.formGroup.controls[this.fieldRoute].value;
        }
        if (this.formGroup.controls[this.fieldDestination].value != null) {
          dataDestination = this.formGroup.controls[this.fieldDestination].value;
        }
        if (this.formGroup.controls[this.fieldDestinationOrder].value != null) {
          dataDestinationOrder = this.formGroup.controls[this.fieldDestinationOrder].value;
        }

        if (this.formGroup.controls[this.fieldUseRoute].value != null) {
          useRoute = this.formGroup.controls[this.fieldUseRoute].value;
        }

        console.info(this.formGroup.controls[this.fieldStartBranch].value);
        console.info(this.formGroup.controls[this.fieldEndBranch].value);
        dataForm['start_route_branch_id'] = this.formGroup.controls[this.fieldStartBranch].value;
        dataForm['end_route_branch_id'] = this.formGroup.controls[this.fieldEndBranch].value;
        dataForm['route'] = dataRoute;
        dataForm['destination'] = dataDestination;
        dataForm['destination_order'] = dataDestinationOrder;
        dataForm['is_use_route'] = useRoute;
        this.formDestination.patchValue(dataForm);
        this.usingRoute = useRoute;
        this.usingRouteBoolean = (useRoute == 0) ? false : true;

        // copy array
        this.customerListData = dataDestination.slice(0);
      }
    } else {
      console.info('Array Form', this.arrayForm);
      let dataForm, dataRoute, dataDestination, dataDestinationOrder, useRoute;
      dataForm = {};
      dataRoute = [];
      dataDestination = [];
      dataDestinationOrder = [];
      useRoute = 0;
      if (this.arrayForm[this.fieldRoute] != null) {
        dataRoute = this.arrayForm[this.fieldRoute];
      }
      if (this.arrayForm[this.fieldDestination] != null) {
        dataDestination = this.arrayForm[this.fieldDestination];
      }
      if (this.arrayForm[this.fieldDestinationOrder] != null) {
        dataDestinationOrder = this.arrayForm[this.fieldDestinationOrder];
      }

      if (this.arrayForm[this.fieldUseRoute] != null) {
        useRoute = this.arrayForm[this.fieldUseRoute];
      }
      dataForm['start_route_branch_id'] = this.arrayForm[this.fieldStartBranch];
      dataForm['end_route_branch_id'] = this.arrayForm[this.fieldEndBranch];
      dataForm['route'] = dataRoute;
      dataForm['destination'] = dataDestination;
      dataForm['destination_order'] = dataDestinationOrder;
      dataForm['is_use_route'] = useRoute;
      this.formDestination.patchValue(dataForm);
      this.usingRoute = useRoute;
      this.usingRouteBoolean = (useRoute == 0) ? false : true;

      this.customerListData = dataDestination.slice(0);
    }
    this.changeStartBranch();
    this.changeEndBranch();
  }

  // Branch Dropdown Load
  openDropdownBranch() {
    this.branchDropdownLoading = true;
    this.branchDropdown = [];
    this.branchService.index_dropdown().subscribe(res => {
      this.branchDropdown = res.data.data;
      this.branchDropdownLoading = false;
    });
  }

  checkBoxChange(state: boolean) {
    this.usingRoute = (state) ? 1 : 0;
    this.usingRouteBoolean = state;
    this.formDestination.patchValue({
      is_use_route: this.usingRoute,
    });
    this.clearRoute();
    this.clearDestination();
    this.isShowMap = false;
    this.emitData();
  }


  // Destination
  saveDestination() {
    this.clearRoute();
    if (this.formTempDestination.controls['mode'].value == true) {
      this.updateDestination();
    } else {
      this.addDestination();
    }
  }

  editDestination(data, index) {
    this.labelDestination = 'Edit destination: ' + data.customer_code;
    this.formTempDestination.patchValue({
      customer_code: data.customer_code,
      customer_name: data.customer_name,
      address: data.address,
      order_route: data.order_route,
      note: data.note,
      mode: true,
    });
    this.editedIndex = index;
  }

  updateDestination() {

    let dataDestination, orderRoute;
    // dataDestination = [];
    dataDestination = this.formDestination.controls['destination'].value;
    orderRoute = null;
    if (this.formTempDestination.controls['order_route'].value != '' && !(this.formTempDestination.controls['order_route'].value < 1)) {
      orderRoute = +this.formTempDestination.controls['order_route'].value;
    }
    const customerCode = this.formTempDestination.controls['customer_code'].value;
    const dataFounded = this.customerDropdown.find(x => x.code == customerCode);

    if (customerCode == null || customerCode == '') {
      this.toasterService.popAsync('error', 'Cannot edit customer!', 'Customer cannot empty! Please add customer');
    }else {
      const dataTempDestination = {
        customer_code: this.formTempDestination.controls['customer_code'].value,
        customer_name: (!!dataFounded) ? dataFounded.name : this.formTempDestination.controls['customer_name'].value,
        address: (!!dataFounded) ? dataFounded.address : this.formTempDestination.controls['address'].value,
        order_route: orderRoute,
        note: this.formTempDestination.controls['note'].value,
      };

      dataDestination[this.editedIndex] = dataTempDestination;
      this.customerListData[this.editedIndex] = dataTempDestination;
      this.formDestination.patchValue({
        destination: dataDestination,
      });
      this.toasterService.popAsync('success', 'Success', 'You changed destination. Please save this form to save the changes');
      this.clearDestination();
    }
  }

  clearDestination() {
    this.labelDestination = 'Destination';
    this.formTempDestination.patchValue({
      customer_code: null,
      customer_name: null,
      address: null,
      order_route: null,
      note: null,
      mode: false,
    });
    this.emitData();
  }

  deleteDestination(index) {
    this.clearRoute();
    this.toasterService.popAsync('success', 'Success', 'You deleted destination. Please save this form to save the changes');
    let data = [];
    data = this.formDestination.controls['destination'].value;
    data.splice(index, 1);
    this.formDestination.patchValue({
      destination: data,
    });
    this.clearDestination();
  }

  addDestination() {
    const customerCode = this.formTempDestination.controls['customer_code'].value;
    const orderRoute = this.formTempDestination.controls['order_route'].value;
    const note = this.formTempDestination.controls['note'].value;

    if (customerCode === '' || customerCode == null) {
      this.toasterService.popAsync('error', 'Error', 'Please select customer destination');
    } else {
      const dataFounded = this.customerDropdown.find(x => x.code == customerCode);
      if (dataFounded.lat == null || dataFounded.lng == null) {
        this.toasterService.popAsync('error', 'Error', 'Please select customer which has a specific location like longitude and latitude');
      } else {
        let statusRoute = true;
        let orderRouteData = null;
        this.customerListData.push({
          address: dataFounded.address,
          customer_code: dataFounded.code,
          customer_name: dataFounded.name,
        });

        // Check apakah order route < 1
        if (orderRouteData == null) {
          orderRouteData = null;
        } else {
          if (orderRoute < 1) {
            this.toasterService.popAsync('error', 'Error', 'The Order Route cannot less than 1');
            statusRoute = false;
          } else {
            orderRouteData = orderRoute;
          }
        }

        if (statusRoute) {
          let dataDestination: any = [];
          if (this.formDestination.controls['destination'].value != null) {
            dataDestination = this.formDestination.controls['destination'].value;
          }
          let routeOrder;
          routeOrder = null;
          if (orderRoute == '' || orderRoute < 1) {
            routeOrder = null;
          } else {
            if (orderRoute != null) {
              routeOrder = +orderRoute;
            }
          }
          dataDestination.push(
            {
              customer_code: customerCode,
              order_route: routeOrder,
              note: note,
              customer_name: dataFounded.name,
              address: escape_me(dataFounded.address),
            },
          );
          this.formDestination.patchValue({
            destination: dataDestination,
          });
          this.toasterService.popAsync('success', 'Success', 'You added destination. Please save this form to save the changes');
          this.clearDestination();
        }
      }
    }
    this.emitData();
  }

  generateRoutes() {
    console.info('Start Generating');
    const startRouteBranch = this.formDestination.controls['start_route_branch_id'].value;
    const endRouteBranch = this.formDestination.controls['end_route_branch_id'].value;
    const destinationData = this.formDestination.controls['destination'].value;
    this.loadingGenerate = true;
    this.routeMap.mapShow = false;
    if (destinationData.length === 0) {
      this.loadingGenerate = false;
      this.toasterService.popAsync('error', 'Success', 'Please add destination before you generate routes');
    } else {
      if ((startRouteBranch == '' || startRouteBranch == null) || (endRouteBranch == '' || endRouteBranch == null)) {
        this.loadingGenerate = false;
        this.toasterService.popAsync('error', 'Error', 'Please set start and end destination');
      } else {
        const dataStartRoute = this.branchDropdown.find(x => x.id == startRouteBranch);
        const dataEndRoute = this.branchDropdown.find(x => x.id == endRouteBranch);
        let startStatus = true;
        let endStatus = true;
        console.info('Data Start Route', dataStartRoute);
        if (dataStartRoute.lat == null || dataStartRoute.lng == null) {
          this.toasterService.popAsync('error', 'Error', 'Please select the start destination with branch that has a location latitude & longitude');
          startStatus = false;
        }

        if (dataEndRoute.lat == null || dataEndRoute.lng == null) {
          this.toasterService.popAsync('error', 'Error', 'Please select the end destination with branch that has a location latitude & longitude');
          endStatus = false;
        }

        if (startStatus && endStatus) {
          console.info('Dest value : ', destinationData);
          // Menghilangkan data note untuk di kirim ke API Generate
          let data;
          for (data of destinationData) {
            this.tempDestination.push({
                customer: data['customer_code'],
                order_route: data['order_route'],
              },
            );
          }

          const combinedData = {
            start_route_id: startRouteBranch,
            end_route_id: endRouteBranch,
            destination: this.tempDestination,
            is_use_route: this.formDestination.controls['is_use_route'].value,
          };

          console.info('Data Gabungan', combinedData);

          this.allRoutes = [];
          this.routeWay = [];
          this.startPointShare = {lat: null, lng: null};
          this.endPointShare = {lat: null, lng: null};
          this.latitudeShare = null;
          this.longitudeShare = null;
          this.isShowMap = false;
          this.loadingGenerate = true;

          this.formDestinationService.generate_route(combinedData).subscribe(results => {
            console.info('Generate Success');
            this.loadingGenerate = false;
            if (results.data[0].status !== 'OK' && this.usingRoute == 1) {
              this.toasterService.popAsync('error', 'Error', 'Failed generate routes');
            } else {
              this.toasterService.popAsync('success', 'Success', 'Success ' + ((this.usingRouteBoolean) ? 'generate routes.' : 'draw pin point'));
              // const dataRoutes = results.data;
              let dataRoutes: GenerateRoute = CreateGenerateRoute.fromArray(results.data);
              console.info('Hasil Generate Route Service', dataRoutes);
              this.generateSuccessTriggered.emit(dataRoutes);
              this.routeMap.createRoute(dataRoutes, this.formDestination.controls['destination'].value, dataRoutes.destination_order, this.usingRouteBoolean);
              this.emitRoute(dataRoutes);
              this.emitData();
              this.showMap();
            }
          }, errors => {
            console.info('Generate Error');
            this.loadingGenerate = false;
            this.toasterService.popAsync('error', 'Error', 'Failed generate routes.');
          });
          this.tempDestination = [];
        } else {
          this.loadingGenerate = false;
        }
      }
    }
  }

  emitData() {
    this.route = this.formDestination.controls['route'].value;
    this.destination = this.formDestination.controls['destination'].value;
    this.destinationOrder = this.formDestination.controls['destination_order'].value;
    this.startBranch = this.formDestination.controls['start_route_branch_id'].value;
    this.endBranch = this.formDestination.controls['end_route_branch_id'].value;
    this.out_route.emit(this.formDestination.controls['route'].value);
    this.out_destination.emit(this.formDestination.controls['destination'].value);
    this.out_destination_order.emit(this.formDestination.controls['destination_order'].value);
    this.checkbox_chage_state.emit(this.formDestination.controls['is_use_route'].value);

    if (this.isFormGroup) {
      if (this.formGroup != null) {
        let tempData;
        tempData = [];
        if (this.fieldDestination != null) {
          tempData[this.fieldDestination] = this.formDestination.controls['destination'].value;
        }
        if (this.fieldDestinationOrder != null) {
          tempData[this.fieldDestinationOrder] = this.formDestination.controls['destination_order'].value;
        }
        if (this.fieldRoute != null) {
          tempData[this.fieldRoute] = this.formDestination.controls['route'].value;
        }
        if (this.fieldStartBranch != null) {
          tempData[this.fieldStartBranch] = this.formDestination.controls['start_route_branch_id'].value;
        }
        if (this.fieldEndBranch != null) {
          tempData[this.fieldEndBranch] = this.formDestination.controls['end_route_branch_id'].value;
        }
        if (this.fieldEndBranch != null) {
          tempData[this.fieldEndBranch] = this.formDestination.controls['end_route_branch_id'].value;
        }
        if (this.fieldUseRoute != null) {
          tempData[this.fieldUseRoute] = this.formDestination.controls['is_use_route'].value;
        }
        this.formGroup.patchValue(tempData);
      }
    } else {
      console.info('It\'s not form group');
      this.arrayForm[this.fieldDestination] = this.formDestination.controls['destination'].value;
      this.arrayForm[this.fieldDestinationOrder] = this.formDestination.controls['destination_order'].value;
      this.arrayForm[this.fieldRoute] = this.formDestination.controls['route'].value;
      this.arrayForm[this.fieldStartBranch] = this.formDestination.controls['start_route_branch_id'].value;
      this.arrayForm[this.fieldEndBranch] = this.formDestination.controls['end_route_branch_id'].value;
      this.arrayForm[this.fieldUseRoute] = this.formDestination.controls['is_use_route'].value;
      console.info(this.arrayForm);
    }
  }

  changeStartBranch() {
    if (this.oldStartBranch == null) {
      this.oldStartBranch = this.formDestination.controls['start_route_branch_id'].value;
    } else {
      console.info('Old Branch = ', this.oldStartBranch, ' and Start Branch Now = ', this.formDestination.controls['start_route_branch_id'].value);
      if (this.oldStartBranch != this.formDestination.controls['start_route_branch_id'].value) {
        this.oldStartBranch = this.formDestination.controls['start_route_branch_id'].value;
        this.clearRoute();
      }
    }
    this.emitData();
  }

  changeEndBranch() {
    if (this.oldEndBranch == null) {
      this.oldEndBranch = this.formDestination.controls['end_route_branch_id'].value;
    } else {
      if (this.oldEndBranch != this.formDestination.controls['end_route_branch_id'].value) {
        this.oldEndBranch = this.formDestination.controls['end_route_branch_id'].value;
        this.clearRoute();
      }
    }
    this.emitData();
  }

  clearRoute() {
    this.routeMap.mapShow = false;
    this.formDestination.patchValue({route: null});
    this.formDestination.patchValue({destination_order: null});
    this.emitData();
  }


  showMap() {
    this.isShowMap = !this.routeMap.mapShow;
    console.info(this.isShowMap);
    this.routeMap.showMap();
  }

  emitRoute(dataRoutes: GenerateRoute) {
    this.formDestination.patchValue({
      route: dataRoutes.google_route,
      destination_order: dataRoutes.destination_order,
    });
  }

  setCustomerGet($event) {
    this.customerDropdown = $event;
  }
}

// @ts-ignore
@Pipe({name: 'DestinationName'})
export class DestinationName implements PipeTransform {
  transform(id: string, list: any[] = []): string {
    const result = list.find(x => x.code === id);
    const result_alternative = list.find(x => x.customer_code === id);
    // @ts-ignore
    let name;

    if (!!result) {
      name = (result.name) ? (result.name) + ' - ' : '';
    } else if (!!result_alternative) {
      name = (result_alternative.customer_name) ? result_alternative.customer_name + ' - ' : '';
    } else {
      name = '';
    }
    return name;
  }
}

// @ts-ignore
@Pipe({name: 'AddressCustomer'})
export class AddressCustomer implements PipeTransform {
  transform(id: string, list: any[] = []): string {
    const result = list.find(x => x.code === id);
    const result_alternative = list.find(x => x.customer_code === id);
    // @ts-ignore
    let addressName;

    if (!!result) {
      addressName = result.address;
    } else if (!!result_alternative) {
      addressName = result_alternative.address;
    } else {
      addressName = '-';
    }
    return addressName;
  }
}

@Pipe({name: 'ParseError'})
export class ParseError implements PipeTransform {
  transform(errorData: String): string {
    let errorMessage = '';
    for (let message of errorData.split(' ')) {
      const clearingName = message.split('_');
      if (clearingName.length >= 2) {
        let displayName;
        displayName = '';

        let x;
        for (x of clearingName) {
          displayName = displayName.concat(x.charAt(0).toUpperCase().concat(x.substring(1))).concat(' ');
        }
        displayName.substring(0, (displayName.length - 1));

        errorMessage = errorMessage + 'For ' + displayName + ' ';
      } else {
        errorMessage = errorMessage + message + ' ';
      }
    }
    return errorMessage;
  }
}
