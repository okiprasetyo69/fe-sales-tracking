import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';
import { AbsenceService } from '../../../../services/absence.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import * as fileSaver from 'file-saver';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'ngx-filter-absences',
  templateUrl: './filter-absences.component.html',
  styleUrls: ['./filter-absences.component.scss']
})
export class FilterAbsencesComponent implements OnInit {
  
  @Input() dataForm: FormGroup;
  @Input() userData: any;

  @Output() filterData: EventEmitter<any> = new EventEmitter();
  dataFormCloned: FormGroup;
  serverErrors = [];

  dropdownUserLoading = false;

  dataFilterBy = [
    {name: 'All Visit Plan', code: 1},
    {name: 'By Date Range', code: 2},
  ];

  filterByRange = false;

  dateConfigurationStart: INgxMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    appendSelectorToBody: true,
  };

  dateConfigurationEnd: INgxMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    appendSelectorToBody: true,
  };

  constructor(
    private activeModal: NgbActiveModal,
    private absenceService: AbsenceService,
    private toasterService: ToasterService,
  ) { }

  ngOnInit() {
    this.dataFormCloned = this.dataForm;
  }

  closeModal() {
    this.activeModal.close();
    this.activeModal.dismiss();
  }

  exportDailyAbsence(){
    const date_start = this.dataFormCloned.controls['date_start'].value;

    this.toasterService.popAsync('info', 'Start Download', 'Generating, Please wait...');
    this.absenceService.exportDailyAbsences(date_start)
    .subscribe(data => {
        fileSaver.saveAs(data, 'Report_Daily_Absence.xlsx');
        this.toasterService.popAsync('success', 'Success', 'Ready to download')
      }, errors => {
        let errorMessage = 'Something wrong with error: ' + errors.message;
        if (errors.error && errors.error.message) {
          errorMessage = errors.error.message;
        }
        console.info('ada error datatable:', errors);
        this.toasterService.popAsync('error', 'Error', errorMessage);
      },
      () => console.info('Completed file download.')
    )
    this.closeModal()
  }

  filterNow(){
    let dataError = [];
    let errorCounted = 0;
    const current_date_start = this.dataFormCloned.controls['date_start'].value;
    this.serverErrors = dataError;
    if (errorCounted == 0) {
      this.dataForm = this.dataFormCloned;
      this.filterData.emit(this.dataForm);
      this.activeModal.close();
      this.activeModal.dismiss();
    }
  }

  onDateStartChanged(event: IMyDateModel) {
    const value = {};
    if (event.epoc == 0) {
      value['date_start'] = null;
    } else {
      value['date_start'] = event.formatted;
    }
    this.dataFormCloned.patchValue(value);
  }

  onDateEndChanged(event: IMyDateModel) {
    const value = {};
    if (event.epoc == 0) {
      value['date_end'] = null;
    } else {
      value['date_end'] = event.formatted;
    }
    this.dataFormCloned.patchValue(value);
  }


}
