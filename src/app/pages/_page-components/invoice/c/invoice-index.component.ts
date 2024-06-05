import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableData, TableDataInterface } from '../../../_shared-components/index-table/index-table.component';
import { ActionButton } from '../../../_shared-components/index-table/component/action-button/action-button.component';

@Component({
  selector: 'ngx-invoice-index',
  styleUrls: ['./invoice-index.component.scss'],
  templateUrl: './invoice-index.component.html',
})

export class InvoiceIndexComponent implements OnInit, OnDestroy {
  tableData: TableData[] = [
    new TableData('Date', 'invoice_date', 'invoice_date'),
    new TableData('Branch', 'branch_name', 'branch_name', null, {
      searchable: false,
      orderable: false,
    }),
    new TableData('Division', 'division_name', 'division_name', null, {
      searchable: false,
      orderable: false,
    }),
    new TableData('Customer', 'customer', 'customer.name'),
    new TableData('Customer Code', 'customer_code', 'customer_code'),
    new TableData('Invoice No.', 'code', 'code'),
    new TableData('Due Date', 'payment_due_date', 'payment_due_date', null, {
      searchable: false,
      orderable: false,
    }),
    new TableData('Status', 'status', 'status', null, {
      searchable: false,
      orderable: false,
    }),
    new TableData('Sales Rep', 'sales_rep', 'user', (data) => {
      let result = '---';
      if (!this.isEmpty(data)) {
        result = data['employee_name'];
      }
      return result;
    }, {
      orderable: false,
      searchable: false,
    }),
  ];


  isEmpty(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  view: ActionButton = new ActionButton('code');
  actionButton: ActionButton[] = [
    this.view,
  ];

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.view.output.subscribe((data) => {
      this.dataShow(data);
    });
  }

  dataShow(id) {
    this.router.navigate([`/pages/collector/activities/invoice/view/${id}`]).then();
  }

  ngOnDestroy() {
    //
  }
}
