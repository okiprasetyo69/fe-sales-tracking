import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import * as randomColor from 'random-color';
import {ChartDataVariable} from 'app/abstract/ChartData';

@Component({
  selector: 'vertical-bar-stacked',
  templateUrl: './vertical-bar-stacked.component.html',
  styleUrls: ['./vertical-bar-stacked.component.scss']
})
export class VerticalBarStackedComponent implements OnDestroy {

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
        // responsive: true,
        maintainAspectRatio: false,
        elements: {
          rectangle: {
            borderWidth: 2,
          },
        },
        scales: {
          yAxes: [
            { 
              stacked: true,
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
              stacked: true,
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
          position: 'top',
          labels: {
            fontColor: chartjs.textColor,
          },
        },
      };
    });
  }

  emit(data, legends:any) {
    let x, allData;
    allData = [];
    let arrLabel = [];
    let arrDtime = [];
    let arrVtime = [];
    for (x of data) {
      const keyName = Object.keys(x);
      const firstKey = keyName[0];
      // if zero value then skip
      let timev;
      timev = x[firstKey].visit_time;
      if (timev != ''){
        arrLabel.push(firstKey);
        arrDtime.push(x[firstKey].driving_time);
        arrVtime.push(x[firstKey].visit_time);
      }
    }
    allData = [{
      // label: 'drive',
      backgroundColor: randomColor().hexString(),
      data : arrDtime
    },{
      // label: 'visit',
      backgroundColor: randomColor().hexString(),
      data : arrVtime
    }]
    
    for (var l=0; l<legends.length; l++){
      allData[l].label = legends[l];
    }

    this.labels = arrLabel;
    this.datasets = allData;
    this.data = {
      labels: arrLabel,
      datasets: allData
    };

    // end of function  */

    // sampel data
    // allData = [{
    //     label: 'driving time',
    //     backgroundColor: "#caf270",
    //     data: [12, 59, 5, 56, 58,12, 59, 87, 45],
    // }, {
    //     label: 'visit time',
    //     backgroundColor: "#45c490",
    //     data: [12, 59, 5, 56, 58,12, 59, 85, 23],
    // }]   
    
  }

  emitVisitCategory(data, legends) {
    let x, allData;
    allData = [];
    let arrLabel = [];
    let cari_info = [];
    let closing_order = [];
    let confirm_order = [];
    let follow_up = [];
    let menawarkan = [];
    let negosiasi = [];
    let presentasi = [];
    let prospecting = [];
    let telp_proyek = [];

    for (x of data) {
      const keyName = Object.keys(x);
      const firstKey = keyName[0];
      arrLabel.push(firstKey);
      cari_info.push(x[firstKey].cari_info);
      closing_order.push(x[firstKey].closing_order);
      confirm_order.push(x[firstKey].confirm_order);
      follow_up.push(x[firstKey].follow_up);
      menawarkan.push(x[firstKey].menawarkan);
      negosiasi.push(x[firstKey].negosiasi);
      presentasi.push(x[firstKey].presentasi);
      prospecting.push(x[firstKey].prospecting);
      telp_proyek.push(x[firstKey].telp_proyek);
    }
    
    allData = [{
        backgroundColor: randomColor().hexString(),
        data : cari_info
      },
      {
        backgroundColor: randomColor().hexString(),
        data : closing_order
      },
      {
        backgroundColor: randomColor().hexString(),
        data : confirm_order
      },
      {
        backgroundColor: randomColor().hexString(),
        data : follow_up
      },
      {
        backgroundColor: randomColor().hexString(),
        data : menawarkan
      },
      {
        backgroundColor: randomColor().hexString(),
        data : negosiasi
      },
      {
        backgroundColor: randomColor().hexString(),
        data : presentasi
      },
      {
        backgroundColor: randomColor().hexString(),
        data : prospecting
      },
      {
        backgroundColor: randomColor().hexString(),
        data : telp_proyek
      }
    ]
    
    for (var l=0; l<legends.length; l++){
      allData[l].label = legends[l];
    }

    this.labels = arrLabel;
    this.datasets = allData;
    this.data = {
      labels: arrLabel,
      datasets: allData
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

      // if zero value then skip
      console.info(keyName + " | " + firstKey + " | " +  insideFirstKey );

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

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  private random() {
    return Math.round(Math.random() * 100);
  }

}
