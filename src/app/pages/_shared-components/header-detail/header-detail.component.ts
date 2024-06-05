import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-header-detail',
  templateUrl: './header-detail.component.html',
  styleUrls: ['./header-detail.component.scss'],
})
export class HeaderDetailComponent implements OnInit {
  @Input() label: string;
  @Input() content: string;
  constructor() { }

  ngOnInit() {
  }

}
