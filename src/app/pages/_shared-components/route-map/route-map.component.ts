import { AfterViewChecked, Component, Input, OnInit, Pipe, PipeTransform } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DevModeComponent } from './dev-mode/dev-mode.component';
import { DevRouteComponent } from './dev-mode/dev-route.component';
import { DevJsonComponent } from './dev-mode/dev-json.component';
import { RouteMapService } from './route-map.service';
import { environment } from '../../../../environments/environment';
import { GeoPosition } from '@Model/response-route';
import { CreateGenerateRoute, GenerateRoute } from '@Model/response-generate-route';
import { Destination } from '@Model/response-destination';
import { DestinationOrder } from '@Model/response-destionation-order';
import { FormGroup } from '@angular/forms';
import { Plan } from "@Model/response-plan";

@Component({
  selector: 'ngx-route-map',
  templateUrl: './route-map.component.html',
  styleUrls: ['./route-map.component.scss'],
})
export class RouteMapComponent implements OnInit, AfterViewChecked {
  env = environment;
  afterChecked = false;

  @Input() latitudePublic: number = null;
  @Input() longitudePublic: number = null;
  @Input() extraPinPoin = [];
  @Input() extraLine = [];
  @Input() globalFormGroup: FormGroup;
  @Input() hideAnyMessage: boolean = false;
  dataRoutes: any = null;
  routePoints: GeoPosition[] = [];

  startPoint = {lat: null, lng: null};
  endPoint = {lat: null, lng: null};
  sameStartEnd: boolean = false;
  routeWay = [];
  dataInstructions = [];
  wayPoint: GeoPosition[] = [];
  optionalPolyLine = [];
  destinations: Destination[] = [];
  destination_order: DestinationOrder[] = [];
  @Input() generated_order = [];
  @Input() generated_destination = [];
  @Input() generated_route = [];
  @Input() mapShow: boolean = false;
  @Input() routeLineShow: boolean = false;
  @Input() routeHistoryLineShow: boolean = true;
  @Input() pinPoinRoute: boolean = true;
  map: any;

  @Input() withInstruction: boolean = false;

  usingRoute: boolean = true;

  counting: number = 0;

  constructor(
    private modalService: NgbModal,
    private routeMapService: RouteMapService,
  ) {
  }

  ngOnInit() {
    this.afterChecked = false;
    this.startPoint = {
      lat: 0,
      lng: 0,
    };

    this.endPoint = {
      lat: 0,
      lng: 0,
    };
  }

  ngAfterViewChecked() {
    this.afterChecked = true;
  }

  initRouteMap(formGroup: FormGroup, plan: Plan = null) {
    const usingRoute: boolean = (formGroup.controls['is_use_route'].value == 1) ? true : false;
    const route: GenerateRoute = CreateGenerateRoute.fromMediaFormGroup(formGroup);
    if (this.counting == 0) {
      this.counting += 1;
      this.createRoute(route, formGroup.controls['destination'].value, route.destination_order, usingRoute);
      this.showMap();
    }

    if (plan != null) {
      this.destination_order = plan.getAllDestinationOrder();
      if (plan.isNotStartFromBranch()) {
        this.latitudePublic = plan.start_custom_location.latitude;
        this.longitudePublic = plan.stop_custom_location.longitude;
      } else {
        this.latitudePublic = plan.start_route_branch.lat;
        this.longitudePublic = plan.start_route_branch.lng
      }
      if (plan.isOrNotStartStopFromBranch()) {
        // Start
        if (plan.isNotStartFromBranch()) {
          this.startPoint = {
            lat: plan.start_custom_location.latitude,
            lng: plan.start_custom_location.longitude,
          };
        } else {
          this.startPoint = {
            lat: plan.start_route_branch.lat,
            lng: plan.start_route_branch.lng,
          };
        }
        // Stop
        if (plan.isNotStopFromBranch()) {
          this.endPoint = {
            lat: plan.stop_custom_location.latitude,
            lng: plan.stop_custom_location.longitude,
          };
        } else {
          this.endPoint = {
            lat: plan.end_route_branch.lat,
            lng: plan.end_route_branch.lng,
          };
        }
        if (this.startPoint == this.endPoint) {
          this.sameStartEnd = true;
        } else {
          this.sameStartEnd = false;
        }
      } else {
        this.startPoint = {
          lat: plan.start_route_branch.lat,
          lng: plan.start_route_branch.lng,
        };

        this.endPoint = {
          lat: plan.end_route_branch.lat,
          lng: plan.end_route_branch.lng,
        };
      }
    }
  }

