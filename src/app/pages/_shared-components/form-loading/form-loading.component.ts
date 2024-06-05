import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-form-loading',
  templateUrl: './form-loading.component.html',
  styleUrls: ['./form-loading.component.scss'],
})
export class FormLoadingComponent implements OnInit {
  @Input() is_loading: boolean;
  constructor() { }

  ngOnInit() {
  }

}
