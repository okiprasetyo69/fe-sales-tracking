import {
  AfterContentInit,
  AfterViewInit,
  Component, EventEmitter,
  Input,
  OnInit, Output,
  Pipe,
  PipeTransform,
  ViewChild,
} from '@angular/core';
import { datatable_configs } from '../../../configs/configs';
import { ActivatedRoute } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { IndexTableService } from './index-table.service';
import { ToasterService } from 'angular2-toaster';
import { ActionButton } from './component/action-button/action-button.component';
import { Observable } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-index-table',
  templateUrl: './index-table.component.html',
  styleUrls: ['./index-table.component.scss'],
})
export class IndexTableComponent implements OnInit, AfterViewInit {

  ngAfterViewInit(): void {
    }
  @Input() tableData: TableDataInterface[] = [];
  @Input() endPoint: string = '';
  @Input() urlReplacement: string = '';
  @Input() withAction: boolean = false;
  @Input() withNumber: boolean = false;
  @Input() withApproval: boolean = false;
  @Input() actionButton: ActionButton[] = [];
  @Input() type: string;
  @Input() extraParams: Object;
  @Input() customFiler: boolean = false;
  @Input() customPageLength: boolean = false;
  @Output() allRecord: EventEmitter<any> = new EventEmitter();

  @ViewChild(DataTableDirective)
  dataTableDirective: DataTableDirective;

  dtOptions: any = {};
  tableValue: Array<any> = [];
  dtParams: any;
  page_start: number = datatable_configs.page_start;
  page_length: number = datatable_configs.page_length;
  page_search: string = datatable_configs.page_search;
  page_order_col: number = datatable_configs.page_order_col; // default sort by create date
  page_order_dir: string = datatable_configs.page_order_dir;
  startNumber: number = datatable_configs.page_start;

  date: Observable<any>;

  callbackData = {};
  column = [];

  dataFormFilter: FormGroup;
  typeData: string;


  constructor(
    private route: ActivatedRoute,
    private indexTableService: IndexTableService,
    private toasterService: ToasterService,
  ) {
  }

  ngOnInit() {
    if (this.type == null || typeof this.type == 'undefined') {
      this.typeData = 'sales';
    } else {
      this.typeData = this.type;
    }
    if (this.withNumber) {
      this.tableData.unshift({name: 'No', keyName: 'no', dataKey: 'no', orderable: false, searchable: false});
    }
    if (this.withAction) {
      this.tableData.push({
        name: 'Action',
        keyName: 'action',
        dataKey: 'action',
        orderable: false,
        searchable: false,
      });
    }
    // Mapping
    const tableData = this.tableData.map(x => {
      return {
        [x.keyName]: '',
      };
    });
    // Reduce to Object
    this.callbackData = tableData.reduce(function (result, item) {
      const key = Object.keys(item)[0];
      result[key] = item[key];
      return result;
    }, {});

    this.column = this.tableData.map(x => {
      return {
        data: x.keyName,
        orderable: x.orderable,
        searchable: x.searchable,
      };
    });

    this.route.queryParams.subscribe(params => {
      if (!!params.length) {
        this.page_start = +params['start'];
        this.page_length = +params['length'];
        this.page_search = params['search'];
        this.page_order_col = +params['order_col'];
        this.page_order_dir = params['order_dir'];
      }
      this.getDatatable();
    });
  }

  getDatatable() {
    let lengthMenu = (this.customPageLength) ? [[10, 100, 500, 1000, 2000], [10, 100, 500, 1000, 2000]] : [[10, 25, 50, 100], [10, 25, 50, 100]];
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: this.page_length,
      serverSide: true,
      searching: true,
      processing: true,
      displayStart: this.page_start,
      order: [[this.page_order_col, this.page_order_dir]],
      lengthMenu: lengthMenu,
      search: {search: this.page_search},
      ajax: (dataTablesParameters: any, callback) => {
        this.dtParams = dataTablesParameters;
        this.startNumber = this.dtParams['start'];
        this.indexTableService.indexDatatables(dataTablesParameters, this.endPoint, this.urlReplacement, this.dataFormFilter, this.extraParams, this.customFiler).pipe(untilDestroyed(this)).subscribe(resp => {
          this.tableValue = resp.data.data;
          this.allRecord.emit(this.tableValue);
          const dataExist = resp.data.total_filter != 0 && resp.data.total != 0;
          callback({
            recordsTotal: resp.data.total,
            recordsFiltered: resp.data.total_filter,
            data: dataExist ? [this.callbackData] : [],
          });
        }, errors => {
          const errorMessage = 'Something wrong with error: ' + errors.message + '. Error detail: ' + errors.error.message;
          console.info('Error ', errorMessage);
          this.toasterService.popAsync('error', 'Error', errorMessage);
        });
      },
      columns: this.column,
    };
  }

  reload() {
    this.dataTableDirective.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }
}

@Pipe({name: 'GetValue'})
export class GetValuePipe implements PipeTransform {
  transform(data: any, target: string, specialConversion: Function): any {
    const variableTarget = target.split('.');
    const statusNotFound = 'Not Found Object';
    let result = statusNotFound;
    if (variableTarget.length >= 1) {
      if (variableTarget[0] == 'all' || variableTarget[0] == '') {
        result = data;
      } else {
        let variableData: any = data[variableTarget[0]];
        for (let x = 1; x < variableTarget.length; x++) {
          variableData = variableData[variableTarget[x]];
        }
        result = variableData;
      }
    }
    if (result != statusNotFound) {
      if (specialConversion != null) {
        result = (typeof specialConversion(result) != 'undefined') ? specialConversion(result) : '';
      }
    }
    return result;
  }
}

export interface TableDataInterface {
  name: string;
  keyName: string;
  dataKey: string;
  orderable: boolean;
  searchable: boolean;
  specialConversion?: Function;
}

export class TableData implements TableDataInterface {
  dataKey: string;
  keyName: string;
  name: string;
  orderable: boolean = true;
  searchable: boolean = true;
  specialConversion: Function = null;


  constructor(name: string, keyName: string, dataKey: string, specialConversion: Function = null, other: { orderable: boolean, searchable: boolean } = null) {
    this.dataKey = dataKey;
    this.keyName = keyName;
    this.name = name;
    this.specialConversion = specialConversion;
    if (other != null) {
      this.orderable = (other.orderable == null) ? true : other.orderable;
      this.searchable = (other.searchable == null) ? true : other.searchable;
    }
  }

  setOrderable(status: boolean = true) {
    this.orderable = status;
  }

  setSearchable(status: boolean = true) {
    this.searchable = status;
  }
}
