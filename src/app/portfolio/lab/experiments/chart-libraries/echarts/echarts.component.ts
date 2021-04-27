import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import data from "../data/ct.json";
import { LineChartSource } from '../models/line-chart.interface';

@Component({
  selector: 'pf-echarts',
  templateUrl: './echarts.component.html',
  styleUrls: ['./echarts.component.scss']
})
export class EchartsComponent implements OnInit {
  public options: EChartsOption;

  constructor() {
  }

  ngOnInit(): void {
    this.initChart();
  }

  private initChart() {
    let certifications = data.map((d: LineChartSource) => d.certNameShort);
    certifications = Array.from(new Set(certifications));
    let xAxis = data.map((d: LineChartSource) => d.importedDate);
    xAxis = Array.from(new Set(xAxis));

    const series = [];
    certifications.forEach(certification => {
      const result = data.reduce((acc: any, d: LineChartSource) => {
        if (d.certNameShort === certification) {
          acc.push(d.certNumbers)
        }
        return acc
      }, <any>[]);
      series.push({
        name: certification,
        type: 'line',
        symbol: 'circle',
        data: result
      });
    });

    this.options = {
      textStyle: {
        fontFamily: 'Roboto'
      },
      legend: {
        data: certifications,
        orient: 'horizontal',
        icon: 'pin',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            color: '#fff',
            backgroundColor: '#000'
          }
        },
        order: 'seriesDesc'
      },
      xAxis: {
        data: xAxis,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      series: series,
      animationEasing: 'elasticOut',
    };
  }
}
