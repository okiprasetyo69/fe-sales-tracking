import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LivemapRoutingModule, routedComponents } from './livemap-routing.module';
import { LivemapService } from '../../services/livemap.service';

@NgModule({
  imports: [
    CommonModule,
    LivemapRoutingModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    LivemapService,
  ],
})
export class LivemapModule { }
