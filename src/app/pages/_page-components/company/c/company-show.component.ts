import { Component, OnDestroy, OnInit } from '@angular/core';
import { CompanyService } from '../../../../services/company.service';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from '../../../../services/menu.service';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'ngx-company-show',
  styleUrls: ['./company-show.component.scss'],
  templateUrl: './company-show.component.html',
})
export class CompanyShowComponent implements OnInit, OnDestroy {
  company: Array<any> = [];
  empty_company: boolean = false;
  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private menuService: MenuService,
  ) {}

  ngOnInit() {
    this.menuService.getMenuReloaded(this.route.snapshot.data['route_code']);
    this.getCompanyData();
  }

  getCompanyData() {
    this.companyService.show()
      .pipe(untilDestroyed(this))
      .subscribe(company => {
        // console.log(company);
        if (!company.data) {
          this.empty_company = true;
        } else {
          this.company = company.data;
        }
      });
  }

  ngOnDestroy() {
    //
  }
}
