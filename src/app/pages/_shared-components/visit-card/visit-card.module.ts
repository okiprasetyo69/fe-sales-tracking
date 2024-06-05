import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerName, VisitCardComponent } from './visit-card.component';
import { VisitCardItemComponent } from './c/visit-card-item.component';
import { VisitCardService } from './visit-card.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    VisitCardComponent,
  ],
  declarations: [VisitCardComponent, VisitCardItemComponent, CustomerName],
  providers: [
    VisitCardService,
  ],
})
export class VisitCardModule {
}
