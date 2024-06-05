/**
 * Configuration for default value used on datatables
 * @type {{page_start: number; page_length: number; page_search: string; page_order_col: number; page_order_dir: string}}
 */
export const CompanyLevel = 'PT';
export const CompanyNameFull = 'Cisangkan';
export const CompanyNameShort = 'cisangkan';

export const datatable_configs = {
  page_start: 0,
  page_length: 10,
  page_search: '',
  page_order_col: 1,
  page_order_dir: 'desc',
};

let idPermission = -1;

function setAutoIdPermission(): number {
  idPermission += 1;
  return idPermission;
};

interface PermissionInterface {
  id?: number;
  name: string;
  entity: string;
  parent_data?: PermissionInterface;
  hidden?: boolean;
}

export interface PermissionInterfaceData extends PermissionInterface {
  indent: number,
  parent: number,
}

export class Permission implements PermissionInterfaceData {
  entity: string;
  name: string;
  id: number;
  indent: number;
  parent: number;

  // Permission Parent
  parent_data: PermissionInterface;

  constructor(data: PermissionInterface) {
    this.entity = data.entity;
    // Otomatis Set ID
    this.id = (data.id != null) ? data.id : setAutoIdPermission();
    this.name = data.name;
    // Otomatis Mendapatkan ID Parent
    this.parent = (data.parent_data != null) ? data.parent_data.id : 0;
    // Mendapatkan Objek Parent
    this.parent_data = (data.parent_data != null) ? data.parent_data : null;

    // Auto Set Indent By Parent
    let position = 0;
    let parentData = this.parent_data;
    while (parentData != null) {
      position += 1;
      if (typeof parentData.parent_data != 'undefined') {
        parentData = parentData.parent_data;
      }
    }
    this.indent = position;
  }

  getIndentPosition(): number {
    return this.indent;
  }

  getHierarchy(): Array<string> {
    let hierarchy = [];
    let parentData = this.parent_data;
    hierarchy.push(this.entity);
    while (parentData != null) {
      hierarchy.push('data');
      hierarchy.push(parentData.entity);
      if (typeof parentData.parent_data != 'undefined') {
        parentData = parentData.parent_data;
      }
    }
    return hierarchy.reverse();
  }

  indexAtHierarchy(index: number): string {
    const hierarchy = this.getHierarchy();
    if (index >= hierarchy.length) {
      return '';
    } else {
      return hierarchy[index];
    }
  }

  getRuleView(permissionTable): number {
    let result = -1;
    let hierarchy = this.getHierarchy();
    hierarchy.push('rule-view');
    let counting = 0;
    let currentSearch = null;
    for (let x of hierarchy) {
      if (typeof permissionTable[x] != 'undefined' && currentSearch == null) {
        currentSearch = permissionTable[x];
        counting += 1;
      } else {
        if (typeof currentSearch[x] != 'undefined') {
          currentSearch = currentSearch[x];
          counting += 1;
        }
      }
      if (hierarchy.length == counting) {
        result = currentSearch;
      }
    }
    return result;
  }

  getNgModelName(variableName: string, keyName: string): string {
    let name = variableName;
    let hierarchy = this.getHierarchy();
    hierarchy.push(keyName);
    for (let x of hierarchy) {
      name += `[${x}]`;
    }
    return name;
  }
}

const PermissionDashboard: Permission = new Permission({
  name: 'Dashboard',
  entity: 'dashboard',
});

const PermissionLiveMap: Permission = new Permission({
  name: 'Livemap',
  entity: 'livemap',
});

const PermissionSalesParent: Permission = new Permission({
  name: 'Sales',
  entity: 'sales',
});

const PermissionSalesData: Permission = new Permission({
  name: 'Sales > Data',
  entity: 'sales-data',
  parent_data: PermissionSalesParent,
});

const PermissionSalesActivities: Permission = new Permission({
  name: 'Sales > Activities',
  entity: 'sales-activities',
  parent_data: PermissionSalesParent,
});

const PermissionSalesReport: Permission = new Permission({
  name: 'Sales > Report',
  entity: 'sales-report',
  parent_data: PermissionSalesParent,
});

