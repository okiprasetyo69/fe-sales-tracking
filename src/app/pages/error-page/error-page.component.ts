import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss'],
})
export class ErrorPageComponent implements OnInit {

  message: string = '';

  constructor(
    private route: ActivatedRoute,
    private location: Location,
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['error_type'] === 'permission') {
        this.message = `You don't have permission to access ${params['method']} ${params['feature']}.`;
      }
    });
  }

  back() {
    this.location.back();
  }
}
