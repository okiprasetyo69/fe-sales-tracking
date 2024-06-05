import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import * as randomColor from 'random-color';
import {ChartDataVariable} from 'app/abstract/ChartData';

@Component({
  selector: 'ngx-vertical-bar',
  templateUrl: './vertical-bar.component.html',
  styleUrls: ['./vertical-bar.component.scss'],
})
export class VerticalBarComponent implements OnDestroy {
  data: any;
  options: any;
  themeSubscription: any;
  positionLabel: string = "right";

  // Data yang hanya inisialisai pertama kali
  labels = ['Loading...'];
  colorsGlobal: any;
  datasets = [
    {
      label: '',
      backgroundColor: randomColor().hexString(),
      borderWidth: 1,
      data: [],
    }, {
      label: '',
      backgroundColor: randomColor().hexString(),
      data: [],
    },
  ];
  dataTemp = [];

  constructor(private theme: NbThemeService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      this.colorsGlobal = colors;
      this.data = {
        labels: this.labels,
        datasets: this.datasets,
      };

      this.options = {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          rectangle: {
            borderWidth: 2,
          },
        },
        scales: {
          yAxes: [
            {
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
                beginAtZero: true,
                userCallback: function (label, index, labels) {
                  // when the floored value is the same as the value we have a whole number
                  if (Math.floor(label) === label) {
                    return label;
                  }

                },
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
                beginAtZero: true,
                maxRotation:0,
                minRotation:0,
                autoSkip: false,
                stepSize: 1,
              },
            },
          ],
        },
        legend: {
          position: this.positionLabel,
          labels: {
            fontColor: chartjs.textColor,
          },
        },
      };
    });
  }

  emit(data, labels: ChartDataVariable[]) {
    let x, y, z, dataArray, allData, allLabel, counted;
    dataArray = [];
    allData = [];
    allLabel = [];
    counted = -1;
    for (x of labels) {
      counted = counted + 1;
      dataArray[x.name] = [];
    }
    for (x of data) {
      const keyName = Object.keys(x);
      const firstKey = keyName[0];
      const insideFirstKey = Object.keys(x[firstKey]);
      let count;
      count = -1;
      allLabel.push(firstKey);
      const declaredKey = Object.keys(dataArray);      
      for (y of insideFirstKey) {
        count = count + 1;
        const namaKey = declaredKey[count];
        dataArray[namaKey].push(x[firstKey][y]);
      }
    }

    for (z of labels) {
      const colorRandom = randomColor();
      if (!z.isHide) {
        allData.push({
          label: z.name,
          backgroundColor: colorRandom.hexString(),
          borderWidth: 1,
          data: dataArray[z.name],
        });
      }
    }

    this.labels = allLabel;
    this.datasets = allData;
    this.data = {
      labels: allLabel,
      datasets: allData,
    };
  }

  emits(data, labels: ChartDataVariable[], positionLabel) {
    let x, y, z, dataArray, allData, allLabel, counted;
    dataArray = [];
    allData = [];
    allLabel = [];
    counted = -1;
    for (x of labels) {
      counted = counted + 1;
      dataArray[x.name] = [];
    }
    for (x of data) {
      const keyName = Object.keys(x);
      const firstKey = keyName[0];
      const insideFirstKey = Object.keys(x[firstKey]);
      let count;
      count = -1;
      allLabel.push(firstKey);
      const declaredKey = Object.keys(dataArray);      
      for (y of insideFirstKey) {
        count = count + 1;
        const namaKey = declaredKey[count];
        dataArray[namaKey].push(x[firstKey][y]);
      }
    }

    for (z of labels) {
      const colorRandom = randomColor();
      if (!z.isHide) {
        allData.push({
          label: z.name,
          backgroundColor: colorRandom.hexString(),
          borderWidth: 1,
          data: dataArray[z.name],
        });
      }
    }

    if(positionLabel != ''){
      this.options.legend.position = positionLabel;
    }
    this.labels = allLabel;
    this.datasets = allData;
    this.data = {
      labels: allLabel,
      datasets: allData,
    };
  }

  emitp(data, labels: ChartDataVariable[], positionLabel) {
    let x, y, z, dataArray, allData, allLabel, counted;
    dataArray = [];
    allData = [];
    allLabel = [];
    counted = -1;
    for (x of labels) {
      counted = counted + 1;
      dataArray[x.name] = [];
    }
    for (x of data) {
      const keyName = Object.keys(x);
      const firstKey = keyName[0];
      const insideFirstKey = Object.keys(x[firstKey]);
      let count;
      count = -1;
      allLabel.push(firstKey);
      const declaredKey = Object.keys(dataArray);      
      for (y of insideFirstKey) {
        count = count + 1;
        const namaKey = declaredKey[count];
        dataArray[namaKey].push(x[firstKey][y]);
      }
    }

    for (z of labels) {
      const colorRandom = randomColor();
      if (!z.isHide) {
        allData.push({
          label: z.name,
          backgroundColor: colorRandom.hexString(),
          borderWidth: 1,
          data: dataArray[z.name],
        });
      }
    }

    if(positionLabel != ''){
      this.positionLabel = positionLabel;
    }
    this.options.legend.position = this.positionLabel;
    this.labels = allLabel;
    this.datasets = allData;
    this.data = {
      labels: allLabel,
      datasets: allData,
    };
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  private random() {
    return Math.round(Math.random() * 100);
  }
}
