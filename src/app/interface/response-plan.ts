// Created by supan adit pratama<supan.aditp@xenos.co.id>

import * as MapPolyline from 'decode-google-map-polyline';
import {Destination} from '@Model/response-destination';
import {DestinationOrder} from '@Model/response-destionation-order';
import {RouteBranch} from '@Model/response-route-branch';
import {RouteParent} from '@Model/response-route';
import {InvoiceInterface} from '@Model/response-invoice';
import {UserLogistic, UserSales} from '@Model/response-user';
import {PackingSlip} from '@Model/response-packing-slip';
import {DataPerformanceLogistic, DataPerformanceSales} from '@Model/response-performance';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {Image, PlanSummaryClass} from '@Model/response-plan-summary';
import {FormGroup} from '@angular/forms';

/**
 * PlanModel ini adalah struktur utama dari visit plan, delivery plan, visit cycle, dan delivery cycle
 */
export interface PlanModel {
  approval_by: number;
  asset_id?: any;
  change_route: any[];
  create_by: number;
  create_date: string;
  data_activity?: any;
  date: string;
  destination: Destination[];
  destination_new?: Destination[];
  destination_order: DestinationOrder[];
  edit_data?: any;
  end_route_branch: RouteBranch;
  end_route_branch_id: number;
  id: number;
  is_approval: number;
  is_delete_approval: number;
  is_delete_approval_by?: any;
  is_delete_count: number;
  is_deleted: number;
  is_use_route: number;
  route: RouteParent;
  start_route_branch: RouteBranch;
  start_route_branch_id: number;
  status: number;
  total_customer: number;
  total_invoice: number;
  update_date: string;
  user_id: number;
  stop_custom_location: Location;
  start_custom_location: Location;
}

export class Plan implements PlanModel {
  approval_by: number;
  asset_id?: any;
  change_route: any[];
  create_by: number;
  create_date: string;
  data_activity?: Object;
  date: string;
  destination: Destination[];
  destination_new?: Destination[];
  destination_order: DestinationOrder[];
  edit_data?: any;
  end_route_branch: RouteBranch;
  end_route_branch_id: number;
  id: number;
  is_approval: number;
  is_delete_approval: number;
  is_delete_approval_by?: any;
  is_delete_count: number;
  is_deleted: number;
  is_use_route: number;
  route: RouteParent;
  start_route_branch: RouteBranch;
  start_route_branch_id: number;
  status: number;
  total_customer: number;
  total_invoice: number;
  update_date: string;
  user_id: number;
  start_custom_location: Location;
  stop_custom_location: Location;

  constructor(plan: Plan | PlanModel) {
    this.approval_by = plan.approval_by;
    this.asset_id = plan.asset_id;
    this.change_route = plan.change_route;
    this.create_by = plan.create_by;
    this.create_date = plan.create_date;
    this.data_activity = plan.data_activity;
    this.date = plan.date;
    this.destination = plan.destination;
    this.destination_new = plan.destination_new;
    this.destination_order = plan.destination_order;
    this.edit_data = plan.edit_data;
    this.end_route_branch = plan.end_route_branch;
    this.end_route_branch_id = plan.end_route_branch_id;
    this.id = plan.id;
    this.is_approval = plan.is_approval;
    this.is_delete_approval = plan.is_delete_approval;
    this.is_delete_approval_by = plan.is_delete_approval_by;
    this.is_delete_count = plan.is_delete_count;
    this.is_deleted = plan.is_deleted;
    this.is_use_route = plan.is_use_route;
    this.route = plan.route;
    this.start_route_branch = plan.start_route_branch;
    this.start_route_branch_id = plan.start_route_branch_id;
    this.status = plan.status;
    this.total_customer = plan.total_customer;
    this.total_invoice = plan.total_invoice;
    this.update_date = plan.update_date;
    this.user_id = plan.user_id;
    this.start_custom_location = plan.start_custom_location;
    this.stop_custom_location = plan.stop_custom_location;
  }

