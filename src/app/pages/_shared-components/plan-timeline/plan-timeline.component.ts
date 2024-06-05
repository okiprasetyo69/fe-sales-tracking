import { Component, Input, OnInit } from '@angular/core';
import { DeliveryPlanReport, PlanActivity, VisitPlanReport } from '@Model/response-plan';
import { formatDate } from '@angular/common';
import { DestinationOrder } from '@Model/response-destionation-order';

@Component({
  selector: 'ngx-plan-timeline',
  templateUrl: './plan-timeline.component.html',
  styleUrls: ['./plan-timeline.component.scss'],
})
export class PlanTimelineComponent implements OnInit {
  @Input() Plan: VisitPlanReport | DeliveryPlanReport;
  dataDestination: PlanActivity[] = [];
  dataDifference = [];
  @Input() oldWay: boolean = true;

  constructor() {
  }

  ngOnInit() {
    if (this.oldWay) {
      this.reloadData();
    } else {
      this.reloadDataNew();
    }
  }

  reloadData() {
    const dataActivity = this.Plan.data_activity;
    const dataOrder: DestinationOrder[] = this.Plan.destination_order;

    let listActivity, listDestination, listCombined, listTimeDifference;
    listActivity = [];
    listDestination = [];
    listCombined = [];
    listTimeDifference = [];
    // Membuat List Destination dari Daftar Destination dan Start + End Destination
    for (const x of this.Plan.destination) {
      const dataAssign = {
        customer_name: x.customer_name,
        customer_code: x.customer_code,
        address: x.address,
      };
      listDestination.push(dataAssign);
    }
    // Menyiapkan Data Start + End Destination
    const startDestinationData = this.Plan.start_route_branch;
    const endDestinationData = this.Plan.end_route_branch;
    const startBranchCode = this.Plan.start_route_branch_id;
    const endBranchCode = this.Plan.end_route_branch_id;

    const dataAssignStart = {
      customer_name: startDestinationData['name'],
      customer_code: startBranchCode,
      address: startDestinationData['address'],
    };

    const dataAssignEnd = {
      customer_name: endDestinationData['name'],
      customer_code: endBranchCode,
      address: endDestinationData['address'],
    };
    listDestination.push(dataAssignStart);
    listDestination.push(dataAssignEnd);
    // Memasukan Seluruh isi Aktivity
    const allActivity = Object.entries(dataActivity);

    for (const x of allActivity) {
      let dataNew;
      dataNew = {};
      Object.assign(dataNew, {id: x[0]});
      Object.assign(dataNew, x[1]);
      console.info(dataNew);
      listActivity.push(dataNew);
    }

    // Mencari dan menggabungkan data destination + data order + data activity
    let counter = 0;
    for (const x of dataOrder) {
      const dataDestination = listDestination.find(y => y.customer_code == x.nfc_code);
      const dataOneActivity = listActivity.find(z => z.id == x.nfc_code);
      let dataAssigned, dataTime, start_time, stop_time, status_destination;
      dataAssigned = {};
      dataTime = 'Belum Dikunjungi';
      status_destination = '';
      start_time = '';
      stop_time = '';
      if (typeof dataOneActivity != 'undefined') {
        if (typeof dataOneActivity['start_time'] != 'undefined' || typeof dataOneActivity['stop_time'] != 'undefined') {
          status_destination = 'Start / End';
          dataTime = formatDate(dataOneActivity['start_time'], 'h:mm a', 'en');
          start_time = (typeof dataOneActivity['start_time'] != 'undefined') ? formatDate(dataOneActivity['start_time'], 'hh:mm a', 'en') : '';
          stop_time = (typeof dataOneActivity['stop_time'] != 'undefined') ? formatDate(dataOneActivity['stop_time'], 'hh:mm a', 'en') : '';
        } else if (typeof dataOneActivity['in_time'] != 'undefined' || typeof dataOneActivity['out_time'] != 'undefined') {
          status_destination = 'Customer Destination';
          start_time = (typeof dataOneActivity['in_time'] != 'undefined') ? formatDate(dataOneActivity.in_time, 'hh:mm a', 'en') : '';
          stop_time = (typeof dataOneActivity['out_time'] != 'undefined') ? formatDate(dataOneActivity.out_time, 'hh:mm a', 'en') : '';
          dataTime = (typeof dataOneActivity['in_time'] != 'undefined') ? formatDate(dataOneActivity.in_time, 'hh:mm a', 'en') : 'XX:XX';
          dataTime += ' - '.concat((typeof dataOneActivity['out_time'] != 'undefined') ? formatDate(dataOneActivity.out_time, 'h:mm a', 'en') : 'XX:XX');
        }
      }
      Object.assign(dataAssigned, x);
      Object.assign(dataAssigned, dataDestination);
      Object.assign(dataAssigned, {time: dataTime});
      Object.assign(dataAssigned, {status_destination: status_destination});
      Object.assign(dataAssigned, {start_time: start_time});
      Object.assign(dataAssigned, {stop_time: stop_time});
      listCombined.push(dataAssigned);
      counter += 1;
    }

    let counterForeach = 0;
    let storedValueHourTime = 0;
    let storedValueMinuteTime = 0;
    let storedResultValueStringTimeDifference = '';
    let isStartEnd = true;
    let statusPassData = true;
    let statusStringCount = '';
    // Menghitung Waktu
    for (let x of listCombined) {
      let resultsHourTime, resultsMinuteTime, timeMinute, timeHour, timeString, moreThanOneHour, stringCount;
      resultsHourTime = 0;
      resultsMinuteTime = 0;
      timeMinute = 0;
      timeHour = 0;
      timeString = '';
      moreThanOneHour = 0;
      stringCount = '';
      const radix = 10;
      // console.info('Perbedaan Waktu : ', x, ',', counterForeach);

      if (counterForeach == 0) {
        // Start
        timeString = (x.start_time == '') ? '' : x.start_time;
        stringCount = 'Start';
      } else if (counterForeach == (listCombined.length - 1)) {
        // End
        timeString = (x.stop_time == '') ? '' : x.stop_time;
        stringCount = 'End';
      } else {
        // Waktu Setiap Customer
        if (isStartEnd) {
          timeString = (x.start_time == '') ? '' : x.start_time;
          stringCount = 'Start - Customer ( ' + timeString + ' )';
          isStartEnd = false;
        } else {
          timeString = (x.stop_time == '') ? '' : x.stop_time;
          stringCount = 'End - Customer ( ' + timeString + ' )';
          isStartEnd = true;
        }
      }

      if (timeString != '' && timeString != 'Kosong' && timeString != null) {
        const dataSplitTime = timeString.split(' '); // Memisahkan Waktu dengan Tanda Waktu [Waktu] [Tanda Waktu]
        const dataTime = dataSplitTime[0].split(':'); // Memisahkan Menit dan Detik menjadi 2 Array [Menit]:[Detik]
        const dataTimeShift = dataSplitTime[1]; // Mendapatkan Data AM / PM dari String Waktu
        const hour = dataTime[0];
        const minute = dataTime[1];
        let valueTimeShift = 0;

        const is12AmPm = (hour === '12' && (dataTimeShift == 'AM' || dataTimeShift == 'PM'));
        if (!is12AmPm) {
          valueTimeShift = (dataTimeShift == 'PM') ? 12 : 0; // Mendapatkan Data AM / PM dalam bentuk angka
        } else {
          if (dataTimeShift == 'AM') {
            valueTimeShift = 12;
          }
        }
        timeHour = parseInt(hour, radix) + valueTimeShift; // Mendapatkan Jam dan Konversi Ke 24 Jam
        timeMinute = parseInt(minute, radix); // Mendapatkan Menit
      } else {
        console.info('Masuk Ke Else');
      }


      if (counterForeach != 0) {
        if (timeString != '') {
          if (storedValueHourTime > timeHour) {
            storedResultValueStringTimeDifference = 'Error';
          } else {
            if (storedValueMinuteTime != 0) {
              resultsMinuteTime = Math.abs(((storedValueMinuteTime != 0) ? (60 - storedValueMinuteTime) : 0) + ((timeMinute != 0) ? timeMinute : 0));
            }

            if (resultsMinuteTime >= 60) {
              moreThanOneHour += 1;
              resultsMinuteTime = resultsMinuteTime - 60;
            }

            if (storedValueHourTime != 0) {
              resultsHourTime = Math.abs(((storedValueHourTime != 0) ? (storedValueHourTime + 1) : 0) - ((timeHour != 0) ? (timeHour + moreThanOneHour) : 0));
            }

            if (((storedValueHourTime != 0) ? (storedValueHourTime + 1) : 0) > (((timeHour != 0) ? (timeHour + moreThanOneHour) : 0))) {
              storedResultValueStringTimeDifference = 'Error';
            } else {
              storedResultValueStringTimeDifference = ((resultsHourTime != 0) ? resultsHourTime + ' Jam ' : '').concat((resultsMinuteTime != 0) ? resultsMinuteTime + ' Menit' : '');
            }
          }
        } else {
          console.info('Kosong');
          storedResultValueStringTimeDifference = '';
        }
        listTimeDifference.push({difference: storedResultValueStringTimeDifference});
      }

      // Prosses yang diulang
      if (counterForeach == 0) {
      } else if (counterForeach == (listCombined.length - 1)) {
      } else {
        // Waktu Setiap Customer
        if (isStartEnd) {
          timeString = (x.start_time == '') ? '' : x.start_time;
          stringCount = 'Start - Customer ( ' + timeString + ' )';
          isStartEnd = false;
        } else {
          timeString = (x.stop_time == '') ? '' : x.stop_time;
          stringCount = 'End - Customer ( ' + timeString + ' )';
          isStartEnd = true;
        }
      }

      if (timeString != '' && timeString != 'Kosong' && timeString != null) {
        const dataSplitTime = timeString.split(' '); // Memisahkan Waktu dengan Tanda Waktu [Waktu] [Tanda Waktu]
        const dataTime = dataSplitTime[0].split(':'); // Memisahkan Menit dan Detik menjadi 2 Array [Menit]:[Detik]
        const dataTimeShift = dataSplitTime[1]; // Mendapatkan Data AM / PM dari String Waktu
        const valueTimeShift = (dataTimeShift == 'PM') ? 12 : 0; // Mendapatkan Data AM / PM dalam bentuk angka
        timeHour = parseInt(dataTime[0], radix) + valueTimeShift; // Mendapatkan Jam dan Konversi Ke 24 Jam
        timeMinute = parseInt(dataTime[1], radix); // Mendapatkan Menit
      } else {
        console.info('Masuk Ke Else 2');
      }

      // Menyimpan ke Variable Local Function
      storedValueHourTime = timeHour;
      storedValueMinuteTime = timeMinute;
      // Increment setelah prosses di atas
      counterForeach += 1;
      statusStringCount = stringCount;
    }

    const originalDestinationOrder = listCombined;
    const originalDifferenceTime = listTimeDifference;
    // Me Reverse Data Destination dan Data Difference Time
    listCombined = [];
    for (let x = (originalDestinationOrder.length - 1); x >= 0; x--) {
      listCombined.push(originalDestinationOrder[x]);
    }

    listTimeDifference = [];
    for (let x = (originalDifferenceTime.length - 1); x >= 0; x--) {
      listTimeDifference.push(originalDifferenceTime[x]);
    }
    this.dataDestination = listCombined;
    this.dataDifference = listTimeDifference;
  }

