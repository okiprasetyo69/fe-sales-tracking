import { Component, OnInit , EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';
import { AbsenceService } from '../../../../services/absence.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import * as fileSaver from 'file-saver';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'ngx-filter-absences-check-in',
  templateUrl: './filter-absences-check-in.component.html',
  styleUrls: ['./filter-absences-check-in.component.scss']
})
export class FilterAbsencesCheckInComponent implements OnInit {

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

  exportCheckInAbsence(){
   
    const date_start = this.dataFormCloned.controls['date_start'].value;
    const current_date_end = this.dataFormCloned.controls['date_end'].value;
    //alert(current_date_start)
    this.toasterService.popAsync('info', 'Start Download', 'Generating, Please wait...');
    this.absenceService.exportReportCheckIn(date_start)
    .subscribe(data => {
        fileSaver.saveAs(data, 'Report_Check_In_Users.xlsx');
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
