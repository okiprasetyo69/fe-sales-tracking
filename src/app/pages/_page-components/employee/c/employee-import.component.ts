import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../../services/employee.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-employee-import',
  templateUrl: './employee-import.component.html',
  styleUrls: ['./employee-import.component.scss'],
})
export class EmployeeImportComponent implements OnInit {
  feature: String;

  constructor(
    public employeeService: EmployeeService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.feature = this.route.snapshot.data['feature'];
  }

}
