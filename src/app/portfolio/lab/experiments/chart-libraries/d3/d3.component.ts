import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import data from "../data/ct.json";
import { Line } from './line';

@Component({
  selector: 'pf-d3',
  templateUrl: './d3.component.html',
  styleUrls: ['./d3.component.scss']
})
export class D3Component implements OnInit, AfterViewInit {
  @ViewChild('chartPlotArea') private plotArea: ElementRef;
  private lineChart: Line;
  private colorPalette: string[] = [
    '#90a4a4',
    '#98bcbc',
    '#c0c4a4',
    '#e8c880',
    '#546830',
  ];

  constructor() { }

  ngOnInit(): void {
  }

  public ngAfterViewInit() {
    this.lineChart = new Line(this.plotArea);
    this.lineChart.createChart(data, this.colorPalette);
  }


}