// custom collector
const PermissionCollectorParent: Permission = new Permission({
  name: 'Collector',
  entity: 'collector'
});

const PermissionCollectorData: Permission = new Permission({
  name: 'Collector > Data',
  entity: 'collector-data',
  parent_data: PermissionCollectorParent,
});

const PermissionCollectorActivities: Permission = new Permission({
  name: 'Collector > Activities',
  entity: 'collector-activities',
  parent_data: PermissionCollectorParent,
});

const PermissionCollectorReport: Permission = new Permission({
  name: 'Collector > Report',
  entity: 'collector-report',
  parent_data: PermissionCollectorParent,
});
//End Custom Collector

const PermissionLogisticParent: Permission = new Permission({
  name: 'Logistic',
  entity: 'logistic',
});

const PermissionLogisticData: Permission = new Permission({
  name: 'Logistic > Data',
  entity: 'logistic-data',
  parent_data: PermissionLogisticParent,
});

const PermissionLogisticActivities: Permission = new Permission({
  name: 'Logistic > Activities',
  entity: 'logistic-activities',
  parent_data: PermissionLogisticParent,
});

const PermissionLogisticReport: Permission = new Permission({
  name: 'Logistic > Report',
  entity: 'logistic-report',
  parent_data: PermissionLogisticParent,
});

// Custom Absence
const PermissionAbsenceParent: Permission = new Permission({
  name: 'Absence ',
  entity: 'absences'
});

const PermissionAbsenceData: Permission = new Permission({
  name: 'Absence > Data',
  entity: 'absences-data',
  parent_data: PermissionAbsenceParent,
});

//End Custom Absence

const PermissionAssetsParent: Permission = new Permission({
  name: 'Assets',
  entity: 'assets',
});

const PermissionAssetsData: Permission = new Permission({
  name: 'Assets > Data',
  entity: 'assets-data',
  parent_data: PermissionAssetsParent,
});

const PermissionSettingParent: Permission = new Permission({
  name: 'Setting',
  entity: 'setting',
});

const PermissionSettingData: Permission = new Permission({
  name: 'Setting > Data',
  entity: 'setting-data',
  parent_data: PermissionSettingParent,
});

const PermissionSettingUser: Permission = new Permission({
  name: 'Setting > User',
  entity: 'setting-user',
  parent_data: PermissionSettingParent,
});

const PermissionSettingNotification: Permission = new Permission({
  name: 'Setting > Notification',
  entity: 'setting-notif',
  parent_data: PermissionSettingParent,
  hidden: true,
});

const PermissionSettingConfiguration: Permission = new Permission({
  name: 'Setting > Configurations',
  entity: 'setting-config',
  parent_data: PermissionSettingParent,
});

