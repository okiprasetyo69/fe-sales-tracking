import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from "@angular/router";
// import { ToasterService } from "angular2-toaster";
// import { Location } from "@angular/common";
// import { FormBuilder } from "@angular/forms";
import { PackingSlipService } from "../../../../services/packing-slip.service";

@Component({
  selector: 'packing-slip-import',
  templateUrl: './packing-slip-import.component.html',
  styleUrls: ['./packing-slip-import.component.scss']
})
export class PackingSlipImportComponent implements OnInit {
  constructor(
    public packingSlipService: PackingSlipService,
  ){

  }

  ngOnInit(){

  }
}

// export class PackingSlipImportComponent implements OnInit {

//   loading: boolean = false;
//   fileToUpload: File = null;

//   constructor(
//     private fb: FormBuilder,
//     public packingSlipService: PackingSlipService,
//     private toasterService: ToasterService,
//     private router: Router,
//     private route: ActivatedRoute,
//     private location: Location,
//   ) {
//   }

//   ngOnInit() {
//   }

//   handleFileInput(files: FileList) {
//     this.fileToUpload = files.item(0);
//   }

//   back() {
//     this.location.back();
//   }

//   uploadFileToActivity() {
//     // console.log(this.fileToUpload);
//     if (this.fileToUpload == null) {
//       this.toasterService.popAsync('error', 'Error', 'Please Choose File Before Uploading');
//     } else {
//       this.loading = true;
//       this.packingSlipService.postFile(this.fileToUpload).subscribe(data => {
//         this.toasterService.popAsync('success', 'Success', 'Packing slip data has been saved');
//         this.loading = false;
//         setTimeout(() => {
//           this.router.navigate(['/pages/logistic/activities/packing_slip/index']);
//         }, 1000);
//       }, errors => {
//         const errorMessage = errors.error.message;
//         this.toasterService.popAsync('error', 'Error', errorMessage);
//         this.loading = false;
//       });
//     }
//   }

// }
