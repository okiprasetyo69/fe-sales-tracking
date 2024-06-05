import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster/src/toaster.service';
import { MenuService } from '../../../../services/menu.service';
import { PermissionService } from '../../../../services/permission.service';
import { Location } from '@angular/common';
import { HeaderService } from '../../../../services/header.service';
import { IndexTableComponent, TableData } from "../../../_shared-components/index-table/index-table.component";
import { ActionButton } from "../../../_shared-components/index-table/component/action-button/action-button.component";
import { setUpperCase } from "../../../../helper/ExtraFunction";

@Component({
  selector: 'ngx-permission-index',
  templateUrl: './permission-index.component.html',
  styleUrls: ['./permission-index.component.scss'],
})
export class PermissionIndexComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(IndexTableComponent)
  indexTable: IndexTableComponent;

  tableData: TableData[] = [
    new TableData('Date', 'date', 'date'),
    new TableData('Permission Type.', 'type', 'type', (data) => {
      let name = data.replace("_", " ");
      return setUpperCase(name);
    }),
    new TableData('User', 'create_by', 'create_user.name'),
    new TableData('Branch', 'branch_name', 'create_user.branch_name', null, {
      searchable: false,
      orderable: false,
    }),
    new TableData('Division', 'division_name', 'create_user.division_name', null, {
      searchable: false,
      orderable: false,
    }),
    new TableData('Description.', 'description', 'all', (data) => {
      return data.subject + ' ' + (data.notes ? '-' + data.notes : '');
    }),
    new TableData('Location', 'customer', 'customer', (data) => {
      if (data == null) {
        return "--";
      } else {
        return data.name;
      }
    }, {
      orderable: false,
      searchable: false,
    }),
    new TableData('Status', 'status', 'all', (data) => {
        if (data.is_approved != 1 && data.is_rejected != 1) {
          return "Pending";
        } else if (data.is_approved == 1 && data.is_rejected != 1) {
          return "Confirmed";
        } else if (data.is_approved != 1 && data.is_rejected == 1) {
          return "Rejected";
        }
      },
      {
        orderable: false,
        searchable: false,
      }),
  ];

  view: ActionButton = new ActionButton('id');
  actionButton: ActionButton[] = [
    this.view,
  ];

  extraParams: Object;

  // feature: string;
  module: string;
  connectionSocket;

  constructor(
    private permAlertService: PermissionService,
    private router: Router,
    private toasterService: ToasterService,
    private route: ActivatedRoute,
    private menuService: MenuService,
    private location: Location,
    private headerService: HeaderService,
  ) {
  }

  ngAfterViewInit() {
  }

  ngOnInit() {
    this.view.output.subscribe((id) => {
      this.dataShow(id);
    });
    this.menuService.getMenuReloaded(this.route.snapshot.data['route_code']);
    this.module = this.route.snapshot.data['module'];
    console.info(this.module);
    this.extraParams = {
      category: "permission",
      job_category: this.module,
    };

    this.connectionSocket = this.headerService.getInbox().subscribe(notif => {
      this.indexTable.dataTableDirective.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.draw();
      });
    });
  }

  ngOnDestroy() {
    this.connectionSocket.unsubscribe();
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  dataShow(id) {
    this.router.navigate([`/pages/permission/${this.module}/show/${id}`]).then();
  }

}
