import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';
import { environment } from '../../../../environments/environment';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'ngx-form-input-md',
  templateUrl: './form-input-md.component.html',
  styleUrls: ['./form-input-md.component.scss'],
})

// md is Model Driven
export class FormInputMdComponent implements OnInit {
  @Input() error?: any = [];
  @Input() id: string;
  @Input() field: string;
  @Input() label: string;
  @Input() dataForm: any;
  @Input() group: any;
  @Input() dataSelect: any;
  @Input() dataSelectKey: string;
  @Input() dataSelectLabel: string;
  @Input() disabled: boolean;
  @Input() type: string;
  @Input() isError: boolean = false;
  @Input() errorMessage: string;
  @Input() isView: boolean = false;

  // For Server Side Combobox
  @Input() ajaxSelect = false;
  @Input() showLoading = false;
  @Output() actionOpen: EventEmitter<any> = new EventEmitter();
  @Output() actionChange: EventEmitter<any> = new EventEmitter();
  @Output() customerVariable: EventEmitter<any> = new EventEmitter<any>();

  @Input() check = false;
  @Output() checkboxChange: EventEmitter<boolean> = new EventEmitter();

  loadingDropdownDestination: boolean = false;
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

  customerInput$ = new Subject<any>();
  dataCustomerSearch: Array<any> = [];


  constructor(
    private customerService: CustomerService,
  ) {
  }

  ngOnInit() {
    this.loadCustomerSearch();

    if (this.type === 'select-destination-customer') {
      // this.customerService.index_dropdown().subscribe(res => {
      //   this.dataDropdownDestination = res.data.data;
      //   this.loadingDropdownDestination = false;
      // });
    }
  }

  openAction() {
    console.info('Triggered On Form MD');
    if (this.actionOpen != null) {
      this.actionOpen.emit();
    }
  }

  changeAction() {
    console.info('Triggered On Form MD Change');
    if (this.actionChange != null) {
      this.actionChange.emit();
    }
  }

  // Only For Destination Dropdown
  openDropdownDestination() {
    this.loadingDropdownDestination = true;
    this.dataDropdownDestination = [];
    this.customerService.index_dropdown().subscribe(res => {
      this.dataDropdownDestination = res.data.data;
      if (this.customerVariable != null) {
        this.customerVariable.emit(res.data.data);
      }
      this.loadingDropdownDestination = false;
    });
  }

  setCheckBoxChange() {
    this.check = !this.check;
    this.checkboxChange.emit(this.check);
  }

  private loadCustomerSearch() {
    this.customerInput$.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      tap(() => this.loadingDropdownDestination = true),
    ).subscribe(value => {
      // console.info('subscribe customerinput value', value);
      // this.customer$ = this.userService.dropdown_customer_searchable_s(value);
      this.customerService.dropdown_customer_searchable(value).subscribe(res => {
        // console.info('result dari term', res);
        this.dataCustomerSearch = res.data.data;
        if (this.customerVariable != null) {
          this.customerVariable.emit(res.data.data);
        }
        this.loadingDropdownDestination = false;
      }, () => {
        // const errorMessage = 'Something wrong with error: ' +
        //   errors.message + '. Error detail: ' + errors.error.message;
        // // console.log(errors);
        this.loadingDropdownDestination = false;
      })
    });
  }

  // Function for multi select
  selectAll() {
    const value = {};
    value[this.field] = this.dataSelect.map(x => x[this.dataSelectKey]);
    this.group.patchValue(value);
  }

  unselectAll() {
    const value = {};
    value[this.field] = null;
    this.group.patchValue(value);
  }

  // For Type Date
  onDateChanged(event: IMyDateModel) {
    const value = {};
    console.info("Tanggalnya ", event);
    if (event.epoc == 0) {
      value[this.field] = null;
    } else {
      value[this.field] = event.formatted;
    }
    this.group.patchValue(value);
  }
}
