import {Component, OnInit, Pipe, PipeTransform, ViewChild} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';

import {VisitPlanService} from '../../../../services/visit-plan.service';
import {UserService} from '../../../../services/user.service';
import {CustomerService} from '../../../../services/customer.service';
import {BranchService} from '../../../../services/branch.service';
import {ToasterService} from 'angular2-toaster';
import {label_data_save} from '../../../../configs/configs';
import {RouteMapComponent} from '../../../_shared-components/route-map/route-map.component';
import {RouteMapService} from '../../../_shared-components/route-map/route-map.service';
import {checkDuplicateInObject, isDateExpires, isNoDataActivity} from '../../../../helper/ExtraFunction';
import {ApprovalService} from '../../../../services/approval.service';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {UserResponseInterface} from '@Model/response-user';
import {Collector} from '@Model/response-employee';
import {Destination} from '@Model/response-destination';
import {VisitPlan, VisitPlanModel} from '@Model/response-plan';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {InvoiceComponent} from "../entry/invoice.component";
import {DefaultResponse} from "@Model/response-default";

@Component({
  selector: 'ngx-collect-plan-edit',
  templateUrl: './collect-plan-edit.component.html',
  styleUrls: ['./collect-plan-edit.component.scss'],
})

export class CollectPlanEditComponent implements OnInit {
  isSubmiting: boolean = false;
  isView: boolean = false;
  id: number;
  isLoadingGeneral: boolean = true;
  method: string;
  invoice_id: string;
  dataForm: FormGroup;
  serverErrors = [];
  dataUser: UserResponseInterface[] = [];
  date: Date;
  invoiceList: InvoiceData[] = [];
  showInvoice = false;
  statusAddNewInvoice = false;

  ready_to_show_invoice = false; // we need to wait dataInvoiceDropdown processed to get company name
  dropdownInvoice = [];

  dateData: any;
  dataName = label_data_save.saving;
  userDropdownLoading = false;
  invoiceLoading = false;

  module: string;
  visitPlanData = null;
  isApprovalView: boolean = false;
  hideSaveButton: boolean = true;
  generated_route = [];
  generated_order = [];
  generated_destination = [];

  searchInvoice: string = '';
  invoiceSearchResult = [];
  isDestinationOrderNull = true;

  destination_new: Destination[] = null;
  canAddNewInvoice: boolean = false;

  visitPlan: VisitPlan;

  @ViewChild(RouteMapComponent)
  set RouteMapComponent(x: RouteMapComponent) {
    if (x != null) {
      // Code Baru
      if (!!this.id) {
        // @TODO: Ketika API siap maka hilangkan komentar di bawah.
        this.routeMapService.getBreadcrumb(this.module, this.id).subscribe(res => {
          const dataBreadcrumb = this.routeMapService.decodeBackendBreadcrumbData(res.data.data);
          if (dataBreadcrumb.length != 0) {
            x.addPolyLine(dataBreadcrumb, 'green');
          }
        });
        if (this.visitPlanData != null) {
          x.addPolyLine(this.visitPlanData, 'red');
        }
        x.initRouteMap(this.dataForm, this.visitPlan);
      }
    }
  }