// id harus sesuai urutan !!!!!
export const permission_table: Permission[] = [
  PermissionDashboard,
  PermissionLiveMap,
  PermissionSalesParent,
  new Permission({
    name: 'Sales > Dashboard',
    entity: 'sales-dashboard',
    parent_data: PermissionSalesParent,
  }),
  PermissionSalesData,
  new Permission({
    name: 'Sales > Data > Sales Rep.',
    entity: 'sales-data-representative',
    parent_data: PermissionSalesData,
  }),
  new Permission({
    name: 'Sales > Data > Visit Cycle',
    entity: 'sales-data-visit-cycle',
    parent_data: PermissionSalesData,
  }),
  PermissionSalesActivities,
  // new Permission({
  //   name: 'Sales > Activities > Request Order',
  //   entity: 'sales-activities-request-order',
  //   parent_data: PermissionSalesActivities,
  // }),
  // new Permission({
  //   name: 'Sales > Activities > Sales Order',
  //   entity: 'sales-activities-sales-order',
  //   parent_data: PermissionSalesActivities,
  //   hidden: true,
  // }),
  // new Permission({
  //   name: 'Sales > Activities > Invoice',
  //   entity: 'sales-activities-invoice',
  //   parent_data: PermissionSalesActivities,
  // }),
  // new Permission({
  //   name: 'Sales > Activities > Payment',
  //   entity: 'sales-activities-payment',
  //   parent_data: PermissionSalesActivities,
  // }),
  new Permission({
    name: 'Sales > Activities > Visit Plan',
    entity: 'sales-activities-visit-plan',
    parent_data: PermissionSalesActivities,
  }),
  new Permission({
    name: 'Sales > Activities > Permission',
    entity: 'sales-activities-permission',
    parent_data: PermissionSalesActivities,
  }),
  new Permission({
    name: 'Sales > Activities > Alert',
    entity: 'sales-activities-alert',
    parent_data: PermissionSalesActivities,
  }),
  PermissionSalesReport,
  new Permission({
    name: 'Sales > Report > Performance',
    entity: 'sales-report-performance',
    parent_data: PermissionSalesReport,
  }),
  // new Permission({
  //   name: 'Sales > Report > Request Order',
  //   entity: 'sales-report-order-sales',
  //   parent_data: PermissionSalesReport,
  // }),
  // new Permission({
  //   name: 'Sales > Report > Sales Order',
  //   entity: 'sales-report-sales-order',
  //   parent_data: PermissionSalesReport,
  //   hidden: true,
  // }),
  // new Permission({
  //   name: 'Sales > Report > Invoice',
  //   entity: 'sales-report-invoice',
  //   parent_data: PermissionSalesReport,
  // }),
  // new Permission({
  //   name: 'Sales > Report > Payment',
  //   entity: 'sales-report-payment',
  //   parent_data: PermissionSalesReport,
  // }),
  new Permission({
    name: 'Sales > Report > Visit Plan',
    entity: 'sales-report-visit-plan',
    parent_data: PermissionSalesReport,
  }),
  new Permission({
    name: 'Sales > Report > Customer Visit',
    entity: 'sales-report-customer-visit',
    parent_data: PermissionSalesReport,
  }),
  new Permission({
    name: 'Sales > Report > Visit Eye History',
    entity: 'sales-report-visit-eye-history',
    parent_data: PermissionSalesReport,
  }),
  new Permission({
    name: 'Sales > Report > Permission',
    entity: 'sales-report-permission',
    parent_data: PermissionSalesReport,
  }),
  new Permission({
    name: 'Sales > Report > Alert',
    entity: 'sales-report-alert',
    parent_data: PermissionSalesReport,
  }),
  PermissionCollectorParent,
  new Permission({
    name: 'Collector > Dashboard',
    entity: 'collector-dashboard',
    parent_data: PermissionCollectorParent,
  }),
  PermissionCollectorData,
  new Permission({
    name: 'Collector > Data > collector',
    entity: 'collector-data-representative',
    parent_data: PermissionCollectorData,
  }),
  // new Permission({
  //   name: 'Collector > Data > Visit Cycle',
  //   entity: 'collector-data-visit-cycle',
  //   parent_data: PermissionCollectorData,
  // }),
  PermissionCollectorActivities,
  // new Permission({
  //   name: 'Collector > Activities > Request Order',
  //   entity: 'collector-activities-request-order',
  //   parent_data: PermissionCollectorActivities,
  // }),
  // new Permission({
  //   name: 'Collector > Activities > Sales Order',
  //   entity: 'collector-activities-sales-order',
  //   parent_data: PermissionCollectorActivities,
  //   hidden: true,
  // }),
  new Permission({
    name: 'Collector > Activities > Invoice',
    entity: 'collector-activities-invoice',
    parent_data: PermissionCollectorActivities,
  }),
  // new Permission({
  //   name: 'Collector > Activities > Payment',
  //   entity: 'collector-activities-payment',
  //   parent_data: PermissionCollectorActivities,
  // }),
  new Permission({
    name: 'Collector > Activities > Visit Plan',
    entity: 'collector-activities-visit-plan',
    parent_data: PermissionCollectorActivities,
  }),
  new Permission({
    name: 'collector > Activities > Permission',
    entity: 'collector-activities-permission',
    parent_data: PermissionCollectorActivities,
  }),
  new Permission({
    name: 'Collector > Activities > Alert',
    entity: 'collector-activities-alert',
    parent_data: PermissionCollectorActivities,
  }),
  PermissionCollectorReport,
  new Permission({
    name: 'Collector > Report > Performance',
    entity: 'collector-report-performance',
    parent_data: PermissionCollectorReport,
  }),
  // new Permission({
  //   name: 'Collector > Report > Request Order',
  //   entity: 'collector-report-order-sales',
  //   parent_data: PermissionCollectorReport,
  // }),
  // new Permission({
  //   name: 'Collector > Report > Sales Order',
  //   entity: 'collector-report-sales-order',
  //   parent_data: PermissionCollectorReport,
  //   hidden: true,
  // }),
  new Permission({
    name: 'Collector > Report > Invoice',
    entity: 'collector-report-invoice',
    parent_data: PermissionCollectorReport,
  }),
  // new Permission({
  //   name: 'Collector > Report > Payment',
  //   entity: 'collector-report-payment',
  //   parent_data: PermissionCollectorReport,
  // }),
  new Permission({
    name: 'Collector > Report > Visit Plan',
    entity: 'collector-report-visit-plan',
    parent_data: PermissionCollectorReport,
  }),
  new Permission({
    name: 'Collector > Report > Customer Visit',
    entity: 'collector-report-customer-visit',
    parent_data: PermissionCollectorReport,
  }),
  new Permission({
    name: 'Collector > Report > Visit Eye History',
    entity: 'collector-report-visit-eye-history',
    parent_data: PermissionCollectorReport,
  }),
  new Permission({
    name: 'Collector > Report > Permission',
    entity: 'collector-report-permission',
    parent_data: PermissionCollectorReport,
  }),
  new Permission({
    name: 'Collector > Report > Alert',
    entity: 'collector-report-alert',
    parent_data: PermissionCollectorReport,
  }),
  // 
  PermissionLogisticParent,
  new Permission({
    name: 'Logistic > Dashboard',
    entity: 'logistic-dashboard',
    parent_data: PermissionLogisticParent,
  }),
  PermissionLogisticData,
  new Permission({
    name: 'Logistic > Data > Crew',
    entity: 'logistic-data-crew',
    parent_data: PermissionLogisticData,
  }),
  new Permission({
    name: 'Logistic > Data > Delivery Cycle',
    entity: 'logistic-data-delivery-cycle',
    parent_data: PermissionLogisticData,
  }),
  PermissionLogisticActivities,
  new Permission({
    name: 'Logistic > Activities > Packing Slip',
    entity: 'logistic-activities-packing-slip',
    parent_data: PermissionLogisticActivities,
  }),
  new Permission({
    name: 'Logistic > Activities > Delivery Route',
    entity: 'logistic-activities-delivery-route',
    parent_data: PermissionLogisticActivities,
  }),
  new Permission({
    name: 'Logistic > Activities > Permission',
    entity: 'logistic-activities-permission',
    parent_data: PermissionLogisticActivities,
  }),
  new Permission({
    name: 'Logistic > Activities > Alert',
    entity: 'logistic-activities-alert',
    parent_data: PermissionLogisticActivities,
  }),
  PermissionLogisticReport,
  new Permission({
    name: 'Logistic > Report > Performance',
    entity: 'logistic-report-performance',
    parent_data: PermissionLogisticReport,
  }),
  new Permission({
    name: 'Logistic > Report > Packing Slip',
    entity: 'logistic-report-packing-slip',
    parent_data: PermissionLogisticReport,
  }),
  new Permission({
    name: 'Logistic > Report > Delivery Plan',
    entity: 'logistic-report-delivery-plan',
    parent_data: PermissionLogisticReport,
  }),
  new Permission({
    name: 'Logistic > Report > Customer Delivery Plan',
    entity: 'logistic-report-customer-delivery',
    parent_data: PermissionLogisticReport,
  }),
  new Permission({
    name: 'Logistic > Report > Permission',
    entity: 'logistic-report-permission',
    parent_data: PermissionLogisticReport,
  }),
  new Permission({
    name: 'Logistic > Report > Alert',
    entity: 'logistic-report-alert',
    parent_data: PermissionLogisticReport,
  }),
  
  
  PermissionAbsenceParent,
  PermissionAbsenceData,
  new Permission({
    name: 'Absences',
    entity: 'absences',
    parent_data: PermissionAbsenceParent,
  }),
  
  new Permission({
    name: 'Absences > Data > Daily Absence',
    entity: 'absences-data-daily',
    parent_data: PermissionAbsenceData,
  }),
  
  PermissionAssetsParent,
  PermissionAssetsData,
  new Permission({
    name: 'Assets > Data > Assets',
    entity: 'assets-data-assets',
    parent_data: PermissionAssetsData,
  }),
  new Permission({
    name: 'Assets > Data > Assets Type',
    entity: 'assets-data-assets-type',
    parent_data: PermissionAssetsData,
  }),
  PermissionSettingParent,
  PermissionSettingData,
  new Permission({
    name: 'Setting > Data > CompanyNameFull Information',
    entity: 'setting-data-company-info',
    parent_data: PermissionSettingData,
  }),
  new Permission({
    name: 'Setting > Data > Branches',
    entity: 'setting-data-branches',
    parent_data: PermissionSettingData,
  }),
  new Permission({
    name: 'Setting > Data > Divisions',
    entity: 'setting-data-division',
    parent_data: PermissionSettingData,
  }),
  new Permission({
    name: 'Setting > Data > Customers',
    entity: 'setting-data-customers',
    parent_data: PermissionSettingData,
  }),
  PermissionSettingUser,
  new Permission({
    name: 'Setting > User > Supervisor',
    entity: 'setting-user-admin',
    parent_data: PermissionSettingUser,
  }),
  new Permission({
    name: 'Setting > User > User Group',
    entity: 'setting-user-group',
    parent_data: PermissionSettingUser,
  }),
  new Permission({
    name: 'Setting > User > User',
    entity: 'setting-user-user',
    parent_data: PermissionSettingUser,
  }),
  PermissionSettingNotification,
  new Permission({
    name: 'Setting > Notification > Sales',
    entity: 'setting-notif-sales',
    parent_data: PermissionSettingNotification,
    hidden: true,
  }),
  new Permission({
    name: 'Setting > Notif. > Logistic',
    entity: 'setting-notif-logistic',
    parent_data: PermissionSettingNotification,
    hidden: true,
  }),
  new Permission({
    name: 'Setting > Notif. > Routing',
    entity: 'setting-notif-routing',
    parent_data: PermissionSettingNotification,
    hidden: true,
  }),
  new Permission({
    name: 'Setting > Notif. > Asset',
    entity: 'setting-notif-asset',
    parent_data: PermissionSettingNotification,
    hidden: true,
  }),
  PermissionSettingConfiguration,
  new Permission({
    name: 'Setting > Config > General',
    entity: 'setting-config-general',
    parent_data: PermissionSettingConfiguration,
  }),
  new Permission({
    name: 'Setting > Config > Area',
    entity: 'setting-config-area',
    parent_data: PermissionSettingConfiguration,
  }),
];

