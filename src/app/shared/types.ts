
export interface ChartSeries {
    name : string;
    items : {
        tick: string;
        value: number;
    } []
}

export interface ChartData {
    title: string;
    series : ChartSeries []
}