  static fromFormGroup(formGroup: FormGroup): Plan {
    let planModel: PlanModel = formGroup.getRawValue();
    return new Plan(planModel);
  }

  /**
   * Fungsi ini digunakan untuk kebutuhan FormGroup
   */
  toObject(): Object {
    return {
      id: this.id,
      user_id: this.user_id,
      date: this.date,
      end_route_branch_id: this.end_route_branch_id,
      start_route_branch_id: this.start_route_branch_id,
      destination: this.destination,
      destination_order: this.destination_order,
      route: this.route,
      is_use_route: this.is_use_route,
    };
  }

  /**
   * Fungsi ini digunakan untuk mendapatkan Overview Line Point yang di dapat dari Back End hasil generate Google Map
   */
  getOverviewLinePoint() {
    let overviewLinePoint = null;
    if (this.change_route && this.change_route.length != 0 && this.change_route[0].routes[0]) {
      overviewLinePoint = this.change_route[0].routes[0].overview_polyline.points;
    }
    return overviewLinePoint;
  }

  /**
   * Fungsi ini digunakan untuk meng CONVERT hasil Over View Line Point menjadi array Lat dan Lng, {"lat":number, "lng": number}
   */
  getMapPolyLine() {
    let mapPolyLine = null;
    if (this.getOverviewLinePoint() != null) {
      mapPolyLine = MapPolyline(this.getOverviewLinePoint());
    }
    return mapPolyLine;
  }

  /**
   * Fungsi ini digunakan untuk mendapatkan apakah Plan ini sudah berjalan / belum dengan memeriksa pada key data_activity
   */
  isNoDataActivity(): boolean {
    let noDataActivity = true;
    if (typeof this.data_activity != 'undefined') {
      if (Object.keys(this.data_activity).length != 0) {
        noDataActivity = false;
      }
    }
    return noDataActivity;
  }

  /**
   * Fungsi ini digunakan untuk mendapatkan apakah Plan ini sudah berjalan / belum dengan cara invert fungsi IsNoDataActivity()
   */
  hasDataActivity(): boolean {
    return !this.isNoDataActivity();
  }

  /**
   * Fungsi ini digunakan untuk menentukan apakaah Plan ini sudah bukan plan untuk hari ini atau masih bisa digunakan untuk hari ini
   */
  isDateExpires(): boolean {
    // @ts-ignore`
    const currentDate = new Date();
    // @ts-ignore
    const date_formated = new Date(this.date);
    // @ts-ignore
    return new Date(date_formated.getFullYear(), date_formated.getMonth(), date_formated.getDate()) < new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  };

  /**
   * Fungsi ini digunakan untuk mendapatkan data apakah Plan ini mulai dari Start Branch yang dipilih atau tidak
   */
  isNotStartFromBranch(): boolean {
    let notStartFromBranch = false;
    if (this.hasDataActivity()) {
      if (this.start_custom_location != null) {
        notStartFromBranch = true;
      }
    }
    return notStartFromBranch;
  }

  /**
   * Fungsi ini digunakan untuk mendapatkan data apakah Plan ini berhenti di Stop Branch yang dipilih atau tidak
   */
  isNotStopFromBranch(): boolean {
    let notStopFromBranch = false;
    if (this.hasDataActivity()) {
      if (this.stop_custom_location != null) {
        notStopFromBranch = true;
      }
    }
    return notStopFromBranch;
  }

  /**
   * Fungsi ini digunakan untuk mendapatkan data apakah Plan ini dimulai dan berhenti di Branch yang dipilih
   */
  isAndNotStartStopFromBranch(): boolean {
    return this.isNotStartFromBranch() && this.isNotStopFromBranch();
  }

  /**
   * Fungsi ini digunakan untuk mendapatkan data apakah Plan ini dimulainya atau berhentinya di Branch yang dipilih
   */
  isOrNotStartStopFromBranch(): boolean {
    return this.isNotStartFromBranch() || this.isNotStopFromBranch();
  }

