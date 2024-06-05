import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';
import { AbsenceService } from '../../../../services/absence.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { ToasterService } from 'angular2-toaster';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'ngx-filter-absences-date-range',
  templateUrl: './filter-absences-date-range.component.html',
  styleUrls: ['./filter-absences-date-range.component.scss']
})
export class FilterAbsencesDateRangeComponent implements OnInit {

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

  exportNow(){
 
    const date_start = this.dataFormCloned.controls['date_start'].value;
    const date_end = this.dataFormCloned.controls['date_end'].value;

    //alert(current_date_start +' - '+ current_date_end)
    if(date_end < date_start) {
      return this.toasterService.pop('Info', 'Date End must greater than Date Start ! ')
    } else {
      this.toasterService.popAsync('info', 'Start Download', 'Generating, Please wait...');
      this.absenceService.exportRangeAbsences(date_start, date_end)
      .subscribe(data => {
          fileSaver.saveAs(data, 'Report_Absence_Users.xlsx');
          this.toasterService.popAsync('success', 'Success', 'Ready to download')
        }, errors => {
          let errorMessage = 'Something wrong with error: ' + errors.message;
          if (errors.error && errors.error.message) {
              errorMessage = errors.error.message;
          }
          console.info('ada error export data:', errors);
          this.toasterService.popAsync('error', 'Error', errorMessage);
        },
        () => console.info('Completed file download.')
      )
      this.closeModal()
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
