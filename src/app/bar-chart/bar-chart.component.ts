import { Component, OnInit, Input } from '@angular/core';
import { HighchartComponent } from '../highchart';
import { ChartData } from '../shared/';

@Component({
  moduleId: module.id,
  selector: 'voco-bar-chart',
  templateUrl: 'bar-chart.component.html',
  styleUrls: ['bar-chart.component.css'],
  directives: [HighchartComponent]
})
export class BarChartComponent {

  htData: any;

  @Input() set data(val: ChartData) {
      this.htData = !val ? null : {
        title: { text : val.title },
        chart: {
            type: "column"
        },
        xAxis: {
            title: {
                text: "Vowels / Consonants"
            },
            type: "category"
        },
        yAxis: {
            title: {
                text: "Number of"
            }
        },
        series: val.series.map(m => ({
          name : m.name,
          data : m.items.map(m => [m.tick, m.value])
        }))
    };
  }

}
