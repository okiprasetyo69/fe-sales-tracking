///<reference path="../../../configs/configs.ts"/>
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms'
import { ToasterService } from 'angular2-toaster'
import { ActivatedRoute, Router } from '@angular/router'
import { Location } from '@angular/common'
import { label_data_save } from '../../../configs/configs';

@Component({
  selector: 'ngx-form-import',
  templateUrl: './form-import.component.html',
  styleUrls: ['./form-import.component.scss'],
})
export class FormImportComponent implements OnInit {
  loading: boolean = false;
  fileToUpload: File = null;
  @Input() service;
  @Input() title: String;
  @Input() is_employee: false;
  @Input() feature: String;
  dataName = label_data_save.saving;


  constructor(
    private fb: FormBuilder,
    private toasterService: ToasterService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
  ) {
  }

  ngOnInit() {
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  back() {
    this.location.back();
  }

  uploadFileToActivity() {
    if (this.fileToUpload == null) {
      this.toasterService.popAsync('error', 'Error', 'Please choose file before uploading.');
    } else {
      this.loading = true;
      try {
        if (this.is_employee) {
          this.service.postFile(this.fileToUpload, this.feature).subscribe(data => {
            this.successImportToaster(data);
          }, errors => {
            this.errorImportToaster(errors);
          });
        } else {
          this.service.postFile(this.fileToUpload).subscribe(data => {
            this.successImportToaster(data);
          }, errors => {
            this.errorImportToaster(errors);
          });
        }
      } catch (ex) {
        this.loading = false;
        this.toasterService.popAsync('error', 'Error', 'Import ' + this.title + ' not available.');
        console.info('Error On : ', ex);
      }
    }
  }

  private successImportToaster(data) {
    let successMessage = '';
    if (data && data.message) {
      successMessage = data.message + ' (' + this.title + ')';
    } else {
      successMessage = this.title + ' imported successfully';
    }
    this.toasterService.popAsync('success', 'Success', successMessage);
    this.loading = false;
  }

  private errorImportToaster(errors) {
    const errorMessage = errors.error.message;
    if(errorMessage.search("duplicate") >= 1){
      this.toasterService.popAsync('error', 'Create window confirm replace ' + this.title, errorMessage);
      this.loading = false;
    }else{
      this.toasterService.popAsync('error', 'Error Importing ' + this.title, errorMessage);
      this.loading = false;
    }
  }
}
