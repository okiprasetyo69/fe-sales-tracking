import {
  Component,
  ElementRef,
  Input, OnDestroy,
  ViewChild,
} from '@angular/core';
import { Chart } from 'chart.js';
import { NbThemeService } from '@nebular/theme';
import * as randomColor from 'random-color';

@Component({
  selector: 'ngx-radar-chart',
  templateUrl: './radar.component.html',
  styleUrls: ['./radar.component.scss'],
})
export class RadarComponent implements OnDestroy {
  @ViewChild('radarChart') radarId: ElementRef;
  fontColor: any = '#000';
  radarChart: any = null;
  @Input() radarValue = [];
  
  label = ['Loading'];
  value = [1];
  color = ['red'];
  radarCtx;
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
          position: 'top',
        },
        scaleOverride: true,
        scaleStartValue:0,
        scaleSteps:1
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  emitingData(radarValue) {
    this.convertValue(radarValue);
  }

  convertValue(radarValue) {
    this.label = [];
    this.value = [];
    this.color = [];
    let x, color;

    // custom

    for (x of radarValue) {
      let c = randomColor();
      this.label.push(x.label);
      this.value.push(x.value);
      // if (typeof x.color != 'undefined') {
      //   color = x.color;
      // }
      // this.color.push(c.hexString());
      this.color = randomColor().hexString();
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
