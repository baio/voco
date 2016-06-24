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

  @Input() data: ChartData;

  //map external data to highchart data
  get htData() : any {

      console.log("---", this.data);

    return !this.data ? null : {
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
                text: "Number of",
                style: {}
            }
        },
        series: this.data.series.map(m => ({
          name : m.name,
          data : m.items.map(m => [m.tick, m.value])
        }))
    };
  }

}
