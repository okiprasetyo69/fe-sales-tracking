import { Component, Input, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'ngx-delivery-destination-form',
  templateUrl: './delivery-destination-form.component.html',
  styleUrls: ['./delivery-destination-form.component.scss'],
})
export class DeliveryDestinationFormComponent implements OnInit {

  @Input() branchDropdown: any;
  @Input() customerDropdown: any;
  @Input() dataForm: any;
  @Input() cycle_day: string;
  @Input() isView: boolean;

  form_destination_mode = {
    cycle_monday: 'add',
    cycle_tuesday: 'add',
    cycle_wednesday: 'add',
    cycle_thursday: 'add',
    cycle_friday: 'add',
    cycle_saturday: 'add',
    cycle_sunday: 'add',
  };

  edited_index = {
    cycle_monday: '',
    cycle_tuesday: '',
    cycle_wednesday: '',
    cycle_thursday: '',
    cycle_friday: '',
    cycle_saturday: '',
    cycle_sunday: '',
  };

  // WARNING: DON'T CHANGE ORDER
  destinationForm = {
    cycle_monday: {
      customer_code: '',
      order_route: '',
      note: '',
    },
    cycle_tuesday: {
      customer_code: '',
      order_route: '',
      note: '',
    },
    cycle_wednesday: {
      customer_code: '',
      order_route: '',
      note: '',
    },
    cycle_thursday: {
      customer_code: '',
      order_route: '',
      note: '',
    },
    cycle_friday: {
      customer_code: '',
      order_route: '',
      note: '',
    },
    cycle_saturday: {
      customer_code: '',
      order_route: '',
      note: '',
    },
    cycle_sunday: {
      customer_code: '',
      order_route: '',
      note: '',
    },
  };

  constructor(
    private toasterService: ToasterService,
  ) { }

  ngOnInit() {
  }

  addDestination(data) {
    console.info(Object.values(data));
    this.dataForm[this.cycle_day]['destination'].push({
      customer_code: Object.values(data)[0],
      order_route: Object.values(data)[1],
      note: Object.values(data)[2],
    });
    this.toasterService.popAsync('success', 'Success', 'You added destination. Please save this form to save the changes');
    this.clearDestination();
  }

  saveDestination(data) {
    if (this.form_destination_mode[this.cycle_day] === 'edit') {
      this.updateDestination();
    } else {
      this.addDestination(data);
    }
  }

  editDestination(data, index) {
    console.info(data, index);
    this.destinationForm[this.cycle_day] = {
      customer_code: data['customer_code'],
      order_route: data['order_route'],
      note: data['note'],
    };
    this.form_destination_mode[this.cycle_day] = 'edit';
    this.edited_index[this.cycle_day] = index;
  }

  updateDestination() {
    this.dataForm[this.cycle_day]['destination'][this.edited_index[this.cycle_day]] = {
      customer_code: Object.values(this.destinationForm[this.cycle_day])[0],
      order_route: Object.values(this.destinationForm[this.cycle_day])[1],
      note: Object.values(this.destinationForm[this.cycle_day])[2],
    };
    this.toasterService.popAsync('success', 'Success', 'You changed destination. Please save this form to save the changes');
    this.clearDestination();
  }

  clearDestination() {
    this.form_destination_mode[this.cycle_day] = 'add';
    this.destinationForm[this.cycle_day] = {
      customer_code: '',
      order_route: '',
      note: '',
    };
  }

  deleteDestination(index) {
    this.toasterService.popAsync('success', 'Success', 'You deleted destination. Please save this form to save the changes');
    this.dataForm[this.cycle_day]['destination'].splice(index, 1);
    this.clearDestination();
  }
}
