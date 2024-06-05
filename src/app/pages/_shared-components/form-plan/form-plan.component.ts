import { Component, Input, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'ngx-form-plan',
  templateUrl: './form-plan.component.html',
  styleUrls: ['./form-plan.component.scss'],
})
export class FormPlanComponent implements OnInit {
  @Input() endpointUser;

  dataList = new FormArray([], {});

  constructor() {
  }

  ngOnInit() {
  }

}
