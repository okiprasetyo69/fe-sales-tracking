import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from '../../../../services/payment.service';
import { TableData } from '../../../_shared-components/index-table/index-table.component';
import { ActionButton } from '../../../_shared-components/index-table/component/action-button/action-button.component';

@Component({
    selector: 'ngx-payment-confirmation-index',
    templateUrl: './payment-confirmation-index.component.html',
    styleUrls: ['./payment-confirmation-index.component.scss'],
})
export class PaymentConfirmationIndexComponent implements OnInit, OnDestroy {
    endPoint: string = '/sales/payment/mobile';
    replacement: string = '/pages/sales/activities/payment/index/page';
    tableData: TableData[] = [
        new TableData('Payment Date', 'payment_date', 'payment_date'),
        new TableData('Payment No', 'code', 'code'),
        new TableData('Customer Code', 'customer_code', 'customer_code'),
        new TableData('Branch', 'branch', 'user.branch_name'),
        new TableData('Division', 'division', 'user.division_name', null, {
          searchable: false,
          orderable: false,
        }),
        new TableData('Sales Rep.', 'name', 'user.employee_name'),
        new TableData('Status', 'status', 'payment_status', null, {
          searchable: false,
          orderable: false,
        }),
    ];

    view = new ActionButton('id');
    actionButton: ActionButton[] = [
        this.view,
    ];

    constructor(
        private paymentService: PaymentService,
        private router: Router,
    ) {
    }

    ngOnInit() {
        this.view.output.subscribe((data) => {
            this.dataShow(data);
        });
    }


    dataShow(id) {
        this.router.navigate([`/pages/sales/activities/payment/view/confirmation/${id}`]).then();
    }

    goToReceiptChecker() {
        this.router.navigate([`/pages/sales/activities/payment/receipt_checker/index`]).then();
    }

    ngOnDestroy() {
        //
    }
}
