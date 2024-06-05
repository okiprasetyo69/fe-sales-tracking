import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster/src/toaster.service';
import { MenuService } from '../../../../services/menu.service';
import { AlertService } from '../../../../services/alert.service';
import { HeaderService } from '../../../../services/header.service';
import { IndexTableComponent, TableData } from '../../../_shared-components/index-table/index-table.component';

@Component({
  selector: 'ngx-alert-index',
  templateUrl: './alert-index.component.html',
  styleUrls: ['./alert-index.component.scss'],
})
export class AlertIndexComponent implements OnInit, OnDestroy {
  @ViewChild(IndexTableComponent)
  indexTable: IndexTableComponent;

  tableData: TableData[] = [];

  module: string;

  extraParams: Object;
  connectionSocket;

  constructor(
    private alertService: AlertService,
    private router: Router,
    private toasterService: ToasterService,
    private route: ActivatedRoute,
    private menuService: MenuService,
    private headerService: HeaderService,
  ) {
  }

  ngOnInit() {
    this.menuService.getMenuReloaded(this.route.snapshot.data['route_code']);
    this.module = this.route.snapshot.data['module'];
    this.extraParams = {
      category: 'alert',
      job_category: this.module,
    };

    this.tableData = [
      new TableData('Date', 'date', 'date'),
      new TableData('User', 'user_name', 'create_user.name', null, {
        searchable: false,
        orderable: false,
      }),
      new TableData('Branch', 'branch_name', 'create_user.branch_name', null, {
        searchable: false,
        orderable: false,
      }),
    ];

    if (this.module != 'logistic') {
      this.tableData.push(new TableData('Division', 'division_name', 'create_user.division_name', null, {
        searchable: false,
        orderable: false,
      }));
    }
    this.tableData.push(new TableData('Description', 'description', 'notes'));
    this.connectionSocket = this.headerService.getInbox()
      .subscribe(() => {
        this.indexTable.dataTableDirective.dtInstance.then((dtInstance: DataTables.Api) => {
          // Destroy the table first
          dtInstance.draw();
        });
      });
  }

  ngOnDestroy(): void {
    this.connectionSocket.unsubscribe();
  }

}
