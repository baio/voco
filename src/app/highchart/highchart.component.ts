import { Component, Input, OnChanges, OnDestroy, ElementRef, NgZone } from '@angular/core';

const STATIC_OPTS = {
    labels: {
        style: {
            color: "#000000"
        }
    },
    chart: {
        style: {
            fontFamily: "inherit"
        },
        spacing: [10, 0, 0, 0]
    },
    legend: {
        itemStyle: {
            color: "#737373",
            fontSize: "12px",
            fontWeight: "600"
        }
    },
    plotOptions: {
        series: {
            animation: true
        }
    },
    credits: {
        enabled: false
    }
};

declare var Highcharts: any;


@Component({
    moduleId: module.id,
    selector: 'voco-highchart',
    template: ''
})
export class HighchartComponent implements OnChanges, OnDestroy {

    @Input() data: any;

    private chart: any;
    private sub: any;

    constructor(private element: ElementRef, private zone: NgZone) {
    }

    ngOnChanges(): void {
        this.remove();
        if (this.data) {
            //to remove highchart label it should be paid
            let data = Highcharts.merge(this.data, STATIC_OPTS);
            this.chart = Highcharts.chart(this.element.nativeElement, data);
            this.sub = this.zone.onStable.subscribe(() => {
                this.chart.reflow();
            });
        }
    }

    ngOnDestroy(): void {
        this.remove();
    }

    remove(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}