export const dropdown_menu = [
  {
    name: 'No',
    value: 0,
  },
  {
    name: 'Yes',
    value: 1,
  },
  {
    name: 'Inherit',
    value: 10,
  },
];

export const dropdown_crud = [
  {
    name: 'No',
    value: 0,
  },
  {
    name: 'Manager',
    value: 3,
  },
  {
    name: 'Admin',
    value: 2,
  },
  {
    name: 'Staff',
    value: 1,
  },
  {
    name: 'Inherit',
    value: 10,
  },
];

export const dropdown_import = [
  {
    name: 'No',
    value: 0,
  },
  {
    name: 'Yes',
    value: 3,
  },
  {
    name: 'Inherit',
    value: 10,
  },
];

export const dropdown_menu_user_group = [
  {
    name: 'No',
    value: 0,
  },
  {
    name: 'Yes',
    value: 1,
  },
];

export const dropdown_crud_user_group = [
  {
    name: 'No',
    value: 0,
  },
  {
    name: 'Manager',
    value: 3,
  },
  {
    name: 'Admin',
    value: 2,
  },
  {
    name: 'Staff',
    value: 1,
  },
];

export const dropdown_import_user_group = [
  {
    name: 'No',
    value: 0,
  },
  {
    name: 'Yes',
    value: 3,
  },
];

