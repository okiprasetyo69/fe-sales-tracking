import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthPermissionService } from '../services/auth-permission.service';
import { MenuService } from '../services/menu.service';

@Injectable()
export class AuthPermissionGuard implements CanActivateChild {

  constructor(
    private authPermissionService: AuthPermissionService,
    private router: Router,
    private menuService: MenuService,
  ) { }

  canActivateChild (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    // should wait http request
    return this.getPermission(next, state).then(data => {
      // console.log(data);
      return data;
    })
  }

  getPermission(next, state) {
    // should return promise, so other function can await for this result (resolve)
    return new Promise(resolve => {
      this.authPermissionService.checkPermission(next.data)
        .subscribe(resp => {
          // data.method can be look up on xxx-routing.module.ts
          if (resp.data[next.data.method] == 0) {
            // do not have permission;
            this.router.navigate(['pages/error_page'], { queryParams: {
              error_type: 'permission',
              method: next.data.method,
              feature: next.data.feature,
            }});
            resolve(false);
          } else {
            resolve(true);
          }
        }, errors => {
          // console.log(errors.error.status_code);
          this.router.navigate(['auth/login'], { queryParams: { returnUrl: state.url, status_code: errors.error.status_code }});
          resolve(false);
        });
    });
  }
}
