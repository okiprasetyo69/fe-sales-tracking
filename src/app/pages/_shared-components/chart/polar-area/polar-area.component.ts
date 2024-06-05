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
  selector: 'ngx-polar-area-chart',
  templateUrl: './polar-area.component.html',
  styleUrls: ['./polar-area.component.scss'],
})
export class PolarAreaComponent implements OnDestroy {
  @ViewChild('polarChart') polarId: ElementRef;
  fontColor: any = '#000';
  radarChart: any = null;
  @Input() polarValue = [];
  
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
        scaleSteps:1,
        scaleStepWidth: 1,
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  emitingData(polarValue) {
    this.convertValue(polarValue);
  }

  convertValue(polarValue) {
    this.label = [];
    this.value = [];
    this.color = [];
    let x, color;

    // custom

    for (x of polarValue) {
      const colorRandom = randomColor();
      this.label.push(x.label);
      this.value.push(x.value);
      this.color.push(colorRandom.hexString());
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
