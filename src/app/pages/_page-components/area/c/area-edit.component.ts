import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  SimpleChange,
} from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AgmMap, AgmPolygon, AgmPolyline, LatLngLiteral, MapsAPILoader, MouseEvent } from '@agm/core';

// import { } from '@types/googlemaps';
import { ToasterService } from 'angular2-toaster';
import { AreaService } from '../../../../services/area.service';
import { Location } from '@angular/common';
import { label_data_save } from '../../../../configs/configs';
import { MenuService } from '../../../../services/menu.service';
import { ApprovalService } from '../../../../services/approval.service';
import { untilDestroyed } from 'ngx-take-until-destroy';

declare var google: any;

@Component({
  selector: 'ngx-area-edit',
  styleUrls: ['./area-edit.component.scss'],
  templateUrl: './area-edit.component.html',
})

export class AreaEditComponent implements OnInit, AfterViewInit, OnDestroy {
  paths: Array<LatLngLiteral> = [];
  id: number;
  latitude: number = -6.93464749;
  longitude: number = 107.59296792;
  address: string;
  public zoom: number = 10;
  public searchControl: FormControl;
  isSubmitting: boolean = false;
  isLoadingDropdown: boolean = false;
  isLoadingGeneral: boolean = true;
  isView: boolean = false;
  method: string;
  isApprovalView: boolean = false;

  @ViewChild('search')
  public searchElementRef: ElementRef;
  dataForm: FormGroup;
  serverErrors = [];
  polyPath: PathCoordinates[] = [];
  polygonPath = [];
  color: string;
  dataName = label_data_save.saving;

  @ViewChild(AgmMap)
  mapView: AgmMap;

  @ViewChild(AgmPolygon)
  agmPolygon: AgmPolygon;

  @ViewChild(AgmPolyline)
  agmPolyLine: AgmPolyline;

  pathChangeds: SimpleChange;

  constructor(
    private areaService: AreaService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private fb: FormBuilder,
    private toasterService: ToasterService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private menuService: MenuService,
    private approvalService: ApprovalService,
  ) {
    this.color = '#105dd1';
  }

  ngAfterViewInit() {
    // print array of CustomComponent objects
    // console.info(this.polygonmap.nativeElement);
  }

