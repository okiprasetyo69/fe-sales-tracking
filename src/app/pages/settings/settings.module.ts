import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { TitleCasePipe } from '@angular/common';

import { SettingsRoutingModule, routedComponents } from './settings-routing.module';
import { UserGroupService } from '../../services/user-group.service';
import { UserService } from '../../services/user.service';
import { BranchService } from '../../services/branch.service';
import { DivisionsService } from '../../services/divisions.service';
import { SettingNotificationsService } from '../../services/setting-notifications.service';
import { ConfigurationsGeneralService } from '../../services/configurations-general.service';
import { EmployeeService } from '../../services/employee.service';
import { AssetService } from '../../services/asset.service';
import { CompanyService } from '../../services/company.service';
import { AreaService } from '../../services/area.service';
import { CustomerService } from '../../services/customer.service';
// import { AuthPermissionService } from '../../services/auth-permission.service';
// import { AgmCoreModule } from '@agm/core';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
// import { TextMaskModule } from 'angular2-text-mask';
// import { InlineEditorModule } from '@qontu/ngx-inline-editor';
// import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [
    ThemeModule,
    SettingsRoutingModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyA43tzA95U9pmSDcnaFQcRQxBGyz-8qvSc',
    //   libraries: ['places'],
    // }),
    // FormsModule,
    // ReactiveFormsModule,
    // ScrollToModule.forRoot(),
    // TextMaskModule,
    // InlineEditorModule,
    // DataTablesModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    UserGroupService,
    UserService,
    EmployeeService,
    BranchService,
    DivisionsService,
    AssetService,
    UserGroupService,
    SettingNotificationsService,
    TitleCasePipe,
    DivisionsService,
    ConfigurationsGeneralService,
    CompanyService,
    AreaService,
    CustomerService,
  ],
})
export class SettingsModule { }
