import {
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  Input, OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Chart } from 'chart.js';
import { NbThemeService } from '@nebular/theme';
// 
import * as randomColor from 'random-color';

@Component({
  selector: 'ngx-pie-chart',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss'],
})
export class PieComponent implements OnDestroy {
  @ViewChild('pieChart') pieId: ElementRef;
  fontColor: any = '#000';
  pieChart: any = null;
  @Input() pieValue = [];
  label = ['Loading'];
  value = [100];
  color = ['red'];
  pieCtx;
  alphaGridLines = 0.1;
  globalColor = Chart.helpers.color;



  data: any;
  options: any;
  themeSubscription: any;

  constructor(private theme: NbThemeService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      this.data = {
        labels: this.label,
        datasets: [{
          data: this.value,
          backgroundColor: this.color,
        }],
      };

      this.options = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [
            {
              display: false,
            },
          ],
          yAxes: [
            {
              display: false,
            },
          ],
        },
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
          position: 'bottom',
          align: 'center',
        },
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  emitingData(pieValue) {
    this.pieValue = pieValue;
    this.convertValue(this.pieValue);
  }

  convertValue(pieValue) {
    this.label = [];
    this.value = [];
    this.color = [];
    let x, color;

    // custom

    for (x of pieValue) {
      let c = randomColor();

      this.label.push(x.label);
      this.value.push(x.value);
      if (typeof x.color != 'undefined') {
        color = x.color;
      }
      this.color.push(c.hexString());
    }
    this.data = {
      labels: this.label,
      datasets: [{
        data: this.value,
        backgroundColor: this.color,
      }],
    };
  }  

}