  ngOnInit() {
    this.menuService.getMenuReloaded(this.route.snapshot.data['route_code']);
    // for map search
    // create search FormControl
    this.searchControl = new FormControl();

    this.dataForm = this.fb.group({
      name: [],
      description: [],
      marker_color: [],
      markers: [],
      marker_type: 'polygon',
    });

    // this.pickMap();

    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      const id = +params['id'];
      const id_approval = +params['id_approval'];

      if (!!id) {
        // id not empty => edit form
        this.prepareEditForm(id);
      } else if (!!id_approval) {
        this.prepareViewApproval(id_approval);
        this.isApprovalView = true;
      } else {
        this.isLoadingGeneral = false;
      }
    });


    if (this.route.snapshot.data['method'] === 'view') {
      this.isView = true;
    }

    this.method = this.route.snapshot.data['method'];
    // console.info(this.polygonmap.nativeElement.getPaths());
  }


  back() {
    this.location.back();
  }

  prepareViewApproval(id) {
    this.approvalService.show_approval(id)
      .pipe(untilDestroyed(this))
      .subscribe(results => {
        console.info(results);
        this.paths = results.data.data.markers || [];
        if (results.error == 0) {
          this.dataForm.setValue({
            name: results.data.data.name,
            description: results.data.data.description,
            markers: results.data.data.markers,
            marker_color: results.data.data.marker_color,
            marker_type: 'polygon',
          });
          this.color = results.data.data.marker_color;
          // console.log(results.data.markers);
          if (results.data.data.markers !== null) {
            this.latitude = results.data.data.markers[0].lat;
            this.longitude = results.data.data.markers[0].lng;
            this.polygonPath = results.data.data.markers;
          }
        } else {
          this.toasterService.popAsync('error', 'Error', 'Data Not found');
          setTimeout(() => {
            this.location.back();
          }, 2000);
        }
        this.zoom = 10;
        this.isLoadingGeneral = false;
      }, errors => {
        // const errorMessage = 'Something wrong with error: ' + errors.message + '. Error detail: ' + errors.error.message;
        // console.log(errors);
        this.toasterService.popAsync('error', 'Error', errors.error.message);
        setTimeout(() => {
          this.location.back();
        }, 2000);
      });
  }

  prepareEditForm(id) {
    this.areaService.show(id)
      .pipe(untilDestroyed(this))
      .subscribe(results => {
        this.paths = results.data.markers || [];
        if (results.error == 0) {
          this.dataForm.setValue({
            name: results.data.name,
            description: results.data.description,
            markers: results.data.markers,
            marker_color: results.data.marker_color,
            marker_type: 'polygon',
          });
          this.color = results.data.marker_color;
          // console.log(results.data.markers);
          if (results.data.markers !== null) {
            this.latitude = results.data.markers[0].lat;
            this.longitude = results.data.markers[0].lng;
            this.polygonPath = results.data.markers;
          }
        } else {
          this.toasterService.popAsync('error', 'Error', 'Data Not found');
          setTimeout(() => {
            this.location.back();
          }, 2000);
        }
        this.zoom = 10;
        this.isLoadingGeneral = false;
      }, errors => {
        // const errorMessage = 'Something wrong with error: ' + errors.message + '. Error detail: ' + errors.error.message;
        // console.log(errors);
        this.toasterService.popAsync('error', 'Error', errors.error.message);
        setTimeout(() => {
          this.location.back();
        }, 2000);
      });
  }

  newPolyLine(event: MouseEvent) {
    if (!this.isView) {
      this.polyPath.push({
        lat: event.coords.lat,
        lng: event.coords.lng,
      });
      if (this.polygonPath.length >= 0) {
        this.polygonPath = [];
        this.dataForm.value.markers = null;
      }
    }
  }

  lineClicked(event) {
    if (this.polyPath.length >= 0 && !this.isView) {
      const firstLatitude = this.polyPath[0].lat;
      const firstLongitude = this.polyPath[0].lng;
      const secondLatitude = event.latLng.lat();
      const secondLongitude = event.latLng.lng();
      if ((firstLatitude === secondLatitude) && (firstLongitude === secondLongitude)) {
        this.polygonPath = this.polyPath;
        this.polyPath = [];
        this.dataForm.value.markers = this.polygonPath;
      }
    }
  }

  /**
   * Save data
   * @param formValue
   * @param nextAction
   */
  saveData(nextAction) {
    const name = this.dataForm.controls['name'].value;
    this.serverErrors = [];
    if (name != null && name != '') {
      this.serverErrors = [];
      this.polygonPath = [];
      this.isSubmitting = true;
      this.agmPolygon.getPath().then((s) => {
        s.forEach((x) => {
          this.polygonPath.push({
            lat: x.lat(),
            lng: x.lng(),
          })
        });
        this.dataForm.patchValue({
          markers: this.polygonPath,
        });
        this.areaService.save(this.dataForm.value, this.id).subscribe(
          (res) => {
            this.toasterService.popAsync('success', 'Success', res.message);
            if (nextAction === 'close') {
              this.dataName = label_data_save.redirect;
              setTimeout(() => {
                this.location.back();
              }, 2000);
            } else if (nextAction === 'new') {
              this.dataForm.reset();
            } else {
              this.isSubmitting = false;
            }
          }, errors => {
            this.isSubmitting = false;
            let field;
            if (!!errors.error.data && errors.error.data.length) {
              this.toasterService.popAsync('warning', 'Error', 'Please make sure all data are valid');
              for (const error of errors.error.data) {
                console.info(error['field']);
                field = error['field'];
                this.serverErrors[field] = error['message'];
              }
            } else {
              const errorMessage = errors.error.message;
              this.toasterService.popAsync('error', 'Error', errorMessage);
            }
          },
        );
      }).catch(data => {
        console.info('Masuk Catch', data);
        this.toasterService.popAsync('error', 'Error', 'Please create at least one polygon on the map');
        this.isSubmitting = false;
      });
    } else {
      this.toasterService.popAsync('error', 'Error', 'Please insert area name');
      this.serverErrors['name'] = 'This field is required';
    }
  }

  dataEdit() {
    this.router.navigate([`pages/settings/area/edit/${this.id}`]);
    this.method = 'EDIT';
  }

  polyPathChange() {
    console.info('PolyLine Change', this.agmPolyLine);
  }

  ngOnDestroy() {
    //
  }
}

// Dibuat untuk inisialisasi standar Path
interface PathCoordinates {
  lat: number;
  lng: number;
}
