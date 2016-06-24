import { Component, Input } from '@angular/core';
import { HighchartComponent } from '../highchart';
import { ChartData } from '../shared/';

@Component({
  moduleId: module.id,
  selector: 'voco-spider-chart',
  templateUrl: 'spider-chart.component.html',
  styleUrls: ['spider-chart.component.css'],
  directives: [HighchartComponent]
})
export class SpiderChartComponent {

  htData: any;

  @Input() set data(val: ChartData) {
    let cat = (val.series || [])[0];
    this.htData = !val ? null : {
      chart: {
        polar: true,
        type: "line"
      },
      title: { text: val.title },
      xAxis: {
        title: {
          text: "Vowels / Consonants"
        },
        categories : cat ? cat.items.map(m => m.tick) : [],
        tickmarkPlacement: "on",
        lineWidth: 0,
        type: "category"
      },
      yAxis: {
        title: {
            text: "Number of"
        },
        gridLineInterpolation: "polygon"
      },
      tooltip: {
        shared: true,
        pointFormat: "<span><b>{point.y:,.0f}</b></span>"
      },
      plotOptions: {
        series: {
          animation: true
        }
      },
      legend: {
        align: 'right',
        verticalAlign: 'top',
        y: 70,
        layout: 'vertical'
      },
      series: val.series.map(m => ({
          name : m.name,
          data : m.items.map(m => m.value),
          pointPlacement: 'on'
      })),
      credits: {
        enabled: false
      }
    };
  }
}
