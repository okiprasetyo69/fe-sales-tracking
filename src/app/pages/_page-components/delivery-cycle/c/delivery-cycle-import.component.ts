import { Component, OnInit } from '@angular/core';
import { DeliveryCycleService } from '../../../../services/delivery-cycle.service';

@Component({
  selector: 'ngx-delivery-cycle-import',
  templateUrl: './delivery-cycle-import.component.html',
  styleUrls: ['./delivery-cycle-import.component.scss'],
})
export class DeliveryCycleImportComponent implements OnInit {

  constructor(
    public deliveryCycleService: DeliveryCycleService,
  ) { }

  ngOnInit() {
  }

}
