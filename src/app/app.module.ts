/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from './services/api.service';
import { OauthService } from './services/oauth.service';
import { MenuService } from './services/menu.service';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { AuthPermissionGuard } from './guards/auth-permission.guard';
import { AuthPermissionService } from './services/auth-permission.service';
import { LoginComponent } from './auth/login/login.component';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { StateService } from './@core/data/state.service';
import { HeaderService } from './services/header.service';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { HelperModule } from './helper/helper.module';

// import { NgKeycloakModule } from 'ng-keycloak';
// import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

// function initializeKeycloak(keycloak: KeycloakService){
//   return () =>
//     keycloak.init({
//       config:{
//         url: 'http://3.0.51.189:8080/auth',
//         realm: 'development',
//         clientId: 'a41060dd-b5a8-472e-a91f-6a3ab0e04714'
//       },
//       initOptions:{
//         onLoad: 'check-sso',
//         silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
//       }
//     })
// }

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    ToasterModule.forRoot(),
    LoadingBarRouterModule,
    PerfectScrollbarModule,
    HelperModule.forRoot(),
    // KeycloakAngularModule
  ],
  bootstrap: [AppComponent],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'},
    ApiService,
    OauthService,
    MenuService,
    AuthPermissionService,
    AuthPermissionGuard,
    ToasterService,
    StateService,
    HeaderService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initializeKeycloak,
    //   multi: true,
    //   deps:[KeycloakService]
    // },
  ],
})
export class AppModule {
}
