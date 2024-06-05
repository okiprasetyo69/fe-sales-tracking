import { APP_INITIALIZER, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AuthPermissionService } from '../../services/auth-permission.service';
import { ToasterService } from 'angular2-toaster';
import { ActivatedRoute, Router } from '@angular/router';
import { OauthService } from '../../services/oauth.service';

// import { NgKeycloakService } from 'ng-keycloak';
// import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  returnUrl: string;
  myForm: FormGroup;
  isSubmitting: boolean = false;
  serverErrors = [];
  status_code = '';

  // keycloakConfig = {
  //   BASE_URL: '',
  //   realm: 'development',
  //   clientId: 'sibep',
  //   credentials: {
  //     secret: 'a41060dd-b5a8-472e-a91f-6a3ab0e04714'
  //   }
  // }

  // keycloakUsername;
  // keycloakPassword;

  constructor(
    private fb: FormBuilder,
    private authService: AuthPermissionService,
    private toasterService: ToasterService,
    private router: Router,
    private route: ActivatedRoute,
    private oauthService: OauthService,
    // private ngKeycloakService: NgKeycloakService
  ) {
  }

  ngOnInit(): void {
    // 
    // this.ngKeycloakService._setkeycloakConfig(this.keycloakConfig);
 
    // this.ngKeycloakService.logout().pipe().subscribe(logoutSuccessResponse => {
    //   console.log('Logout Success Response', logoutSuccessResponse);
    // }, (logoutErrorResponse) => {
    //   console.log('Logout Error', logoutErrorResponse);
    // });
 
    // this.ngKeycloakService.login(this.keycloakUsername, this.keycloakPassword).pipe().subscribe(loginSuccessResponse => {
    //   console.log('Login Success', loginSuccessResponse);
    // }, (loginErrorResponse) => {
    //   console.log('Login Error Response', loginErrorResponse);
    // });
 
    // this.ngKeycloakService.isLoggedIn().pipe().subscribe(loginStatusResponse => {
    //     console.log('Login Check Status', loginStatusResponse);
    // }, (loginStatusErrorResponse) => {
    //   console.log('Login Check Status Error', loginStatusErrorResponse);
    // });
    // 

    this.myForm = this.fb.group({
      username: [],
      password: [],
      type: 'web',
    });

    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'];
      if (!!params['status_code']) {
        this.toasterService.popAsync('warning', 'Unauthorized', 'Please login');
      }
    });
  }

  doLogin(formValue) {
    this.isSubmitting = true;
    this.serverErrors = [];
    this.authService.login(formValue).subscribe(resp => {
      // console.log(decodeURIComponent(this.returnUrl));
      console.info(resp.data);
      const username = resp.data.username;
      const email = resp.data.email;
      const name = resp.data.name;
      const id = resp.data.id;
      const branch_privilege_id = resp.data.branch_privilege_id;
      const division_privilege_id = resp.data.division_privilege_id;
      const is_supervisor_logistic = resp.data.is_supervisor_logistic;
      const is_supervisor_sales = resp.data.is_supervisor_sales;
      const is_collector_only = resp.data.is_collector_only;
      // 
      this.oauthService.saveProfile(username, email, name, id, branch_privilege_id, division_privilege_id, is_supervisor_logistic, is_supervisor_sales, is_collector_only);
      // 
      this.oauthService.saveToken(resp.data.jwt_access_token);
      this.myForm.reset('');
      this.isSubmitting = false;
      this.toasterService.popAsync('success', 'Success', 'Login success');
      setTimeout(() => {
        this.router.navigate([decodeURIComponent(this.returnUrl)]);
      }, 1000);
    }, errors => {
      // console.log(errors);
      // this.toasterService.pop('warning', 'Error', 'Please validate again before submitting this form');
      // this.makeToast();
      this.isSubmitting = false;
      let field;
      if (!!errors.error.data && errors.error.data.length) {
        // console.log(errors.error.data);
        this.toasterService.popAsync('warning', 'Error', 'Please make sure all data are valid');
        for (const error of errors.error.data) {
          field = error['field'];
          // console.log(field);
          this.serverErrors[field] = error['messages'];
        }
      } else {
        const errorMessage = errors.error.message;
        // console.log(errors);
        this.toasterService.popAsync('error', 'Error', errorMessage);
      }
    },
    );
  }

  doLogout() {
    this.oauthService.destroyToken();
  }

  // doLoginOIDC() {
  //   this.isSubmitting = true;
  //   this.serverErrors = [];
  //   this.authService.loginOIDC().subscribe(resp => {
  //     // console.log(decodeURIComponent(this.returnUrl));
  //     console.info(resp.data);
  //     // const username = resp.data.username;
  //     // const email = resp.data.email;
  //     // const name = resp.data.name;
  //     // const id = resp.data.id;
  //     // const branch_privilege_id = resp.data.branch_privilege_id;
  //     // const division_privilege_id = resp.data.division_privilege_id;
  //     // const is_supervisor_logistic = resp.data.is_supervisor_logistic;
  //     // const is_supervisor_sales = resp.data.is_supervisor_sales;
  //     // const is_collector_only = resp.data.is_collector_only;
  //     // 
  //     // this.oauthService.saveProfile(username, email, name, id, branch_privilege_id, division_privilege_id, is_supervisor_logistic, is_supervisor_sales, is_collector_only);
  //     // 
  //     // this.oauthService.saveToken(resp.data.jwt_access_token);
  //     this.myForm.reset('');
  //     this.isSubmitting = false;
  //     this.toasterService.popAsync('success', 'Success', 'Login success');
  //     setTimeout(() => {
  //       this.router.navigate([decodeURIComponent(this.returnUrl)]);
  //     }, 1000);
  //   }, errors => {
  //     // console.log(errors);
  //     // this.toasterService.pop('warning', 'Error', 'Please validate again before submitting this form');
  //     // this.makeToast();
  //     this.isSubmitting = false;
  //     let field;
  //     if (!!errors.error.data && errors.error.data.length) {
  //       // console.log(errors.error.data);
  //       this.toasterService.popAsync('warning', 'Error', 'Please make sure all data are valid');
  //       for (const error of errors.error.data) {
  //         field = error['field'];
  //         // console.log(field);
  //         this.serverErrors[field] = error['messages'];
  //       }
  //     } else {
  //       const errorMessage = errors.error.message;
  //       // console.log(errors);
  //       this.toasterService.popAsync('error', 'Error', errorMessage);
  //     }
  //   },
  //   );
  // }

}
