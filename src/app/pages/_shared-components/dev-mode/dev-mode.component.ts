import {Component, Input, OnInit} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {ClipboardService} from 'ngx-clipboard'

@Component({
  selector: 'ngx-dev-mode',
  templateUrl: './dev-mode.component.html',
  styleUrls: ['./dev-mode.component.scss'],
})
export class DevModeComponent implements OnInit {
  env = environment;
  @Input() dataJson: any;
  @Input() title?: string = 'Developer Mode';
  @Input() withTitle: boolean = true;

  constructor(private _clipboardService: ClipboardService) {
  }

  ngOnInit() {
  }

  copy() {
    this._clipboardService.copyFromContent(JSON.stringify(this.dataJson));
  }

}
