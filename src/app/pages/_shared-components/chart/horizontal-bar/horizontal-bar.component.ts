import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Chart} from 'chart.js';
import {NbThemeService} from '@nebular/theme';
import * as randomColor from 'random-color';
import {ChartDataVariable} from 'app/abstract/ChartData';

@Component({
  selector: 'ngx-horizontal-bar',
  templateUrl: './horizontal-bar.component.html',
  styleUrls: ['./horizontal-bar.component.scss'],
})
export class HorizontalBarComponent implements OnDestroy {
  data: any;
  options: any;
  themeSubscription: any;

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
          xAxes: [
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
          yAxes: [
            {
              gridLines: {
                display: false,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
                beginAtZero: true,
              },
            },
          ],
        },
        legend: {
          position: 'right',
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
      // @TODO: belum dapat menghandel jika si jumlah declaredKey tidak sama dengan jumlah insideKey
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

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  private random() {
    return Math.round(Math.random() * 100);
  }
}
