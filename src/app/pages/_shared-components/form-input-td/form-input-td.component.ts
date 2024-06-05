import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { environment } from '../../../../environments/environment';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';

@Component({
  selector: 'ngx-form-input-td',
  templateUrl: './form-input-td.component.html',
  styleUrls: ['./form-input-td.component.scss'],
})

// td is Template Driven

export class FormInputTdComponent implements OnInit {
  @Input() error: any;
  @Input() id: string;
  @Input() field: string;
  @Input() label: string;
  @Input() dataForm: any;
  @Input() dataSelect: any;
  @Input() dataSelectKey: string;
  @Input() dataSelectVal: string;
  @Input() disabled: boolean;
  @Input() type: string;
  @Input() modelName: any;
  @Input() arrayForm: any;
  @Input() isCycle = false;
  @Input() isView: boolean = false;

  // For Server Side Combobox
  @Input() ajaxSelect = false;
  @Input() showLoading = false;
  @Output() actionOpen: EventEmitter<any> = new EventEmitter();
  @Output() actionChange: EventEmitter<any> = new EventEmitter();

  public loadingDropdownDestination = true;
  public dataDropdownDestination = [];

  env = environment;

  private start_date: any = {
    // @ts-ignore
    year: new Date().getFullYear(),
    // @ts-ignore
    month: new Date().getMonth() + 1,
    // @ts-ignore
    day: new Date().getDate() - 1,
  };

  dateConfiguration: INgxMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
    appendSelectorToBody: true,
    disableUntil: this.start_date,
  };

  constructor(
    private customerService: CustomerService,
  ) {
  }

  ngOnInit() {
    if (this.type === 'select-destination-customer') {
      this.customerService.index_dropdown().subscribe(res => {
        this.dataDropdownDestination = res.data.data;
        this.loadingDropdownDestination = false;
      });
    }
  }

  openAction() {
    console.info('Triggered On Form TD Open');
    if (this.actionOpen != null) {
      this.actionOpen.emit();
    }
  }

  changeAction() {
    console.info('Triggered On Form TD Change');
    if (this.actionChange != null) {
      this.actionChange.emit();
    }
  }

  // Only For Destination Dropdown
  openDropdownDestination() {
    this.loadingDropdownDestination = true;
    this.customerService.index_dropdown().subscribe(res => {
      this.dataDropdownDestination = res.data.data;
      this.loadingDropdownDestination = false;
    });
  }

  // Function for multi select
  selectAll() {
    this.arrayForm[this.field] = this.dataSelect.map(x => x[this.dataSelectKey]);
  }

  unselectAll() {
    this.arrayForm[this.field] = null;
  }

  // For Type Date
  onDateChanged(event: IMyDateModel) {
    if (event.epoc == 0) {
      this.arrayForm[this.field] = null;
    } else {
      this.arrayForm[this.field] = event.formatted;
    }
  }
}