  /**
   * Fungsi ini digunakan untuk menentukan apakah Plan ini masih bisa digunakan
   */
  isAvailable(): boolean {
    let result: boolean = false;
    if (!this.isDateExpires()) {
      if (this.isNoDataActivity()) {
        result = true;
      }
    }
    return result;
  }

  /**
   * Fungsi ini digunakan untuk menentukan apakah Plan ini bisa tambah invoice
   */
  canAddNewInvoice(): boolean {
    let result: boolean = false;
    if (!this.isDateExpires()) {
      if (!this.isNoDataActivity()) {
        result = true;
      }
    }
    return result;
  }

  /**
   * Fungsi ini digunakan untuk cek apakah Branch Start dan Branch End Tidak Kosong
   */
  isAndBranchStartEndNotNull(): boolean {
    let canSave = false;
    if (this.start_route_branch_id != null && this.end_route_branch_id != null) {
      canSave = true;
    }
    return canSave;
  }

  /**
   * Fungsi ini digunakan untuk menggabungkan key Destination + Destination Order menjadi 1 list Destination Order dengan cara mengkonvert Destination menjadi Destination Order
   */
  getAllDestinationOrder(): DestinationOrder[] {
    const destination: DestinationOrder[] = this.destination.map((x: Destination) => {
      const destinationOrderConvert: DestinationOrder = {
        lat: x.lat,
        lng: x.lng,
        nfc_code: x.nfcid,
        order: (x.order_route) ? x.order_route : 0,
        customer_name: x.customer_name,
      };
      return destinationOrderConvert;
    });
    const destinationNew: DestinationOrder[] = (this.destination_new != null) ? this.destination_new.map((x: Destination) => {
      const destinationOrderConvert: DestinationOrder = {
        lat: x.lat,
        lng: x.lng,
        nfc_code: x.nfcid,
        order: (x.order_route) ? x.order_route : 0,
        customer_name: x.customer_name,
      };
      return destinationOrderConvert;
    }) : [];
    return destination.concat(destinationNew);
  }

  /**
   * Fungsi ini digunakan untuk cek apakah Branch Start dan Branch End Kosong
   */
  isAndBranchStartEndNull(): boolean {
    return !this.isAndBranchStartEndNotNull();
  }

  getStatus(): boolean {
    return (this.status == 0);
  }
}

export interface PlanActivity {
  distance: number;
  duration: number;
  location_address?: string;
  location_custom?: boolean;
  location_name?: any;
  nfc_code: string;
  order: number;
  start_time?: string;
  time_range: number;
  in_location_address?: string;
  in_location_custom?: boolean;
  in_location_name?: string;
  in_time?: string;
  out_location_address?: string;
  out_location_custom?: boolean;
  out_location_name?: string;
  out_time?: string;
  stop_time?: string;
}

export interface Location {
  address: string;
  latitude: number;
  longitude: number;
}


export interface PlanReportInterface {
  plan_activity: PlanActivity[];
  unvisit_customer: any;
}

/**
 * Visitplan adalah struktur utama visitplan dari backend, dengan parennt dari PlanModel
 */
export interface VisitPlanModel extends PlanModel {
  invoice_id: InvoiceInterface[];
  user: UserSales;
}

export class VisitPlan extends Plan implements VisitPlanModel {
  invoice_id: InvoiceInterface[];
  user: UserSales;

  constructor(plan: VisitPlan | VisitPlanModel) {
    super(plan);
    this.invoice_id = plan.invoice_id;
    this.user = plan.user;
  }

  static fromFormGroup(formGroup: FormGroup): VisitPlan {
    let planModel: VisitPlanModel = formGroup.getRawValue();
    return new VisitPlan(planModel);
  }

  toObject(): Object {
    return Object.assign(super.toObject(), {
      invoice_id: this.invoice_id,
    });
  }
}