export const label_data_save = {
  saving: 'Saving data...',
  redirect: 'Save successfull, now redirecting...',
  submit: 'Submit data...',
};


export const limit_size = {
  start_size: 0,
  end_size: 10,
};

export const dropdown_limit = {
  max: 10000,
  min: 10,
};

export const prefix_list = [
  {prefix: 'area', label: 'Area', goto: 'pages/approval/index', module: 'area', view_url: 'pages/settings/area/view'},
  {
    prefix: 'assets',
    label: 'Asset',
    goto: 'pages/approval/index',
    module: 'assets',
    view_url: 'pages/assets/assets/view',
  },
  {
    prefix: 'branches',
    label: 'Branches',
    goto: 'pages/approval/index',
    module: 'branches',
    view_url: 'pages/settings/branch/view',
  },
  {
    prefix: 'customer',
    label: 'Customer',
    goto: 'pages/approval/index',
    module: 'customer',
    view_url: 'pages/settings/customers/view',
  },
  {
    prefix: 'division',
    label: 'Division',
    goto: 'pages/approval/index',
    module: 'division',
    view_url: 'pages/settings/divisions/view',
  },
  {
    prefix: 'employee/sales',
    label: 'Employee Sales',
    goto: 'pages/approval/index',
    module: 'employee_sales',
    view_url: 'pages/employee/sales/view',
  },
  // 
  // {
  //   prefix: 'employee/collector',
  //   label: 'Employee Collector',
  //   goto: 'pages/approval/index',
  //   module: 'employee_collector',
  //   view_url: 'pages/employee/collectors/view',
  // },
  // 
  {
    prefix: 'employee/logistic',
    label: 'Employee Logistic',
    goto: 'pages/approval/index',
    module: 'employee_logistic',
    view_url: 'pages/employee/logistic/view',
  },
  {
    prefix: 'employee/supervisor',
    label: 'Employee Supervisor',
    goto: 'pages/approval/index',
    module: 'employee_supervisor',
    view_url: 'pages/employee/supervisor/view',
  },
  {
    prefix: 'user', 
    label: 'User', 
    goto: 'pages/approval/index', 
    module: 'user', 
    view_url: 'pages/settings/user/view'},
  {
    prefix: 'user/groups',
    label: 'User Group',
    goto: 'pages/approval/index',
    module: 'user_group',
    view_url: 'pages/settings/user_groups/view',
  },
  {
    prefix: 'visit/cycle',
    label: 'Visit Cycle',
    goto: 'pages/approval/index',
    module: 'visit_cycle',
    view_url: 'pages/sales/visit_cycle/view',
  },
  {
    prefix: 'visit/plan',
    label: 'Visit Plan',
    goto: 'pages/approval/index',
    module: 'visit_plan',
    view_url: 'pages/sales/activities/visit_plan/view',
  },
  // custom collector
  {
    prefix: 'collect/plan',
    label: 'Collect Plan',
    goto: 'pages/approval/index',
    module: 'collect_plan',
    view_url: 'pages/collector/activities/collect_plan/view',
  },
  // 
  {
    prefix: 'delivery/cycle',
    label: 'Delivery Cycle',
    goto: 'pages/approval/index',
    module: 'delivery_cycle',
    view_url: 'pages/logistic/delivery_cycle/view',
  },
  {
    prefix: 'delivery/plan',
    label: 'Delivery Plan',
    goto: 'pages/approval/index',
    module: 'delivery_plan',
    view_url: 'pages/logistic/activities/delivery_route/view',
  },
  //custom absence
  {
    prefix: 'daily_absence/user',
    label: 'Absence',
    goto: 'pages/daily_absence/user/index',
    module: 'absence',
    view_url: '/pages/daily_absence/user/index',
  },
  //end custom absence
];
