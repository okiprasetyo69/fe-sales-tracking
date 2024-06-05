import { Component, OnInit } from '@angular/core';
import { DivisionsService } from '../../../../services/divisions.service';

@Component({
  selector: 'ngx-divisions-import',
  templateUrl: './divisions-import.component.html',
  styleUrls: ['./divisions-import.component.scss'],
})
export class DivisionsImportComponent implements OnInit {

  constructor(
    public divisionService: DivisionsService,
  ) { }

  ngOnInit() {
  }

}
