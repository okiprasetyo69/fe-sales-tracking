import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../../services/customer.service';

@Component({
  selector: 'ngx-customers-import',
  templateUrl: './customers-import.component.html',
  styleUrls: ['./customers-import.component.scss'],
})
export class CustomersImportComponent implements OnInit {
  constructor(
    public customerService: CustomerService,
  ) {
  }

  ngOnInit() {
  }

}
