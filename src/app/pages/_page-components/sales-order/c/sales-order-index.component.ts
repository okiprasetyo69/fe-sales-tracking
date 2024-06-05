import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableData } from '../../../_shared-components/index-table/index-table.component';
import { ActionButton } from '../../../_shared-components/index-table/component/action-button/action-button.component';

@Component({
    selector: 'ngx-sales-order-index',
    styleUrls: ['./sales-order-index.component.scss'],
    templateUrl: './sales-order-index.component.html',
})

export class SalesOrderIndexComponent implements OnInit, OnDestroy {
    endPoint: string = '/sales/order';
    replacement: string = '/pages/sales/activities/sales_order/index/page';
    tableData: TableData[] = [
        new TableData('Date', 'create_date', 'create_date'),
        new TableData('Branch', 'branch', 'all', (x) => {
            if (typeof x['user']['branch_name'] != 'undefined') {
                return x['user']['branch_name'];
            } else {
                return 'Sales code ' + x['user_code'] + ' not found';
            }
        }),
        new TableData('Division', 'division', 'all', (x) => {
            if (typeof x['user']['division_name'] != 'undefined') {
                return x['user']['division_name'];
            } else {
                return 'Sales code ' + x['user_code'] + ' not found';
            }
        }),
        new TableData('No. Sales Order', 'code', 'code'),
        new TableData('Customer', 'customer', 'customer.name'),
        new TableData('Invoice Amount', 'invoice_amount', 'invoice_amount'),
        new TableData('Sales Rep.', 'sales_rep', 'all', (x) => {
            if (typeof x['user']['employee_name'] != 'undefined') {
                return x['user']['employee_name'];
            } else {
                return 'Sales code ' + x['user_code'] + ' not found';
            }
        }),
        new TableData('Last Status Order', 'status', 'all', (x) => {
            return 'Open Order';
        }),
    ];

    view = new ActionButton('code');
    actionButton: ActionButton[] = [
        this.view,
    ];

    constructor(
        private router: Router,
    ) {
    }

    ngOnInit() {
    }

    // getIndex() {
    //   this.salesOrderService.index()
    //     .subscribe(resp => {
    //       this.datasets = resp.data;
    //     });
    // }

    dataView(code) {
        this.router.navigate([`/pages/sales/activities/sales_order/view/${code}`]).then();
    }

    ngOnDestroy() {
        //
    }
}
