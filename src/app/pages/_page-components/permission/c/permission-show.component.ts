import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ToasterService } from 'angular2-toaster';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionService } from '../../../../services/permission.service';
import * as MapPolyline from 'decode-google-map-polyline';
import { VisitPlanService } from '../../../../services/visit-plan.service';
import { RouteMapComponent } from '../../../_shared-components/route-map/route-map.component';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { DeliveryRouteService } from '../../../../services/delivery-route.service';
import { CreateGenerateRoute } from '@Model/response-generate-route';

@Component({
  selector: 'ngx-permission-show',
  templateUrl: './permission-show.component.html',
  styleUrls: ['./permission-show.component.scss'],
})
export class PermissionShowComponent implements OnInit, OnDestroy {
  private id: number;
  public dataPermission;
  public date;
  public type;
  public description;
  public latitude;
  public longitude;
  public routes = [];
  public oldRoutes = [];
  public extraPinPoin = [];
  public extraLine = [];
  public is_approved = -1;
  public is_rejected = -1;
  public plan_id = null;
  public plan_type: string = null;

  public requesting: boolean = false;
  public textLabel = 'Please wait...';

  @ViewChild(RouteMapComponent)
  private routeMapComponent: RouteMapComponent;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private toasterService: ToasterService,
    private permissionService: PermissionService,
    private router: Router,
    private visitplanService: VisitPlanService,
    private deliveryRouteService: DeliveryRouteService,
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number

      // get data detail
      this.permissionService.show(this.id)
        .pipe(untilDestroyed(this))
        .subscribe(resp => {
          console.info('data permission: ', resp.data);
          this.dataPermission = resp.data;
          this.date = resp.data.date;
          this.type = resp.data.type;
          this.is_approved = resp.data.is_approved;
          this.is_rejected = resp.data.is_rejected;

          console.info(resp.data);
          if (resp.data.type == 'routes') {
            if (!!resp.data.visit_plan_id) {
              this.plan_id = resp.data.visit_plan_id;
              this.plan_type = 'visitplan';
            } else if (!!resp.data.delivery_plan_id) {
              this.plan_id = resp.data.delivery_plan_id;
              this.plan_type = 'deliveryplan';
            }
            const overviewLine = MapPolyline(resp.data.description.routes[0].overview_polyline.points);
            this.routes = overviewLine;
            let statusCreateRoute;
            statusCreateRoute = false;
            if (this.plan_type == 'visitplan') {
              this.visitplanService.show(this.plan_id)
                .pipe(untilDestroyed(this))
                .subscribe(response => {
                  this.routeMapComponent.createRoute(CreateGenerateRoute.fromPlan(response.data));
                  this.routeMapComponent.mapShow = true;
                  const oldPoint = MapPolyline(response.data.route.routes[0].overview_polyline.points);
                  this.oldRoutes = oldPoint;
                  statusCreateRoute = true;
                  this.routeMapComponent.addPolyLine(overviewLine, 'red');
                });
            } else {
              this.deliveryRouteService.show(this.plan_id)
                .pipe(untilDestroyed(this))
                .subscribe(deliveryplan => {
                  this.routeMapComponent.createRoute(deliveryplan.data.route);
                  this.routeMapComponent.mapShow = true;
                  const oldPoint = MapPolyline(deliveryplan.data.route.routes[0].overview_polyline.points);
                  this.oldRoutes = oldPoint;
                  statusCreateRoute = true;
                  this.routeMapComponent.addPolyLine(overviewLine, 'red');
                });
            }
            this.latitude = resp.data.description.routes[0].bounds.northeast.lat;
            this.longitude = resp.data.description.routes[0].bounds.northeast.lng;
          }

          this.description = resp.data.description;

          if (this.type == 'report') {
            const description = resp.data.description;
            if (description.type == 'location') {
              this.extraPinPoin.push({
                lat: description.user_latitude,
                lng: description.user_longitude,
                message: 'User Location',
              });
              this.extraPinPoin.push({
                lat: description.customer_latitude,
                lng: description.customer_longitude,
                message: 'Customer Location',
              });
              const middlePoint = this.middlePoint(description.customer_latitude, description.customer_longitude, description.user_latitude, description.user_longitude);
              console.info('Middle Point : ', middlePoint);
              const distance = description.distance.toString();
              this.extraPinPoin.push({
                lat: middlePoint[0],
                lng: middlePoint[1],
                message: parseInt(distance).toString().concat(' Meters'),
                opacity: 0,
              });
            }
          }
        }, errors => {
          const errorMessage = 'Something wrong with error: ' +
            errors.message + '. Error detail: ' + errors.error.message;
          this.toasterService.popAsync('error', 'Error', errorMessage);
          setTimeout(() => {
            this.location.back();
          }, 2000);
        });
    });
  }

  toRad(variable) {
    return variable * Math.PI / 180;
  }

  toDeg(variable) {
    return variable * (180 / Math.PI);
  }

  middlePoint(lat1, lng1, lat2, lng2) {
    var calculate = lng2 - lng1;
    var dLng = this.toRad(calculate);

    lat1 = this.toRad(lat1);
    lat2 = this.toRad(lat2);
    lng1 = this.toRad(lng1);

    var bX = Math.cos(lat2) * Math.cos(dLng);
    var bY = Math.cos(lat2) * Math.sin(dLng);
    var lat3 = Math.atan2(Math.sin(lat1) + Math.sin(lat2), Math.sqrt((Math.cos(lat1) + bX) * (Math.cos(lat1) + bX) + bY * bY));
    var lng3 = lng1 + Math.atan2(bY, Math.cos(lat1) + bX);

    return [this.toDeg(lat3), this.toDeg(lng3)];
  }

  confirm() {
    this.requesting = true;
    this.permissionService.confirm(this.id)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
          this.textLabel = 'Success, Redirecting...';
          this.toasterService.popAsync('success', 'Success', 'Permission Approved');
          setTimeout(() => {
            this.location.back();
          }, 1000);
        }, () => {
          this.requesting = false;
          // console.log(errors.error.data);
          this.toasterService.popAsync('error', 'Error', 'Cannot approved this permission');
        },
      );

  }

  cancel() {
    this.requesting = true;
    this.permissionService.cancel(this.id)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
          this.textLabel = 'Success, Redirecting...';
          this.toasterService.popAsync('success', 'Success', 'Permission Rejected');
          setTimeout(() => {
            this.location.back();
          }, 1000);
        }, () => {
          // console.log(errors.error.data);
          this.requesting = false;
          this.toasterService.popAsync('error', 'Error', 'Cannot reject this permission');
        },
      );
  }

  back() {
    this.location.back();
  }

  ngOnDestroy() {
    //
  }
}