export interface VisitPlanReport extends VisitPlanModel, PlanReportInterface {
  data_performance: DataPerformanceSales;
}

/**
 * Delivery PlanModel adalah struktur utama delivery plan dari backend, dengan parennt dari PlanModel
 */
export interface DeliveryPlanModel extends PlanModel {
  packing_slip_id: PackingSlip[];
  user: UserLogistic;
}

export class DeliveryPlan extends Plan implements DeliveryPlanModel {
  packing_slip_id: PackingSlip[];
  user: UserLogistic;

  constructor(plan: DeliveryPlan | DeliveryPlanModel) {
    super(plan);
    this.packing_slip_id = plan.packing_slip_id;
    this.user = plan.user;
  }

  toObject(): Object {
    return Object.assign(super.toObject(), {
      packing_slip_id: this.packing_slip_id,
    });
  }
}

export interface DeliveryPlanReport extends DeliveryPlanModel, PlanReportInterface {
  data_performance: DataPerformanceLogistic;
}

export interface ImageModelInterface {
  image: SafeResourceUrl;
  note: String;
  base64: string;
}

export class ImageModel implements ImageModelInterface {
  base64: string;
  image: SafeResourceUrl;
  note: String;
  customer_code: String;
  create_date: String;

  constructor(base64: string, image: SafeResourceUrl, note: String, customer_code: String, create_date: String) {
    this.base64 = base64;
    this.image = image;
    this.note = note;
    this.customer_code = customer_code;
    this.create_date = create_date;
  }
}

export class PlanReport extends Plan implements PlanReportInterface {
  plan_activity: PlanActivity[];
  unvisit_customer: any;
  // Code Dynamic
  data_performance: DataPerformanceLogistic | DataPerformanceSales;

  constructor(planReport: DeliveryPlanReport | VisitPlanReport) {
    super(planReport);
    // Could Different
    this.data_performance = planReport.data_performance;
    this.unvisit_customer = planReport.unvisit_customer;
  }

  getListVisitImage(planSummary: PlanSummaryClass[], sanitizer: DomSanitizer): ImageModel[] {
    let imageModelInitial: ImageModel[] = [];
    planSummary.forEach((planSummaryChild) => {
      planSummaryChild.visit_images.forEach((image: Image) => {
        imageModelInitial.push(this.toImageModel(image, planSummaryChild.customer_code, planSummaryChild.create_date, sanitizer));
      });
    });
    return imageModelInitial;
  }

  getListCompetitorImage(planSummary: PlanSummaryClass[], sanitizer: DomSanitizer): ImageModel[] {
    let imageModelInitial: ImageModel[] = [];
    planSummary.forEach((planSummaryChild) => {
      planSummaryChild.competitor_images.forEach((image: Image) => {
        imageModelInitial.push(this.toImageModel(image, planSummaryChild.customer_code, planSummaryChild.create_date, sanitizer));
      });
    });
    return imageModelInitial;
  }

  toImageModel(image: Image, customer_code: string, create_date: string, sanitizer: DomSanitizer): ImageModel {
    const base64: string = 'data:image/jpg;base64,' + image.image.toString();
    const imageData: SafeResourceUrl = sanitizer.bypassSecurityTrustResourceUrl(base64);
    return new ImageModel(
      base64,
      imageData,
      image.desc,
      customer_code,
      create_date,
    );
  }
}

export interface PlanSummaryTypeInterface {
  planName: String;
  endPoint: String;
}

export class PlanSummaryType implements PlanSummaryTypeInterface {
  planName: String;
  endPoint: String;


  protected constructor(planName: String, endPoint: String) {
    this.planName = planName;
    this.endPoint = endPoint;
  }

  static VisitPlan(): PlanSummaryType {
    return new this(
      'Visit PlanModel', 'visit',
    );
  }

  static DeliveryPlan(): PlanSummaryType {
    return new this(
      'Delivery PlanModel', 'delivery',
    );
  }
}