  constructor(
    private userService: UserService,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private location: Location,
    private visitPlanService: VisitPlanService,
    private fb: FormBuilder,
    private branchService: BranchService,
    private toasterService: ToasterService,
    private router: Router,
    private routeMapService: RouteMapService,
    private approvalService: ApprovalService,
    private modalService: NgbModal,
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
      date: this.dateData,
      asset_id: null,
      invoice_id: [],
      destination: null,
      destination_order: null,
      end_route_branch_id: [{value: null, disabled: this.isView}],
      route: [],
      start_route_branch_id: [{value: null, disabled: this.isView}],
      is_use_route: 0,
    });

    this.method = this.route.snapshot.data['method'];

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

  prepareViewApproval(id) {
    this.openDropdownUser();
    // preparing general data
    this.approvalService.show_approval(id)
      .pipe(untilDestroyed(this))
      .subscribe(results => {
          const results_data: VisitPlanModel = results.data.data;
          this.prepareForm(results_data);
        }, errors => {
          console.info('Error Prepare Edit Form :', errors);
          this.isLoadingGeneral = false;
        },
      );
  }

  prepareEditForm(id) {
    // preparing general data
    this.visitPlanService.show(id)
      .pipe(untilDestroyed(this))
      .subscribe((results: DefaultResponse<VisitPlan>) => {
          this.prepareForm(results.data);
        }, errors => {
          console.info('Error Prepare Edit Form :', errors);
          this.isLoadingGeneral = false;
        },
      );
  }

  prepareForm(data: VisitPlanModel) {
    this.visitPlan = new VisitPlan(data);
    this.statusAddNewInvoice = this.visitPlan.getStatus();
    // console.info("DATA", data);
    // console.info("PLAN", this.visitPlan);
    // console.info("STOP", this.visitPlan.stop_custom_location.address);
    if (this.visitPlan != null) {
      this.isLoadingGeneral = false;
      this.getDropdownInvoice(this.visitPlan.user_id);

      this.destination_new = this.visitPlan.destination_new;

      this.visitPlanData = this.visitPlan.getMapPolyLine();
      this.visitPlan.invoice_id.forEach((invoice) => {
        this.invoiceList.push({
          id_invoice: invoice.id_invoice,
          is_confirm: invoice.is_confirm,
          customer_name: invoice.customer_name,
        });
      });
      console.info('Data Invoice', this.invoiceList);
      this.dataForm.patchValue({
        id: this.visitPlan.id,
        user_id: this.visitPlan.user_id,
        date: this.visitPlan.date,
        end_route_branch_id: this.visitPlan.end_route_branch_id,
        start_route_branch_id: this.visitPlan.start_route_branch_id,
        destination: this.visitPlan.destination,
        destination_order: this.visitPlan.destination_order,
        route: this.visitPlan.route,
        invoice_id: this.invoiceList,
        is_use_route: this.visitPlan.is_use_route,
      });
      this.hideSaveButton = (isDateExpires(this.visitPlan.date) || !isNoDataActivity(this.visitPlan.data_activity));

      this.changeUser(true);
      this.setRoute(this.visitPlan.route);
      this.setDestinationOrder(this.visitPlan.destination_order);
      this.setDestination(this.visitPlan.destination);
    }
  }


  back() {
    this.location.back();
  }

  addInvoice() {
    const data = this.dropdownInvoice.find(x => x.invoice_code == this.invoice_id);
    const destination: Destination[] = this.dataForm.controls['destination'].value;
    const isInDestination = destination.find(x => x.customer_code == data.customer_code);
    const canSelectInvoice = typeof isInDestination != 'undefined';
    if (data.customer_name) {
      const invoiceExist = this.invoiceList.find(x => x.id_invoice == this.invoice_id);
      const isNotExist = typeof invoiceExist == 'undefined';
      if (isNotExist) {
        // Aktifkan ini jika ingin guard Invoice berdasarkan destinasi yang telah di pilih
        // if (canSelectInvoice) {
        this.invoiceList.push({
          id_invoice: this.invoice_id,
          is_confirm: 0,
          customer_name: data.customer_name,
        });
        this.dataForm.patchValue({
          invoice_id: this.invoiceList,
        });
        // } else {
        //   this.toasterService.popAsync('error', 'Cannot add the invoice', 'Selected invoice ' + this.invoice_id + ' doesn\'t included in destination');
        // }
      } else {
        this.toasterService.popAsync('error', 'Cannot add the invoice', 'Selected invoice ' + this.invoice_id + ' have been added');
      }

    } else {
      this.toasterService.popAsync('error', 'Cannot add the invoice', 'Selected invoice ' + this.invoice_id + ' have no customer');
    }
  }

  dataInvoiceDelete(id) {
    // find index form array or object then delete that index
    let data = this.dataForm.controls['invoice_id'].value;
    const index = data.findIndex(item => item.id_invoice === id);
    data.splice(index, 1);

    if (this.invoiceSearchResult.length != 0) {
      const index_search = this.invoiceSearchResult.findIndex(item => item.id_invoice === id);
      this.invoiceSearchResult.splice(index_search, 1);
    }
    this.dataForm.patchValue({
      invoice_id: data,
    });
  }

  save(next) {
    this.isSubmiting = true;
    this.isDestinationOrderNull = true;
    const visitPlan: VisitPlan = VisitPlan.fromFormGroup(this.dataForm);
    const checkDuplicate = checkDuplicateInObject('id_invoice', this.dataForm.controls['invoice_id'].value);
    if (visitPlan.isAndBranchStartEndNotNull()) {
      if (checkDuplicate) {
        this.isSubmiting = false;
        this.toasterService.popAsync('error', 'Error', 'You have same invoices added on invoice list.');
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
          this.visitPlanService.save(this.dataForm.value, this.id)
            .pipe(untilDestroyed(this))
            .subscribe(results => {
              this.toasterService.popAsync('success', 'Success', results.message);
              if (next == 'close') {
                this.dataName = label_data_save.redirect;
                setTimeout(() => {
                  this.location.back();
                }, 2000);
              } else {
                this.isSubmiting = false;
              }
            }, errors => {
              this.isSubmiting = false;
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
    } else {
      this.isSubmiting = false;
      this.toasterService.popAsync('error', 'Cant\'t save', 'Please Select Branch Start');
      this.toasterService.popAsync('error', 'Cant\'t save', 'Please Select Branch End');
    }
  }

  dataEdit() {
    this.router.navigate([`pages/collector/activities/collect_plan/edit/${this.id}`]).then();
  }

  changeUser(firstTime: boolean = false) {
    if (!firstTime) {
      this.invoiceList = [];
      this.dataForm.patchValue({
        invoice_id: [],
      });
    }
    this.userDropdownLoading = true;
    this.visitPlanService.dropdownUser()
      .pipe(untilDestroyed(this))
      .subscribe(results => {
        this.dataUser = results.data.data;
        this.userDropdownLoading = false;
        if (this.dataForm.controls['user_id'].value != null) {
          if (this.dataUser.length != 0) {
            const userResponse: UserResponseInterface = this.dataUser.find((x: UserResponseInterface) => x.id == this.dataForm.controls['user_id'].value);
            this.showInvoice = Collector.fromEmployeeSales(userResponse.employee).usingInvoice();
          }
        } else {
          this.showInvoice = false;
        }
        this.canAddNewInvoiceFunction();
        this.getDropdownInvoice(this.dataForm.controls['user_id'].value);
      }, errors => {
        console.info('Error Get User : ', errors);
      });


  }

  changeCheckBox(state) {
    this.dataForm.patchValue({is_use_route: state});
  }

  openDropdownUser() {
    this.userDropdownLoading = true;
    this.visitPlanService.dropdownUserCollector()
      .pipe(untilDestroyed(this))
      .subscribe(results => {
        this.dataUser = results.data.data;
        this.userDropdownLoading = false;
      }, errors => {
        this.toasterService.popAsync('error', 'Error', 'Can not retrieve dropdown user');
        this.userDropdownLoading = false;
      });
  }

  generateRouteSuccess($event) {
    // this.routeMapComponent.createRoute($event);
    // this.routeMapComponent.mapShow = true;
  }

  getDropdownInvoice(userId, firstTime: boolean = false) {
    this.invoice_id = null;
    this.dropdownInvoice = [];
    if (!firstTime) {
      this.invoiceList = [];
    }
    if (userId != null) {
      this.visitPlanService.get_user(userId)
        .pipe(untilDestroyed(this))
        .subscribe(res => {
          const userData = res.data;
          const division_id = userData.division_id;

          this.invoiceLoading = true;
          this.visitPlanService.dropdownInvoice(division_id)
            .pipe(untilDestroyed(this))
            .subscribe(resp => {
              this.invoiceLoading = false;
              const dataInvoice = resp.data.data;
              let dataInvoiceDropdown = [];
              let key;
              for (key of dataInvoice) {
                const combinedName = (key.customer.name) ? key.customer.name : 'Customer Not Found';
                dataInvoiceDropdown.push({
                  invoice_code: key.code,
                  customer_name: key.customer.name,
                  combined_name: key.code + ' - ' + combinedName + ` [ ${key.customer_code} ]`,
                  customer_code: key.customer_code,
                });
              }
              this.dropdownInvoice = dataInvoiceDropdown;
              this.ready_to_show_invoice = true;
            }, errors => {
              this.invoiceLoading = false;
              this.ready_to_show_invoice = true;
            });
        }, errors => {
          this.ready_to_show_invoice = true;
        });
    } else {
      this.dropdownInvoice = [];
      this.ready_to_show_invoice = true;
    }
  }

  setRoute(route: any) {
    this.generated_route = route;
  }

  setDestinationOrder(order: any) {
    this.generated_order = order;
  }

  setDestination(destination: any) {
    this.generated_destination = destination;
  }

  getAutoInvoice() {
    if (!!this.generated_destination && this.generated_destination.length) {
      let destinations = '';
      let i = 0;
      for (let dest of this.generated_destination) {
        if (i === 0) {
          destinations = destinations + dest.customer_code;
        } else {
          destinations = destinations + ',' + dest.customer_code;
        }
        i++;
      }
      this.invoiceLoading = true;

      this.visitPlanService.get_user(this.dataForm.controls['user_id'].value)
        .pipe(untilDestroyed(this))
        .subscribe(res => {
          const userData = res.data;
          const division_id = userData.division_id;

          this.visitPlanService.get_auto_invoice(destinations, division_id)
            .pipe(untilDestroyed(this))
            .subscribe(resp => {
              this.invoiceLoading = false;

              for (let data of resp.data.data) {
                const invoiceExist = this.invoiceList.find(x => x.id_invoice == data.code);
                const isNotExist = typeof invoiceExist == 'undefined';
                if (isNotExist) {
                  this.invoiceList.push({
                    id_invoice: data.code,
                    is_confirm: 0,
                    customer_name: data.customer_name,
                  });
                }
              }
              this.dataForm.patchValue({
                invoice_id: this.invoiceList,
              });
            }, errors => {
              this.invoiceLoading = false;
              this.toasterService.popAsync('error', 'Can not find invoice. ' + errors.error.message);
            });

        }, errors => {
          this.invoiceLoading = false;
          this.toasterService.popAsync('error', 'Can not find invoice. ' + errors.error.message);

        });
    } else {
      this.toasterService.popAsync('error', 'Cannot generate invoice', 'Please generate the route first');
    }
  }

  searchInvoiceField() {
    if (this.searchInvoice != '') {
      const searchValue = new RegExp(this.searchInvoice, 'i');
      let x, foundInvoice;
      foundInvoice = [];
      for (x of this.dataForm.controls['invoice_id'].value) {
        if (searchValue.test(x.id_invoice) || searchValue.test(x.customer_name)) {
          foundInvoice.push(x);
        }
      }
      this.invoiceSearchResult = foundInvoice;
    } else {
      this.searchInvoice = '';
      this.invoiceSearchResult = [];
    }
  }

  ngSelectSearchInvoice(term, item) {
    let availableItem = null;
    const searchValue = new RegExp(term, 'i');
    if (searchValue.test(item.invoice_code) || searchValue.test(item.customer_name) || searchValue.test(item.customer_code)) {
      availableItem = item;
    }
    return availableItem;
  }

  canAddNewInvoiceFunction(): boolean {
    let result = false;
    if (this.visitPlan != null) {
      result = this.visitPlan.canAddNewInvoice();
    }
    this.canAddNewInvoice = result;
    return result;
  }

  addInvoiceModal() {
    const activeModal = this.modalService.open(InvoiceComponent, {
      size: 'lg',
      container: 'nb-layout',
      backdrop: 'static',
    });
    activeModal.componentInstance.idUser = this.dataForm.controls['user_id'].value;
    activeModal.componentInstance.dataInvoice = this.dataForm.controls['invoice_id'].value;
    activeModal.componentInstance.idVisitPlan = this.dataForm.controls['id'].value;
    // console.info("TESTING 1", this.dataForm.controls['invoice_id'].value);
    // activeModal.componentInstance.dataInvoice = this.dataForm.controls[''].value;
  }
}

interface InvoiceData {
  id_invoice: string;
  is_confirm: number;
  customer_name: string;
}

@Pipe({name: 'CustomerName'})
export class CustomerName implements PipeTransform {
  transform(invoice_code: string, listInvoice: any): string {
    const resultCustomer = listInvoice.find(x => x.invoice_code === invoice_code);
    const customerName = (resultCustomer) ? resultCustomer.customer_name : '-';
    return customerName;
  }
}
