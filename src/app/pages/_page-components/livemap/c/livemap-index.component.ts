import { Component, OnDestroy, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { LivemapService } from '../../../../services/livemap.service';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from '../../../../services/menu.service';
import { OauthService } from '../../../../services/oauth.service';
import { VisitPlanService } from '../../../../services/visit-plan.service';
import { DeliveryRouteService } from '../../../../services/delivery-route.service';
import { RouteMapService } from '../../../_shared-components/route-map/route-map.service';

@Component({
  selector: 'ngx-livemap-index',
  templateUrl: './livemap-index.component.html',
  styleUrls: ['./livemap-index.component.scss'],
})

export class LivemapIndexComponent implements OnInit, OnDestroy {
  public lat = -6.93464749;
  public lng = 107.59296792;
  public user_id: number;
  public username: String;
  public zoom = 10;
  isLogin = false;
  searchUser: string = null;

  markers = [];
  allMarker = [];

  listAllUser = [];
  listSales = [];
  listLogistic = [];
  selectBranch = false;
  selectDivision = false;
  filtering = false;
  allBranchPrivilegeUser = [];
  allDivisionPrivilegeUser = [];
  selectedBranch = [];
  selectedDivision = [];

  loadingDropdownDivision = true;
  loadingDropdownBranch = true;


  statusSupervisorLogistic = false;
  statusSupervisorSales = false;

  profileUser;

  isGlobalLogistic = false;
  isGlobalSales = false;


  public connection;

  constructor(
    private livemapService: LivemapService,
    private route: ActivatedRoute,
    private menuService: MenuService,
    private oauthService: OauthService,
    private visitPlanService: VisitPlanService,
    private deliveryRouteService: DeliveryRouteService,
    private routeMapService: RouteMapService,
  ) {
  }

  ngOnInit() {
    this.loadBranchUser();
    this.loadDivisionUser();
    this.profileUser = this.oauthService.getProfile();
    this.statusSupervisorLogistic = (this.profileUser.is_supervisor_logistic == '1' || this.profileUser.is_supervisor_logistic == 1);
    this.statusSupervisorSales = (this.profileUser.is_supervisor_sales == '1' || this.profileUser.is_supervisor_sales == 1);
    this.connection = this.livemapService.getLocation().subscribe(marker => {
      console.info('Showing Marker livemap index, is colllector : ', this.profileUser.is_collector_only);
      console.info(marker);
      this.allMarker = marker;
      this.loadMarker();
    });
    this.menuService.getMenuReloaded(this.route.snapshot.data['route_code']);

  }

  loadMarker() {
    this.markers = [];
    const branchPrivilege = this.profileUser.branch_privilege_id;
    const divisionPrivilege = this.profileUser.division_privilege_id;
    const is_supervisor_sales = this.profileUser.is_supervisor_sales;
    const is_supervisor_logistic = this.profileUser.is_supervisor_logistic;
    if (this.isGlobalSales || this.isGlobalLogistic) {
      // console.info('Check Tahap 1');
      if (this.selectedDivision.length == 0 && this.selectedBranch.length == 0) {
        let x;
        for (x of this.allMarker) {
          console.info('New Marker : ', x);
          const userData = x;
          if (this.isSupervisorSales(this.isGlobalSales, userData.job_function) && this.isSupervisorLogistic(this.isGlobalLogistic, userData.job_function)) {
            if (this.isSameBranch(branchPrivilege, userData.branch_id)) {
              if (this.isSameDivision(divisionPrivilege, userData.division_id)) {
                this.markers.push(userData);
              }
            }
          } else {

            if (this.isSupervisorSales(this.isGlobalSales, userData.job_function)) {
              if (this.isSameBranch(branchPrivilege, userData.branch_id)) {
                if (this.isSameDivision(divisionPrivilege, userData.division_id)) {
                  this.markers.push(userData);
                }
              }
            }

            if (this.isSupervisorLogistic(this.isGlobalLogistic, userData.job_function)) {
              if (this.isSameBranch(branchPrivilege, userData.branch_id)) {
                this.markers.push(userData);
              }
            }

          }
        }
      } else {
        let x;
        for (x of this.allMarker) {
          console.info('Filtering ', x);
          // console.info('Selected Branch :  ', this.selectedBranch);
          const userData = x;
          if (this.isSupervisorSales(this.isGlobalSales, userData.job_function) && this.isSupervisorLogistic(this.isGlobalLogistic, userData.job_function)) {
            if (this.selectedBranch.length != 0 && this.selectedDivision.length != 0) {
              if (this.isSameBranch(this.selectedBranch, userData.branch_id) && this.isSameDivision(this.selectedDivision, userData.division_id)) {
                this.markers.push(userData);
              }
            } else {
              if (this.isSameBranch(this.selectedBranch, userData.branch_id) || this.isSameDivision(this.selectedDivision, userData.division_id)) {
                this.markers.push(userData);
              }
            }
          } else {
            if (this.isSupervisorSales(this.isGlobalSales, userData.job_function)) {
              if (this.selectedBranch.length != 0 && this.selectedDivision.length != 0) {
                if (this.isSameBranch(this.selectedBranch, userData.branch_id) && this.isSameDivision(this.selectedDivision, userData.division_id)) {
                  this.markers.push(userData);
                }
              } else {
                if (this.isSameBranch(this.selectedBranch, userData.branch_id) || this.isSameDivision(this.selectedDivision, userData.division_id)) {
                  this.markers.push(userData);
                }
              }
            }

            if (this.isSupervisorLogistic(this.isGlobalLogistic, userData.job_function)) {
              if (this.isSameBranch(this.selectedBranch, userData.branch_id)) {
                this.markers.push(userData);
              }
            }
          }
        }
      }
    } else {
      // console.info('Check Tahap 2');
      if (this.selectedDivision.length == 0 && this.selectedBranch.length == 0) {
        // console.info('Check Tahap 2.1');
        console.info('Jika filter tidak dimasukan');
        let x;
        for (x of this.allMarker) {
          console.info('New Marker : ', x);
          const userData = x;
          // 
          if (this.isSupervisorSales(is_supervisor_sales, userData.job_function) && this.isSupervisorLogistic(is_supervisor_logistic, userData.job_function)) {
            // console.info('Check Tahap 2.1.1 : ', areaData);
            if (this.isSameBranch(branchPrivilege, userData.branch_id)) {
              if (this.isSameDivision(divisionPrivilege, userData.division_id)) {
                this.markers.push(userData);
              }
            }
            if (userData.job_function == 'logistic') {
              if (this.isSameBranch(branchPrivilege, userData.branch_id)) {
                this.markers.push(userData);
              }
            }
          } else {
            // console.info('Check Tahap 2.1.2 : ', areaData);
            if (this.isSupervisorSales(is_supervisor_sales, userData.job_function)) {
              // console.info('Check Tahap 2.1.2.1 : ', areaData);
              if (this.isSameBranch(branchPrivilege, userData.branch_id)) {
                // console.info('Check Tahap 2.1.2.1.1 : ', areaData);
                if (this.isSameDivision(divisionPrivilege, userData.division_id)) {
                  // console.info('Check Tahap 2.1.2.1.1.1 : ', areaData);
                  this.markers.push(userData);
                }
              }
            }
            if (this.isSupervisorLogistic(is_supervisor_logistic, userData.job_function)) {
              // console.info('Check Tahap 2.1.2.2 : ', areaData);
              if (this.isSameBranch(branchPrivilege, userData.branch_id)) {
                // console.info('Check Tahap 2.1.2.2.1 : ', areaData);
                this.markers.push(userData);
              }
            }
          }
        }
      } else {
        // console.info('Check Tahap 2.2');
        console.info('Jika Menggunakan filter');
        let x;
        for (x of this.allMarker) {
          console.info('Filtering ', x);
          console.info('Selected Branch :  ', this.selectedBranch);
          const userData = x;
          if (this.isSupervisorSales(is_supervisor_sales, userData.job_function) && this.isSupervisorLogistic(is_supervisor_logistic, userData.job_function)) {
            if (this.selectedBranch.length != 0 && this.selectedDivision.length != 0) {
              if (this.isSameBranch(this.selectedBranch, userData.branch_id) && this.isSameDivision(this.selectedDivision, userData.division_id)) {
                this.markers.push(userData);
              }
            } else {
              if (this.isSameBranch(this.selectedBranch, userData.branch_id) || this.isSameDivision(this.selectedDivision, userData.division_id)) {
                this.markers.push(userData);
              }
            }
          } else {
            if (this.isSupervisorSales(is_supervisor_sales, userData.job_function)) {
              if (this.selectedBranch.length != 0 && this.selectedDivision.length != 0) {
                if (this.isSameBranch(this.selectedBranch, userData.branch_id) && this.isSameDivision(this.selectedDivision, userData.division_id)) {
                  this.markers.push(userData);
                }
              } else {
                if (this.isSameBranch(this.selectedBranch, userData.branch_id) || this.isSameDivision(this.selectedDivision, userData.division_id)) {
                  this.markers.push(userData);
                }
              }
            }

            if (this.isSupervisorLogistic(is_supervisor_logistic, userData.job_function)) {
              if (this.isSameBranch(this.selectedBranch, userData.branch_id)) {
                this.markers.push(userData);
              }
            }
          }
        }
      }
    }
    this.listDefault(this.markers);
  }


  isSameBranch(branch_privilege_list, user_branch) {
    const branch_selected = user_branch.toString();
    // console.info('Branch Privilege List : ', branch_privilege_list);
    let x, statusFounded, listBranch;
    statusFounded = false;
    listBranch = [];
    if (typeof branch_privilege_list == 'string') {
      listBranch = branch_privilege_list.split(',');
    } else {
      listBranch = branch_privilege_list;
    }
    for (x of listBranch) {
      // console.info('Search Branch : ', x, ' = ', branch_selected);
      if (x.toString() == branch_selected) {
        statusFounded = true;
      }
    }
    return statusFounded;
  }

  isSameDivision(division_privilege_list, user_division) {
    const division_selected = user_division.toString();
    // console.info('Division Privilege List : ', division_privilege_list);
    let x, statusFounded, listDivision;
    statusFounded = false;
    listDivision = [];
    if (typeof division_privilege_list == 'string') {
      listDivision = division_privilege_list.split(',');
    } else {
      listDivision = division_privilege_list;
    }
    for (x of listDivision) {
      if (x.toString() == division_selected) {
        // console.info('Search Division : ', x);
        statusFounded = true;
      }
    }
    return statusFounded;
  }

  isSupervisorSales(your_code_number, user_string_status) {
    let status;
    status = false;
    if (your_code_number == '1' || your_code_number == 1) {
      if (user_string_status == 'sales') {
        console.info(your_code_number, ' Is Sales ', user_string_status);
        status = true;
      }
    }
    return status;
  }

  isSupervisorLogistic(your_code_number, user_string_status) {
    let status;
    status = false;
    console.info('Check Supervisor Logistic : ', your_code_number, ' = ', user_string_status);
    if (your_code_number == '1' || your_code_number == 1) {
      if (user_string_status == 'logistic') {
        console.info(your_code_number, ' Is Logistic ', user_string_status);
        status = true;
      }
    }
    return status;
  }

  private listDefault(marker) {
    this.listAllUser = marker;
    this.listLogistic = [];
    this.listSales = [];
    let user;
    for (user of marker) {
      if (user.job_function == 'logistic') {
        this.listLogistic.push(user);
      }
      if (user.job_function == 'sales') {
        this.listSales.push(user);
      }
    }
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

  onMapReady(mapInstance) {
    let trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(mapInstance);
  }

  markerDragEnd(map, $event: MouseEvent) {
    const latitudeChanged = $event.coords.lat;
    const longitudeChanged = $event.coords.lng;
    console.info(map.name);
    const data = {
      user_id: map.user_id,
      lat: latitudeChanged,
      lng: longitudeChanged,
    };
    this.lat = latitudeChanged;
    this.lng = longitudeChanged;
    this.livemapService.changeLocation(data);
  }

  login() {
    if (this.user_id == null) {
      console.info('Please Fill User ID');
    } else if (this.username == null || this.username == '') {
      console.info('Please Fill Username');
    } else {
      const data = {
        user_id: this.user_id,
        name: this.username,
        lat: this.lat,
        lng: this.lng,
      };
      this.livemapService.setUser(data);
      this.isLogin = true;
    }
    console.info('The Marker Is', this.markers);
  }

  dataOnChange() {
    const data = {
      user_id: this.user_id,
      lat: this.lat,
      lng: this.lng,
    };

    this.livemapService.changeLocation(data);
    console.info('Change Detected');
    console.info('Marker Is', this.markers);
  }

  search() {
    let x;
    const searchValue = new RegExp(this.searchUser, 'i');
    let dataUser;
    dataUser = [];
    if (this.searchUser != null && this.searchUser != '') {
      for (x of this.markers) {
        if (searchValue.test(x.name)) {
          dataUser.push(x);
        }
      }
      this.listAllUser = dataUser;
      this.listDefault(dataUser);
    } else {
      this.searchUser = null;
      this.listDefault(this.markers);
    }
  }

  focusUser(dataUser) {
    console.info('click focus');
    this.lat = null;
    this.lng = null;
    setTimeout(() => {
      this.lat = dataUser.lat;
      this.lng = dataUser.lng;
    }, 500);
  }

  selectingBranch(status) {
    this.selectBranch = status;
  }

  selectFilter() {
    if (this.filtering) {
      this.filtering = false;
    } else {
      this.filtering = true;
    }
  }

  loadBranchUser() {
    this.loadingDropdownBranch = true;
    this.livemapService.branch_user().subscribe(res => {
      this.loadingDropdownBranch = false;
      console.info('Branch User : ', res);
      this.allBranchPrivilegeUser = res.data.data;
    });
  }

  loadDivisionUser() {
    this.loadingDropdownDivision = true;
    this.livemapService.division_user().subscribe(res => {
      this.loadingDropdownDivision = false;
      console.info('Division User : ', res);
      this.allDivisionPrivilegeUser = res.data.data;
    });
  }

  changeBranchDropdown() {
    this.loadMarker();
  }

  changeDivisionDropdown() {
    this.loadMarker();
  }

  checkBoxSales($event) {
    this.isGlobalSales = $event.returnValue;
    this.loadMarker();
  }

  checkBoxLogistic($event) {
    this.isGlobalLogistic = $event.returnValue;
    this.loadMarker();
  }

  getUserRoutes(user_id, job_function) {
    console.info('Not Ready yet..');
  }
}