  reloadDataNew() {
    console.info('Plan', this.Plan);
    console.info('Plan Activity', this.Plan.plan_activity);
    if (this.Plan.plan_activity.length != 0) {
      for (const x of this.Plan.plan_activity) {
        let data: PlanActivity;
        data = x;
        if (typeof x.start_time == 'undefined' || x.start_time == '') {
          data.start_time = this.getTimeOnly(x.in_time);
        } else {
          data.start_time = this.getTimeOnly(x.start_time);
        }

        if (typeof x.stop_time == 'undefined' || x.stop_time == '') {
          data.stop_time = this.  getTimeOnly(x.out_time);
        } else {
          data.stop_time = this.getTimeOnly(x.stop_time);
        }

        if (typeof x.distance != 'undefined') {
          data.distance = parseInt(x.distance.toString(), 10);
        } else {
          data.distance = 0;
        }
        this.dataDestination.push(data);
      }
      // this.Plan.plan_activity.forEach((x: PlanActivity) => {
      //
      // });
      this.dataDestination.reverse();
    }
  }

  getTimeOnly(dateData: String): string {
    if (dateData == null || dateData == '') {
      return '';
    } else {
      let date: Date;
      // @ts-ignore
      date = new Date(dateData);
      let result = date.getHours() + ':' + ((date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes());
      return (result == 'NaN:NaN') ? '' : result;
    }
  }
}
