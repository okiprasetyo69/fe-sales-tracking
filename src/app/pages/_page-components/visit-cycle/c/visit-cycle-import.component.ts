import { Component, OnInit } from '@angular/core';
import { VisitCycleService } from '../../../../services/visit-cycle.service';

@Component({
  selector: 'ngx-visit-cycle-import',
  templateUrl: './visit-cycle-import.component.html',
  styleUrls: ['./visit-cycle-import.component.scss'],
})
export class VisitCycleImportComponent implements OnInit {

  constructor(
    public visitCycleService: VisitCycleService,
  ) { }

  ngOnInit() {
  }

}
