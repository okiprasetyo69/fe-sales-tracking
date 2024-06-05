import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {RequestOrderService} from '../../../../services/request-order.service';
import {datatable_configs} from '../../../../configs/configs';
import {MenuService} from '../../../../services/menu.service';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {ToasterService} from 'angular2-toaster';
import {TableData, TableDataInterface} from '../../../_shared-components/index-table/index-table.component';
import {ActionButton} from '../../../_shared-components/index-table/component/action-button/action-button.component';

@Component({
  selector: 'ngx-request-order-index',
  styleUrls: ['./request-order-index.component.scss'],
  templateUrl: './request-order-index.component.html',
})

export class RequestOrderIndexComponent implements OnInit, OnDestroy {
  tableData: TableData[] = [
    new TableData('Date', 'date', 'date'),
    new TableData('Branch', 'branch', 'user.branch_name'),
    new TableData('Division', 'division', 'user.division_name'),
    new TableData('No. Request Order', 'code', 'code'),
    new TableData('Customer', 'customer', 'customer.name'),
    new TableData('Sales Rep.', 'sales_rep', 'user.employee_name', null, {
      orderable: false,
      searchable: false,
    }),
    new TableData('Order Type', 'is_special_order', 'is_special_order', (x) => {
      let result = 'Reguler';
      if (x) {
        result = 'Special';
      }
      return result;
    }),
  ];

  view: ActionButton = new ActionButton('id');
  actionButton: ActionButton[] = [
    this.view,
  ];

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.view.output.subscribe((data) => {
      this.dataView(data);
    });
  }

  dataView(id) {
    this.router.navigate([`/pages/sales/activities/request_order/view/${id}`]).then();
  }

  ngOnDestroy() {
    //
  }
}
