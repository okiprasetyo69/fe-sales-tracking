import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PackingSlipService } from '../../../../services/packing-slip.service';
import { MenuService } from '../../../../services/menu.service';
import { ToasterService } from 'angular2-toaster';
import { TableData } from "../../../_shared-components/index-table/index-table.component";
import { ActionButton } from "../../../_shared-components/index-table/component/action-button/action-button.component";

@Component({
  selector: 'ngx-packing-slip-index',
  styleUrls: ['./packing-slip-index.component.scss'],
  templateUrl: './packing-slip-index.component.html',
})

export class PackingSlipIndexComponent implements OnInit, OnDestroy {

  tableData: TableData[] = [
    new TableData('Date', 'date', 'date'),
    new TableData('Branch', 'branch_name', 'branch_name', null, {
      searchable: false,
      orderable: false,
    }),
    new TableData('Packing Slip No', 'code', 'code'),
    new TableData('Customer.', 'customer', 'all', (data) => {
      return data.customer.name + " - " + data.customer_code;
    }),
    new TableData('Status', 'status', 'status', null, {
      searchable: false,
      orderable: false,
    }),
    new TableData('Driver.', 'driver', 'user.employee_name', null, {
      searchable: false,
      orderable: false,
    }),
  ];

  view: ActionButton = new ActionButton('code');
  actionButton: ActionButton[] = [
    this.view,
  ];

  constructor(
    private packService: PackingSlipService,
    private router: Router,
    private route: ActivatedRoute,
    private menuService: MenuService,
    private toasterService: ToasterService,
  ) {
  }

  ngOnInit() {
    this.view.output.subscribe((code) => {
      this.dataShow(code);
    });
  }

  dataShow(id) {
    this.router.navigate([`/pages/logistic/activities/packing_slip/view/${id}`]).then();
  }

  ngOnDestroy() {
    //
  }
}
