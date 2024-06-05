import { FormBuilder, FormGroup } from '@angular/forms';

export interface Employee {
  /**
   * Key ini menentukan siapa yang telah meng approve Employee
   */
  approval_by: number;

  /**
   * Key ini memberikan id siapa yang membuat Employee
   */
  create_by: number;

  /**
   * Key ini menentukan kapan Employee dibuat
   */
  create_date: string;

  /**
   * Tidak diberi keterangan
   */
  edit_data?: any;

  /**
   * Key ini memberikan informasi berupa email mengenai Employee
   */
  email: string;

  /**
   * ID milik Employee
   */
  id: number;

  /**
   * Tidak diberi keterangan
   */
  is_approval: number;

  /**
   * Tidak diberi keterangan
   */
  is_delete_approval: number;

  /**
   * Tidak diberi keterangan
   */
  is_delete_approval_by?: any;

  /**
   * Tidak diberi keterangan
   */
  is_delete_count: number;

  /**
   * Tidak diberi keterangan
   */
  is_deleted: number;

  /**
   * Tidak diberi keterangan
   */
  is_supervisor_logistic: number;

  /**
   * Tidak diberi keterangan
   */
  is_supervisor_sales: number;

  /**
   * Key ini akan memberikan return berupan String dengan data antara `sales`,'driver` dan `crew`
   */
  job_function: string;

  /**
   * Nama dari Employee
   */
  name: string;

  /**
   * Nomor Induk Employee
   */
  nip: string;

  /**
   * Nomor Telephone Employee
   */
  phone: string;

  /**
   * Tidak diberi keterangan
   */
  update_date: string;
}

export interface CollectorInterface {
  label: String;
  value: number;
}

export interface CollectorEmployeeSales {
  /**
   * Is Can Collect akan memberikan return berupa 0 atau 1 dari backend
   * yang menentukan apakah sales tersebut dapat meng collect invoice atau tidak
   */
  is_can_collect: number;

  /**
   * Is Collector Only akan memberikan return berupa 0 atau 1 dari backend
   */
  is_collector_only: number;
}

export interface EmployeeSales extends Employee, CollectorEmployeeSales {
}

export class Collector implements CollectorInterface, CollectorEmployeeSales {
  label: String;
  value: number;

  is_can_collect: number;
  is_collector_only: number;

  constructor(label: String, value: number, is_can_collect: number, is_collector_only: number) {
    this.label = label;
    this.value = value;
    this.is_can_collect = is_can_collect;
    this.is_collector_only = is_collector_only;
  }

  static CAN_COLLECT(): Collector {
    return new this(
      'Can Collect', 1, 1, 0,
    );
  }

  static COLLECTOR_ONLY(): Collector {
    return new this(
      'Collector Only', 2, 0, 1,
    );
  }

  static NO_BOTH(): Collector {
    return new this(
      'No Both', 3, 0, 0,
    );
  }

  static fromEmployeeSales(employeeSales: EmployeeSales): Collector {
    let collectorReturn: Collector = this.NO_BOTH();
    if (employeeSales.is_collector_only == 1 && employeeSales.is_can_collect == 0) {
      collectorReturn = this.COLLECTOR_ONLY();
    } else if (employeeSales.is_collector_only == 0 && employeeSales.is_can_collect == 1) {
      collectorReturn = this.CAN_COLLECT()
    } else {
      collectorReturn = this.NO_BOTH();
    }
    return collectorReturn;
  }

  static toEmployeeSalesObject(id: number): CollectorEmployeeSales {
    let employeeSalesData: CollectorEmployeeSales = {
      is_can_collect: 0,
      is_collector_only: 0,
    };

    CollectorData.forEach((collector) => {
      if (collector.value == id) {
        employeeSalesData.is_can_collect = collector.is_can_collect;
        employeeSalesData.is_collector_only = collector.is_collector_only
      }
    });
    return employeeSalesData;
  }

