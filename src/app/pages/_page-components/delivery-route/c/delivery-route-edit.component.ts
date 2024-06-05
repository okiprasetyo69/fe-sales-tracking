import { Component, OnDestroy, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { Location } from '@angular/common';
import { BranchService } from '../../../../services/branch.service';
import { CustomerService } from '../../../../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DeliveryRouteService } from '../../../../services/delivery-route.service';
import { label_data_save } from '../../../../configs/configs';
import { RouteMapComponent } from '../../../_shared-components/route-map/route-map.component';
import { FormDestinationComponent } from '../../../_shared-components/form-destination/form-destination.component';
import { RouteMapService } from '../../../_shared-components/route-map/route-map.service';
import {checkDuplicateInObject, isDateExpires, isNoDataActivity} from '../../../../helper/ExtraFunction';
import { AssetService } from '../../../../services/asset.service';
import { ApprovalService } from '../../../../services/approval.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { DeliveryPlan, DeliveryPlanModel } from '@Model/response-plan';
import { Observable } from "rxjs";

@Component({
  selector: 'ngx-delivery-route-edit',
  templateUrl: './delivery-route-edit.component.html',
  styleUrls: ['./delivery-route-edit.component.scss'],
})
export class DeliveryRouteEditComponent implements OnInit, OnDestroy {
  isSubmiting: boolean = false;
  isView: boolean = false;
  id: number;
  isLoadingGeneral: boolean = true;
  method: string;
  packing_slip_code: string;
  dataForm: FormGroup;
  serverErrors = [];
  dataUser: Array<any>;
  date: Date;
  packingSlipList = new FormArray([], {});
  packingSlipListSimple = [];
  packingSlipLoading = false;
  module: string;
  dataAssets = [];
  isApprovalView: boolean = false;
  hideSaveButton: boolean = true;
  generated_route = [];
  generated_order = [];
  generated_destination = [];

  deliveryChangeRoute = null;
  isDestinationOrderNull = true;

  isLoadingAssets: boolean = false;
  dataDestinationForm: any;
  routes = [];
  loadingGenerate: boolean = false;
  destination = new FormArray([], {});
  dataPackingSlip = [];

  dataName = label_data_save.saving;
  userDropdownLoading: boolean = false;

  deliveryPlan: DeliveryPlan;

  @ViewChild(RouteMapComponent)
  set RouteMapComponent(x: RouteMapComponent) {
    // Code Baru
    if (x != null) {
      if (!!this.id) {
        // @TODO: Ketika API siap maka hilangkan komentar di bawah.
        this.routeMapService.getBreadcrumb(this.module, this.id).subscribe(res => {
          const dataBreadcrumb = this.routeMapService.decodeBackendBreadcrumbData(res.data.data);
          if (dataBreadcrumb.length != 0) {
            x.addPolyLine(dataBreadcrumb, 'green');
          }
        });
        if (this.deliveryChangeRoute != null) {
          x.addPolyLine(this.deliveryChangeRoute, 'red');
        }
        x.initRouteMap(this.dataForm, this.deliveryPlan);
      }
    }
  }

  @ViewChild(FormDestinationComponent)
  private formDestinationComponent: FormDestinationComponent;


  constructor(
    private userService: UserService,
    public customerService: CustomerService,
    private route: ActivatedRoute,
    private location: Location,
    private deliveryRouteService: DeliveryRouteService,
    private fb: FormBuilder,
    private branchService: BranchService,
    private toasterService: ToasterService,
    private router: Router,
    private routeMapService: RouteMapService,
    private assetService: AssetService,
    private approvalService: ApprovalService,
  ) {
  }

  ngOnInit() {
    this.method = this.route.snapshot.data['method'];
    this.module = this.route.snapshot.data['module'];
    if (this.route.snapshot.data['method'] === 'view') {
      this.isView = true;
    }

    this.dataForm = this.fb.group({
      id: [{value: null, disabled: this.isView}],
      user_id: [{value: null, disabled: this.isView}],
      date: [{value: null, disabled: this.isView}],
      asset_id: [{value: null, disabled: this.isView}],
      packing_slip_id: [{value: [], disabled: this.isView}],
      destination: [{value: null, disabled: false}],
      destination_order: [{value: null, disabled: false}],
      end_route_branch_id: [{value: null, disabled: this.isView}],
      route: [],
      start_route_branch_id: [{value: null, disabled: this.isView}],
      is_use_route: 0,
    });

    this.dataDestinationForm = {
      destination: [],
      end_route_branch_id: '',
      route: '',
      start_route_branch_id: '',
    };

    if (this.route.snapshot.data['method'] !== 'create') {
      this.route.params.subscribe(params => {
        this.id = params['id'];
        const id = params['id'];
        const id_approval = +params['id_approval'];

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
      this.hideSaveButton = false;
    }
  }

  back() {
    this.location.back();
  }

  prepareViewApproval(id) {
    this.openDropdownVehicle();
    this.openDropdownUser();
    // preparing general data
    this.approvalService.show_approval(id)
      .pipe(untilDestroyed(this))
      .subscribe(results => {
        const deliveryPlanModel: DeliveryPlanModel = results.data.data;
        this.prepareForm(deliveryPlanModel);
      }, () => {
        this.isLoadingGeneral = false;
      });
  }

  prepareEditForm(id) {
    this.openDropdownVehicle();
    this.openDropdownUser();
    // preparing general data
    this.deliveryRouteService.show(id)
      .pipe(untilDestroyed(this))
      .subscribe(results => {
        const deliveryPlanModel: DeliveryPlanModel = results.data;
        this.prepareForm(deliveryPlanModel);
      }, () => {
        this.isLoadingGeneral = false;
      });
  }

  prepareForm(plan: DeliveryPlanModel) {
    this.deliveryPlan = new DeliveryPlan(plan);
    if (this.deliveryPlan != null) {
      this.isLoadingGeneral = false;
      this.dataForm.patchValue({
        id: this.deliveryPlan.id,
        user_id: this.deliveryPlan.user_id,
        date: this.deliveryPlan.date,
        asset_id: this.deliveryPlan.asset_id,
        packing_slip_id: this.deliveryPlan.packing_slip_id,
        destination: this.deliveryPlan.destination,
        destination_order: this.deliveryPlan.destination_order,
        end_route_branch_id: this.deliveryPlan.end_route_branch_id,
        route: this.deliveryPlan.route,
        start_route_branch_id: this.deliveryPlan.start_route_branch_id,
        is_use_route: this.deliveryPlan.is_use_route,
      });

      this.setRoute(this.deliveryPlan.route);
      this.setDestinationOrder(this.deliveryPlan.destination_order);
      this.setDestination(this.deliveryPlan.destination);

      // this.hideSaveButton = this.deliveryPlan.isAvailable();
      this.hideSaveButton = (isDateExpires(this.deliveryPlan.date) || !isNoDataActivity(this.deliveryPlan.data_activity));
      this.deliveryChangeRoute = this.deliveryPlan.getMapPolyLine();
      this.deliveryPlan.packing_slip_id.forEach((dataPackingSlip) => {
        this.packingSlipList.push(new FormControl({
          id_packing_slip: dataPackingSlip.id_packing_slip,
          customer_name: dataPackingSlip.customer_name,
          is_confirm: dataPackingSlip.is_confirm,
        }));
        this.packingSlipListSimple.push({
          id_packing_slip: dataPackingSlip.id_packing_slip,
          customer_name: dataPackingSlip.customer_name,
          is_confirm: dataPackingSlip.is_confirm,
        });
      });
      this.dataForm.patchValue({
        packing_slip_id: this.packingSlipListSimple,
      });
      this.getDropdownPackingSlip(this.deliveryPlan.user_id);
      this.formDestinationComponent.ngOnInit();
    }
  }

  addPackingSlip() {
    const packingSlipExists = this.packingSlipListSimple.find(x => x.id_packing_slip == this.packing_slip_code);
    const isNotExist = typeof packingSlipExists == 'undefined';
    if (isNotExist) {
      this.packingSlipListSimple.push({
        id_packing_slip: this.packing_slip_code,
        is_confirm: 0,
      });
      this.dataForm.patchValue({
        packing_slip_id: this.packingSlipListSimple,
      });
    } else {
      this.toasterService.popAsync('error', 'Cannot add packing slip', 'Selected packing slip ' + this.packing_slip_code + ' have been added');
    }
  }

  dataPackingDelete(id) {
    let data = this.dataForm.controls['packing_slip_id'].value;
    data.splice(id, 1);
    this.dataForm.patchValue({
      packing_slip_id: data,
    });
  }

  save(next) {
    this.isSubmiting = true;
    const checkDuplicate = checkDuplicateInObject('id_packing_slip', this.dataForm.controls['packing_slip_id'].value);
    if (checkDuplicate) {
      this.isSubmiting = false;
      this.toasterService.popAsync('error', 'Error', 'You have same packing slip added on packing slip list.');
    } else if (this.dataForm.get(['route']).value == null && this.dataForm.get(['is_use_route']).value == 1) {
      this.isSubmiting = false;
      this.toasterService.popAsync('error', 'Error', 'Please generate route first before saving.');
    } else {
      if (this.dataForm.controls['destination_order'].value != null) {
        const destinationOrder: Array<any> = this.dataForm.controls['destination_order'].value;
        if (destinationOrder.length != 0) {
          this.isDestinationOrderNull = false;
        } else if (destinationOrder.length == 0 && this.dataForm.controls['is_use_route'].value == 0 && this.dataForm.controls['destination'].value.length == 0) {
          this.isDestinationOrderNull = false;
        }
      } else {
        if (this.dataForm.controls['destination_order'].value == null && this.dataForm.controls['is_use_route'].value == 0 && this.dataForm.controls['destination'].value.length == 0) {
          this.isDestinationOrderNull = false;
        }
      }
      if (!this.isDestinationOrderNull) {
        this.deliveryRouteService.save(this.dataForm.value, this.id).subscribe(results => {
            this.toasterService.popAsync('success', 'Success', results.message);
            if (next == 'close') {
              this.dataName = label_data_save.redirect;
              setTimeout(() => {
                this.router.navigate(['pages/logistic/activities/delivery_route/index']).then();
              }, 2000);
            } else {
              this.isSubmiting = false;
            }
          },
          errors => {
            this.isSubmiting = false;
            console.info(errors.error);
            const messageError = errors.error.message;
            const dataError = errors.error.data;
            this.toasterService.popAsync('error', messageError.charAt(0).toUpperCase() + messageError.slice(1));
            let key;
            for (key of dataError) {
              const field = key['field'];
              this.serverErrors[field] = key['message'];
              const word = key.field.charAt(0).toUpperCase() + key.field.slice(1);
              this.toasterService.popAsync('error', 'Please Check Field ' + word.replace('_', ' ').replace('id', ''), key.message);
            }
          });
      } else {
        this.isSubmiting = false;
        if (this.dataForm.controls['is_use_route'].value != 0) {
          this.toasterService.popAsync('error', 'Cant\'t save', 'Please Generate Route First');
        } else {
          this.toasterService.popAsync('error', 'Cant\'t save', 'Please Draw Pin Point First');
        }
      }
    }
  }

  dataEdit() {
    this.router.navigate([`pages/logistic/activities/delivery_route/edit/${this.id}`]).then();
  }

  openDropdownUser() {
    this.userDropdownLoading = true;
    this.deliveryRouteService.dropdownUser()
      .pipe(untilDestroyed(this))
      .subscribe(results => {
        this.dataUser = results.data.data;
        this.userDropdownLoading = false;
      }, () => {
        this.userDropdownLoading = false;
        this.toasterService.popAsync('error', 'Error', 'Can not retrieve dropdown user');
      });
  }

  openDropdownVehicle() {
    this.isLoadingAssets = true;
    this.assetService.getAssetByTag('truck')
      .pipe(untilDestroyed(this))
      .subscribe(res => {
        console.info('Data Assets : ', res.data.data);
        this.dataAssets = res.data.data;
        this.isLoadingAssets = false;
      }, () => {
        this.isLoadingAssets = false;
        this.toasterService.popAsync('error', 'Error', 'Can not retrieve dropdown vehicle');
      });
  }

  generateRouteSuccess($event) {
    // this.routeMapComponent.createRoute($event);
    // this.routeMapComponent.mapShow = true;
  }

  changePackingSlip() {
    this.packingSlipListSimple = [];
    this.dataForm.patchValue({
      packing_slip_id: [],
    });
    this.getDropdownPackingSlip(this.dataForm.controls['user_id'].value);
  }

  getDropdownPackingSlip(userId) {
    this.packing_slip_code = null;
    this.packingSlipList.controls.splice(0);
    if (userId != null) {
      this.deliveryRouteService.get_user(userId)
        .pipe(untilDestroyed(this))
        .subscribe(res => {
          console.info('get user', res);
          const userData = res.data;
          const division_id = userData.division_id;
          this.packingSlipLoading = true;
          this.deliveryRouteService.dropdownPackingSlip(division_id)
            .pipe(untilDestroyed(this))
            .subscribe(resp => {
              this.packingSlipLoading = false;
              this.dataPackingSlip = resp.data.data;
            }, errors => {
              this.packingSlipLoading = false;
              console.info(errors);
            });
        });
    } else {
      this.dataPackingSlip = [];
    }
  }

  setRoute(route: any) {
    console.info('set route', route);
    this.generated_route = route;
  }

  setDestinationOrder(order: any) {
    console.info('set order', order);

    this.generated_order = order;
  }

  setDestination(destination: any) {
    console.info('set destination', destination);

    this.generated_destination = destination;
  }

  getAutoPackingSlip() {
    console.log('fn getAutoPackingSlip');
    if (!!this.generated_destination && this.generated_destination.length) {
      let destinations = '';
      console.log('XXX destination', destinations);
      let i = 0;
      for (let dest of this.generated_destination) {
        if (i === 0) {
          destinations = destinations + dest.code;
        } else {
          destinations = destinations + ',' + dest.customer_code;
        }
        i++;
      }
      this.packingSlipLoading = true;

      this.deliveryRouteService.get_user(this.dataForm.controls['user_id'].value)
        .pipe(untilDestroyed(this))
        .subscribe(res => {
          const userData = res.data;
          const branch_id = userData.branch_id;

          this.deliveryRouteService.get_auto_packing_slip(destinations, branch_id)
            .pipe(untilDestroyed(this))
            .subscribe(resp => {
              this.packingSlipLoading = false;
              for (let data of resp.data.data) {
                const packingSlipExists = this.packingSlipListSimple.find(x => x.id_packing_slip == data.code);
                const isNotExist = typeof packingSlipExists == 'undefined';
                if (isNotExist) {
                  this.packingSlipListSimple.push({
                    id_packing_slip: data.code,
                    is_confirm: 0,
                  });
                }
              }
              this.dataForm.patchValue({
                packing_slip_id: this.packingSlipListSimple,
              });
            }, errors => {
              this.packingSlipLoading = false;
              this.toasterService.popAsync('error', 'Can not find invoice. ' + errors.error.message);
            });

        }, errors => {
          this.packingSlipLoading = false;
          this.toasterService.popAsync('error', 'Can not find invoice. ' + errors.error.message);

        });
    } else {
      this.toasterService.popAsync('error', 'Cannot generate invoice', 'Please generate the route first');
    }
  }

  ngSelectSearchPackingSlip(term, item) {
    let availableItem = null;
    const searchValue = new RegExp(term, 'i');
    if (searchValue.test(item.code) || searchValue.test(item.customer_code) || searchValue.test(item.customer.name)) {
      availableItem = item;
    }
    return availableItem;
  }

  ngOnDestroy() {
    //
  }
}


@Pipe({name: 'CustomerName'})
export class CustomerName implements PipeTransform {
  transform(customer_code: string, customer_service: CustomerService): string {
    let name: string;
    name = '';
    customer_service.show(customer_code).subscribe(res => {
      name = res.data.name;
    });
    return name;
  }
}
