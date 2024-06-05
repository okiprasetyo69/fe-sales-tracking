import { Component, OnInit } from '@angular/core';
import { BranchService } from '../../../../services/branch.service';

@Component({
  selector: 'ngx-branch-import',
  templateUrl: './branch-import.component.html',
  styleUrls: ['./branch-import.component.scss'],
})
export class BranchImportComponent implements OnInit {

  constructor(
    public branchService: BranchService,
  ) { }

  ngOnInit() {
  }

}
