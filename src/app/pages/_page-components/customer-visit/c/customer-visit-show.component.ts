import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerVisitFilterComponent } from '../modal/customer-visit-filter.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerVisitService } from '../../../../services/customer-visit.service';
import { Area, Customer } from '@Model/response-customer';
import { ToasterService } from "angular2-toaster";

declare var jQuery: any;
declare var moment: any;

@Component({
    selector: 'ngx-customer-visit-show',
    templateUrl: './customer-visit-show.component.html',
    styleUrls: ['./customer-visit-show.component.scss'],
})
export class CustomerVisitShowComponent implements OnInit {


    ListArea: Area[] = [];
    ListCustomer: Customer[] = [];

    type: string = 'sales';

    @ViewChild('gantt') set ganttData(gantt: ElementRef) {
        if (gantt != null) {
            if (typeof gantt.nativeElement != "undefined") {
                jQuery(gantt.nativeElement).gantt({
                    source: this.dataSource,
                    scale: 'days',
                    navigate: 'scroll',
                    itemsPerPage: 11,
                    minScale: 'days',
                    scrollToToday: false,
                    maxScale: 'days',
                });
            }
        }
    }

    public dataSource: Array<any> = [];
    public customMessage: string = "";
    public failed: boolean = false;

    public lat = -6.93464749;
    public lng = 107.59296792;
    public zoom = 10;

    showFilter = true;

    dataFormFilter: FormGroup;

    todayDate: any = {
        // @ts-ignore
        year: new Date().getFullYear(),
        // @ts-ignore
        month: new Date().getMonth() + 1,
        // @ts-ignore
        day: new Date().getDate(),
    };

    default_date;
    default_date_second;
    dropdownUserLoading = false;

    requesting = true;

    constructor(
        private modalService: NgbModal,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private customerVisitService: CustomerVisitService,
        private toasterService: ToasterService,
    ) {
        this.type = this.router.url.split('/')[2];
    }

    ngOnInit() {
        const today = moment();
        const sixDaysBefore = moment().add(-30, 'days');

        this.default_date = today.format('YYYY-MM-DD');
        this.default_date_second = sixDaysBefore.format('YYYY-MM-DD');

        this.dataFormFilter = this.fb.group({
            area: [],
            date_start: null,
            date_end: null,
            user_id: [],
        });

        this.dataFormFilter.patchValue({date_start: this.default_date_second});
        this.dataFormFilter.patchValue({date_end: this.default_date});
        this.customerVisitService.getListArea().subscribe(area => {
            let defaultData;
            if (area.data.data.length != 0) {
                defaultData = area.data.data.map(x => x.id);
            }
            this.dataFormFilter.patchValue({area: defaultData});
            this.reloadData();
        });
    }

    autoDigit(number) {
        return (number < 10) ? '0'.concat(number) : number;
    }

    reloadData() {
        this.requesting = true;
        this.failed = false;
        this.customMessage = "";
        this.dataSource = [];

        this.dataSource.push(
            {
                name: '',
                desc: '',
                values: [{
                    customClass: 'ganttEmpty',
                    from: moment(this.dataFormFilter.controls['date_start'].value),
                    to: moment(this.dataFormFilter.controls['date_end'].value),
                }],
            },
        );
        if (this.type == 'sales') {
            this.customerVisitService.getVisit(this.dataFormFilter).subscribe(visit => {
                this.requesting = false;
                try {
                    this.ListArea = visit.data.data.area;
                    this.ListCustomer = visit.data.data.customer;

                    visit.data.data.customer_gantt.forEach(gantt => {
                        this.dataSource.push(gantt);
                    });
                } catch (ex) {
                    this.failed = true;
                    this.customMessage = visit.message;
                }
            }, error => {
                this.requesting = false;
                console.info('Error', error);
            });
        }else if (this.type == 'collector') {
            this.customerVisitService.getVisitCollector(this.dataFormFilter).subscribe(visit => {
                this.requesting = false;
                try {
                    this.ListArea = visit.data.data.area;
                    this.ListCustomer = visit.data.data.customer;

                    visit.data.data.customer_gantt.forEach(gantt => {
                        this.dataSource.push(gantt);
                    });
                } catch (ex) {
                    this.failed = true;
                    this.customMessage = visit.message;
                }
            }, error => {
                this.requesting = false;
                console.info('Error', error);
            });
        } else {
            this.customerVisitService.getDelivery(this.dataFormFilter).subscribe(visit => {
                this.requesting = false;
                try {
                    this.ListArea = visit.data.data.area;
                    this.ListCustomer = visit.data.data.customer;
                    visit.data.data.customer_gantt.forEach(gantt => {
                        this.dataSource.push(gantt);
                    });
                } catch (ex) {
                    this.failed = true;
                    this.customMessage = visit.message;
                }
            }, error => {
                this.requesting = false;
                console.info('Error', error);
            });
        }
    }

    dataFilter() {
        if (!this.requesting) {
            const activeModal = this.modalService.open(CustomerVisitFilterComponent, {
                size: 'lg',
                container: 'nb-layout',
                backdrop: 'static',
            });
            activeModal.componentInstance.dataForm = this.dataFormFilter;
            activeModal.componentInstance.type = this.type;
            activeModal.componentInstance.filterData.subscribe(dataFiltered => {
                this.dataFormFilter = dataFiltered;
                this.reloadData();
            });
        } else {
            this.toasterService.popAsync('info', 'Please Wait...', "Still Requesting");
        }
    }

    changeTab($event) {
        // if ($event.tabTitle == 'Map') {
        //   this.showFilter = false;
        // } else {
        //   this.showFilter = true;
        // }
    }
}
