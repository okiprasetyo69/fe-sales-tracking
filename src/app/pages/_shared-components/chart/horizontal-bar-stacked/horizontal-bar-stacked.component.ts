import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Chart} from 'chart.js';
import {NbThemeService} from '@nebular/theme';
import * as randomColor from 'random-color';
import {ChartDataVariable} from 'app/abstract/ChartData';

@Component({
  selector: 'ngx-horizontal-bar-stacked',
  templateUrl: './horizontal-bar-stacked.component.html',
  styleUrls: ['./horizontal-bar-stacked.component.scss'],
})
export class HorizontalBarStackedComponent implements OnDestroy {
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
          xAxes: [{
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
                beginAtZero: true,
              },
              scaleLabel: {
                display: false
              },
              stacked: true,
            }],
          yAxes: [{
              gridLines: {
                display: false,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
                beginAtZero: true,
              },
              scaleLabel: {
                display: false
              },
              stacked: true,
            }],
        },
        legend: {
          position: 'top',
          labels: {
            fontColor: chartjs.textColor,
          },
        },
        tooltips:{
          callbacks: {
            title: function(tooltipItem, data) { 
              console.info("tooltip : ", tooltipItem , " data : ", data);
            }
          }
        }
      };
    });
  }

  emit(data) {
    console.info("emit stacked ", data);
    this.labels = []; // label dikosongkan
    let allData = [];

    for (let d of data){
      allData.push({
        label: d.label,
        backgroundColor: randomColor().hexString(),
        borderWidth: 1,
        data: [d.value],
      });
    }

    this.data = {
      labels: this.labels,
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
