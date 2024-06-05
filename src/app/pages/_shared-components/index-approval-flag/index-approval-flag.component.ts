import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-index-approval-flag',
  templateUrl: './index-approval-flag.component.html',
  styleUrls: ['./index-approval-flag.component.scss'],
})
export class IndexApprovalFlagComponent implements OnInit {
  @Input() data;

  constructor(
  ) {
  }

  ngOnInit() {
  }

}
