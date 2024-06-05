import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { OauthService } from '../../../services/oauth.service';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import { Router } from '@angular/router';
import { AnonymousSubscription } from 'rxjs/Subscription';
import { HeaderService } from '../../../services/header.service';
import { timer } from 'rxjs/observable/timer';
import { CompanyLevel, CompanyNameFull, CompanyNameShort } from 'app/configs/configs';
import { CompanyService } from '../../../services/company.service';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  level = CompanyLevel;
  name = '';

  public config: ToasterConfig = new ToasterConfig({limit: 1});
  @Input() position = 'normal';

  user: any;
  username: any;
  private approvalSubscription: AnonymousSubscription;
  private timerApprovalSubscription: AnonymousSubscription;
  approval_counter: any = 0;
  inbox_counter: any = 0;
  koneksiSocket;
  locationSound = 'assets/definite.mp3';
  sound;
  mytimer = timer(60000);

  userMenu = [{title: 'Log out'}];

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private userService: UserService,
    private headerService: HeaderService,
    private analyticsService: AnalyticsService,
    private oauthService: OauthService,
    private toasterService: ToasterService,
    private router: Router,
    private companyService: CompanyService,
  ) {
  }

  ngOnInit() {
    // Get Company Information
    this.companyService.show()
      .pipe(untilDestroyed(this))
      .subscribe(company => {
          this.name = company.data.name;
        },
        errors => {
          console.info('Error Get Company : ', errors);
        });
    this.sound = new Audio(this.locationSound);
    this.userService.getUsers().subscribe((users: any) => {
      this.user = users.user;
      this.username = users.username;
    });
    this.menuService.onItemClick().subscribe((event) => {
      this.onItemSelection(event.item.title);
    });
    this.getApprovalCounter();
    this.headerService.getInbox();
    this.koneksiSocket = this.headerService.getInbox().subscribe(notif => {
      console.info(this.koneksiSocket);
      console.info('Notifikasi : ', notif[0].total);
      if (notif[0].total != 0) {
        this.sound.currentTime = 0;
        this.sound.play();
        this.toasterService.popAsync('primary', 'Inbox', 'You have new inbox.');
      }
      this.inbox_counter = notif[0].total;
    });
  }

  onItemSelection(title) {
    if (title === 'Log out') {
      // Do something on Log out
      console.info('Log out Clicked ');
      this.headerService.logout().subscribe(res => {
        console.info('log out success', res);
        this.oauthService.destroyToken();
        this.toasterService.pop('success', 'Success', 'You\'re now logout..');
        this.router.navigate(['auth/login'], {
          queryParams: {
            returnUrl: 'pages/dashboard',
          },
        }).then();
      }, errors => {
        const errorMessage = errors.error.message;
        this.toasterService.popAsync('error', 'Error', errorMessage);
      });

    } else if (title === 'Profile') {
      // Do something on Profile
      console.info('Profile Clicked ');
    }
  }


  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }

  inbox() {
    this.headerService.setNull();
    this.router.navigate(['pages/inbox/index']).then();
  }

  alert() {
    this.router.navigate(['pages/alert/sales/index']).then();
  }

  approval() {
    this.router.navigate(['pages/approval/dashboard']).then();
  }

  private getApprovalCounter(): void {
    this.approvalSubscription = this.headerService.getApprovalCounter().subscribe(data => {
      this.approval_counter = data.total;
      this.subscribeToApprovalCounter();
    });
  }

  private subscribeToApprovalCounter(): void {
    this.timerApprovalSubscription = this.mytimer.subscribe(() => this.getApprovalCounter());
  }

  public ngOnDestroy(): void {
    this.koneksiSocket.unsubscribe();
    if (this.approvalSubscription) {
      this.approvalSubscription.unsubscribe();
    }
    if (this.timerApprovalSubscription) {
      this.timerApprovalSubscription.unsubscribe();
    }
  }

}
