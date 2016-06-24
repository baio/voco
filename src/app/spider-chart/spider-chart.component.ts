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

    let getTickValues = (tick: string) =>
      val.series
      .map(m => m.items.filter(f => f.tick === tick).map(m => m.value))
      .reduce((a, b) => {
        return [...a, ...b]
      }, []);

    this.htData = !val ? null : {
      chart: {
        polar: true,
        type: "line"
      },
      title: {
          text: "Vowels / Consonants"
      },
      xAxis: {
        title: null,
        categories : val.series.map(m => m.name),
        tickmarkPlacement: "on",
        lineWidth: 0
      },
      yAxis: {
        title: null,
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
      series: [
        {
          name : 'Vocal',
          data : getTickValues('Vocal'),
          pointPlacement: 'on'
        },
        {
          name : 'Consonant',
          data : getTickValues('Consonant'),
          pointPlacement: 'on'
        },
      ],
      credits: {
        enabled: false
      },
      legend: {
      }
    };

  }
}
