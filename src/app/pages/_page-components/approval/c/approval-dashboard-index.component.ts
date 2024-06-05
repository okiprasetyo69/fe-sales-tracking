import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApprovalService } from '../../../../services/approval.service';
import { AnonymousSubscription, Subscription } from 'rxjs/Subscription';
import { prefix_list } from '../../../../configs/configs';
import { Observable } from 'rxjs/Observable';
import { timer } from 'rxjs/observable/timer';

@Component({
  selector: 'ngx-approval-dashboard-index',
  templateUrl: './approval-dashboard-index.component.html',
  styleUrls: ['./approval-dashboard-index.component.scss'],
})
export class ApprovalDashboardIndexComponent implements OnInit, OnDestroy {

  datasets: Array<any> = [];
  isLoadingGeneral: boolean = false;
  private approvalSubscription: Subscription;
  private timerApprovalSubscription: AnonymousSubscription;
  mytimer = timer(60000);
  prefix_list = prefix_list;

  constructor(
    private router: Router,
    private approvalService: ApprovalService,
  ) { }

  ngOnInit() {
    this.getApproval();
  }

  getModuleCount(prefix) {
    const get_data = this.datasets.find((x) => x.prefix === prefix);
    let counter = 0;
    if (!!get_data) {
      counter = get_data.count;
    }
    return counter;
  }

  dataView(prefix) {
    const get_prefix = this.prefix_list.find((x) => x.prefix === prefix);
    this.router.navigate([get_prefix.goto], {queryParams: {
      module: get_prefix.module,
    }}).then();
  }

  ngOnDestroy() {
    if (this.approvalSubscription) {
      this.approvalSubscription.unsubscribe();
    }
    if (this.timerApprovalSubscription) {
      this.timerApprovalSubscription.unsubscribe();
    }
  }

  private getApproval(): void {
    this.isLoadingGeneral = true;
    this.approvalSubscription = this.approvalService.getApprovalCounter().subscribe(data => {
      this.isLoadingGeneral = false;
      this.datasets = data.data;
      this.subscribeToApproval();
    });
  }

  reload(): void {
    this.isLoadingGeneral = true;
    this.approvalSubscription = this.approvalService.getApprovalCounter().subscribe(data => {
      this.isLoadingGeneral = false;
      this.datasets = data.data;
    });
  }

  private subscribeToApproval(): void {
    this.timerApprovalSubscription = this.mytimer.subscribe(() => this.getApproval());
  }

}