  createRoute(dataRoutes: GenerateRoute, destinations: Destination[] = null, destinationOrders: DestinationOrder[] = [], usingRoute: boolean = true): void {
    this.usingRoute = usingRoute;
    // Cek apakah semua data sudah di cek init
    if (this.afterChecked) {
      this.dataRoutes = dataRoutes;
      const overviewLine: GeoPosition[] = this.routeMapService.createRoute(dataRoutes, usingRoute);
      this.wayPoint = overviewLine;
      this.routePoints = overviewLine;
      this.getPinPoint(usingRoute);
      if (usingRoute) {
        this.dataInstructions = this.routeMapService.getInstruction(dataRoutes);
      }
    }

    if (destinations != null) {
      this.destinations = destinations;
    }

    this.destination_order = destinationOrders.slice(1, (destinationOrders.length - 1));
  }

  public addPinPoin(poin) {
    this.extraPinPoin.push({
      lat: poin.lat,
      lng: poin.lng,
      message: poin.message,
    });
  }

  private getPinPoint(usingRoutes: boolean = true): void {
    const route = this.dataRoutes;
    const waypoint = this.wayPoint;
    const start_point = waypoint[0];
    const end_point = waypoint[waypoint.length - 1];

    if (start_point != null) {
      if (start_point.lat != null && start_point.lng != null) {
        this.latitudePublic = start_point.lat;
        this.longitudePublic = start_point.lng;

        this.startPoint = {
          lat: start_point.lat,
          lng: start_point.lng,
        };

        this.endPoint = {
          lat: end_point.lat,
          lng: end_point.lng,
        };

        this.sameStartEnd = (this.startPoint.lat == this.endPoint.lat) && (this.startPoint.lng == this.endPoint.lng);
        this.sameStartEnd = (this.startPoint.lat == this.endPoint.lat) && (this.startPoint.lng == this.endPoint.lng);

        if (usingRoutes) {
          this.routeWay = this.routeMapService.getRouteWay(route);
        }
      }
    }
  }

  showMap(): void {
    if (this.mapShow) {
      this.mapShow = false;
    } else {
      if ((this.routePoints.length === null || this.routePoints.length === 0) && !this.usingRoute) {
        // this.toasterService.popAsync('error', 'Success', 'Please generate routes before you see on the map');
        this.mapShow = true;
      } else {
        this.mapShow = true;
      }
    }
  }

  // Jika ingin menambahkan polyline dari luar map
  addPolyLine(poly, color) {
    console.info('Polyine Added', poly, ' With Color', color);
    let routePoly;
    routePoly = {
      routes: [],
      color: null,
    };
    if (poly.length != 0) {
      let x;
      for (x of poly) {
        routePoly['routes'].push({
          lat: x.lat,
          lng: x.lng,
        });
      }
      routePoly['color'] = color;
    }
    this.optionalPolyLine.push(routePoly);
  }

  mapReady(event: any) {
    this.map = event;
    this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(document.getElementById('devmode'));
    this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(document.getElementById('route'));
    this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(document.getElementById('json'));
  }

  openDevMode() {
    const activeModal = this.modalService.open(DevModeComponent, {
      size: 'lg',
      container: 'nb-layout',
      backdrop: 'static',
    });
    activeModal.componentInstance.latitude = this.latitudePublic;
    activeModal.componentInstance.longitude = this.longitudePublic;
  }

  openDevRoutes() {
    const activeModal = this.modalService.open(DevRouteComponent, {
      size: 'lg',
      container: 'nb-layout',
      backdrop: 'static',
    });
    activeModal.componentInstance.latitude = this.latitudePublic;
    activeModal.componentInstance.longitude = this.longitudePublic;
    activeModal.componentInstance.route = this.routeWay;
  }

  openDevJson() {
    const activeModal = this.modalService.open(DevJsonComponent, {
      size: 'lg',
      container: 'nb-layout',
      backdrop: 'static',
    });
    activeModal.componentInstance.dataRoutes = this.dataRoutes;
  }
}

@Pipe({name: 'GetPointName'})
export class GetPointName implements PipeTransform {
  transform(destination: DestinationOrder, orderDestination: Destination[], usingRoute: boolean = true): String {
    const currentDestination = orderDestination.find((x: Destination) => x.customer_code === destination.nfc_code);
    let result = destination.nfc_code;
    if (typeof currentDestination != "undefined") {
      result = currentDestination.customer_name
    } else {
      if (typeof destination.customer_name != "undefined") {
        result = destination.customer_name;
      }
    }
    return result;
  }
}