  usingInvoice(): boolean {
    let useInvoice: boolean = false;
    if (this.is_collector_only != 0 || this.is_can_collect != 0) {
      useInvoice = true;
    }
    return useInvoice;
  }
}

export const CollectorData: Collector[] = [
  Collector.COLLECTOR_ONLY(),
];

export const SalesData: Collector[] = [
  Collector.CAN_COLLECT(),
  Collector.NO_BOTH(),
];

// Class Pembantu

export class EmployeeSalesClass implements EmployeeSales {
  approval_by: number;
  create_by: number;
  create_date: string;
  edit_data: any;
  email: string;
  id: number;
  is_approval: number;
  is_can_collect: number;
  is_collector_only: number;
  is_delete_approval: number;
  is_delete_approval_by: any;
  is_delete_count: number;
  is_deleted: number;
  is_supervisor_logistic: number = 0;
  is_supervisor_sales: number = 0;
  job_function: string;
  name: string;
  nip: string;
  phone: string;
  update_date: string;

  isView: boolean;

  protected formBuilder: FormBuilder = new FormBuilder();

  constructor(employeeSales: EmployeeSales, isView: boolean = false) {
    this.approval_by = employeeSales.approval_by;
    this.create_date = employeeSales.create_date;
    this.edit_data = employeeSales.edit_data;
    this.email = employeeSales.email;
    this.id = employeeSales.id;
    this.is_approval = employeeSales.is_approval;
    this.is_can_collect = employeeSales.is_can_collect;
    this.is_collector_only = employeeSales.is_collector_only;
    this.is_delete_approval = employeeSales.is_delete_approval;
    this.is_delete_approval_by = employeeSales.is_delete_approval_by;
    this.is_delete_count = employeeSales.is_delete_count;
    this.is_deleted = employeeSales.is_deleted;
    this.is_supervisor_logistic = employeeSales.is_supervisor_logistic;
    this.is_supervisor_sales = employeeSales.is_supervisor_sales;
    this.job_function = employeeSales.job_function;
    this.name = employeeSales.name;
    this.nip = employeeSales.nip;
    this.phone = employeeSales.phone;
    this.update_date = employeeSales.update_date;
    this.isView = isView;
  }

  static initialData(isView: boolean): EmployeeSalesClass {
    return new EmployeeSalesClass(new class implements EmployeeSales {
        approval_by: number;
        create_by: number;
        create_date: string;
        edit_data: any;
        email: string;
        id: number;
        is_approval: number;
        is_can_collect: number;
        is_collector_only: number;
        is_delete_approval: number;
        is_delete_approval_by: any;
        is_delete_count: number;
        is_deleted: number;
        is_supervisor_logistic: number;
        is_supervisor_sales: number;
        job_function: string;
        name: string;
        nip: string;
        phone: string;
        update_date: string;
      },
      isView);
  }


  toFormGroup(): FormGroup {
    return this.formBuilder.group({
      nip: [{value: this.nip, disabled: this.isView}],
      name: [{value: this.name, disabled: this.isView}],
      job_function: [{value: this.job_function, disabled: this.isView}],
      is_supervisor_sales: [{value: this.is_supervisor_sales, disabled: this.isView}],
      is_supervisor_logistic: [{value: this.is_supervisor_logistic, disabled: this.isView}],
      phone: [{value: this.phone, disabled: this.isView}],
      email: [{value: this.email, disabled: this.isView}],
      is_collector_only: [{value: this.is_collector_only, disabled: this.isView}],
      is_can_collect: [{value: this.is_can_collect, disabled: this.isView}],
    });
  }

  toFormGroupSupervisor(): FormGroup {
    return this.formBuilder.group({
      is_supervisor_sales: this.is_supervisor_sales,
      is_supervisor_logistic: this.is_supervisor_logistic,
    });
  }

  toCollectorFormGroup(): FormGroup {
    let collector: Collector = Collector.fromEmployeeSales(this);
    return this.formBuilder.group({
      collector: collector.value,
    });
  }
}
