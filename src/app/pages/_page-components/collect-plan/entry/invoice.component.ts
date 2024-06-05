import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DataTableDirective} from "angular-datatables";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ToasterService} from "angular2-toaster";
import {untilDestroyed} from "ngx-take-until-destroy";
import {Destination} from "@Model/response-destination";
import {FormBuilder, FormGroup} from "@angular/forms";
import {VisitPlanService} from "../../../../services/visit-plan.service";
import {InvoiceInterface} from "@Model/response-invoice";
import {empty} from "rxjs";

@Component({
  selector: 'ngx-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnInit {
  idUser: any;
  dropdownInvoice = [];
  invoice_id: string;
  invoiceLoading = false;
  isView: boolean = false;
  dataForm: FormGroup;
  searchInvoice: string = '';
  invoiceSearchResult = [];
  invoiceList: InvoiceData[] = [];
  dataInvoice: any;
  idVisitPlan: any;
  hideSaveButton: boolean = true;


  constructor(
    private activeModal: NgbActiveModal,
    private toasterService: ToasterService,
    private visitPlanService: VisitPlanService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.getDropdownInvoice(this.idUser);
    this.dataForm = this.fb.group({
      invoice_id: [{value: [], disabled: false}],
    });
    this.hideSaveButton = false;
  }

  proses() {
    let dataInvoice: InvoiceData[] = this.dataForm.controls['invoice_id'].value;
    if (dataInvoice.length === 0) {
      this.toasterService.popAsync('error', 'Cannot add invoice', 'Please add at least one invoice!');
    } else {
      this.visitPlanService.addNewInvoice(this.idVisitPlan, dataInvoice).subscribe((data: any) => {
        this.hideSaveButton = true;
        this.toasterService.popAsync('success', 'Success', 'Success Add Invoice');
        setTimeout(() => {
          location.reload();
        }, 2000);
      }, error => {
        console.info("Error Dari Back End", error);
      });
    }
    //   location.reload();
  }

  ngSelectSearchInvoice(term, item) {
    let availableItem = null;
    const searchValue = new RegExp(term, 'i');
    if (searchValue.test(item.invoice_code) || searchValue.test(item.customer_name) || searchValue.test(item.customer_code)) {
      availableItem = item;
    }
    return availableItem;
  }

  dataInvoiceDelete(id) {
    // find index form array or object then delete that index
    let data = this.dataForm.controls['invoice_id'].value;
    const index = data.findIndex(item => item.id_invoice === id);
    data.splice(index, 1);

    if (this.invoiceSearchResult.length != 0) {
      const index_search = this.invoiceSearchResult.findIndex(item => item.id_invoice === id);
      this.invoiceSearchResult.splice(index_search, 1);
    }
    this.dataForm.patchValue({
      invoice_id: data,
    });
  }

  addInvoice() {
    const listOldInvoice: InvoiceData[] = this.dataInvoice;
    const cekOldInvoice: InvoiceData | null = listOldInvoice.find((x: InvoiceData) => x.id_invoice == this.invoice_id);
    const data = this.dropdownInvoice.find(x => x.invoice_code == this.invoice_id);
    // const destination: Destination[] = this.dataForm.controls['destination'].value;
    // const isInDestination = destination.find(x => x.customer_code == data.customer_code);
    // const canSelectInvoice = typeof isInDestination != 'undefined';
    if (cekOldInvoice == null) {
      if (data.customer_name) {
        const invoiceExist = this.invoiceList.find(x => x.id_invoice == this.invoice_id);
        const isNotExist = typeof invoiceExist == 'undefined';
        if (isNotExist) {
          // Aktifkan ini jika ingin guard Invoice berdasarkan destinasi yang telah di pilih
          // if (canSelectInvoice) {
          this.invoiceList.push({
            id_invoice: this.invoice_id,
            is_confirm: 0,
            customer_name: data.customer_name,
          });
          this.dataForm.patchValue({
            invoice_id: this.invoiceList,
          });
          // } else {
          //   this.toasterService.popAsync('error', 'Cannot add the invoice', 'Selected invoice ' + this.invoice_id + ' doesn\'t included in destination');
          // }
        } else {
          this.toasterService.popAsync('error', 'Cannot add the invoice', 'Selected invoice ' + this.invoice_id + ' have been added');
        }

      } else {
        this.toasterService.popAsync('error', 'Cannot add the invoice', 'Selected invoice ' + this.invoice_id + ' have no customer');
      }
    } else {
      this.toasterService.popAsync('error', 'Cannot add the invoice', 'Selected invoice ' + this.invoice_id + ' already added!');
    }
  }

  getDropdownInvoice(userId, firstTime: boolean = false) {
    this.invoice_id = null;
    this.dropdownInvoice = [];
    if (userId != null) {
      this.visitPlanService.get_user(userId)
        .pipe(untilDestroyed(this))
        .subscribe(res => {
          const userData = res.data;
          const division_id = userData.division_id;

          this.invoiceLoading = true;
          this.visitPlanService.dropdownInvoice(division_id)
            .pipe(untilDestroyed(this))
            .subscribe(resp => {
              this.invoiceLoading = false;
              const dataInvoice = resp.data.data;
              let dataInvoiceDropdown = [];
              let key;
              for (key of dataInvoice) {
                const combinedName = (key.customer.name) ? key.customer.name : 'Customer Not Found';
                dataInvoiceDropdown.push({
                  invoice_code: key.code,
                  customer_name: key.customer.name,
                  combined_name: key.code + ' - ' + combinedName + ` [ ${key.customer_code} ]`,
                  customer_code: key.customer_code,
                });
              }
              this.dropdownInvoice = dataInvoiceDropdown;
            }, errors => {
              this.invoiceLoading = false;
            });
        }, errors => {
        });
    } else {
      this.dropdownInvoice = [];
    }
  }

  closeModal() {
    this.activeModal.close();
    this.activeModal.dismiss();
  }
}

interface InvoiceData {
  id_invoice: string;
  is_confirm: number;
  customer_name: string;
}
