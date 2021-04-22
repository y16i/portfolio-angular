import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import data from "../data/ct.json";
import { d3LineChart } from './d3-line-chart';

@Component({
  selector: 'pf-d3',
  templateUrl: './d3.component.html',
  styleUrls: ['./d3.component.scss']
})
export class D3Component implements OnInit, AfterViewInit {
  @ViewChild('chartPlotArea') private plotArea: ElementRef;
  private lineChart: d3LineChart;
  private colorPalette: string[] = [
    '#90a4a4',
    '#e8c880',
    '#546830',
  ];

  constructor() { }

  ngOnInit(): void {
  }

  public ngAfterViewInit() {
    this.lineChart = new d3LineChart(this.plotArea);
    this.lineChart.createChart(data, this.colorPalette);
  }
}
