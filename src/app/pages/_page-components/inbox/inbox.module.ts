import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InboxRoutingModule } from './inbox-routing.module';
import { InboxComponent } from './inbox.component';
import { InboxIndexComponent } from './c/inbox-index.component';
import { ThemeModule } from '../../../@theme/theme.module';
import { DataTablesModule } from 'angular-datatables';
import { ToasterModule } from 'angular2-toaster';
import { InboxService } from '../../../services/inbox.service';
import { HeaderService } from '../../../services/header.service';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    InboxRoutingModule,
    DataTablesModule,
    ToasterModule.forRoot(),
  ],
  declarations: [
    InboxComponent,
    InboxIndexComponent,
  ],
  providers: [
    InboxService,
    HeaderService,
  ],
})
export class InboxModule {
}
