import { ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { LineChartSource } from '../models/line-chart.interface';

export class d3LineChart {
  private margin: any = {top: 20, bottom: 30, left: 40, right: 0};
  private width: number;
  private height: number;
  private element: any;
  private x: d3.ScaleTime<number, number>;
  private y: d3.ScaleLinear<number, number>;
  private focus: d3.Selection<any, any, any, any>;
  private noData: d3.Selection<any, any, any, any>;
  private chartScale: number; // chart and legend ratio

  public constructor(chartPlotArea: ElementRef){
    this.element = chartPlotArea.nativeElement;

    // No Data
    this.noData = d3.select('.linechart')
      .style('position', 'relative')
      .append('div')
      .attr('class', 'no-data')
      .text('No Data')
      .style('width', '100%')
      .style('height', '100%')
      .style('position', 'absolute')
      .style('top', '0px')
      .style('left', '0px')
      .style('line-height', String(this.height) + 'px')
      .style('text-align', 'center')
      .style('background-color', 'rgba(255, 255, 255, 0.5)')
      .style('opacity', '1')
      .style('font-size', '30px')
      .style('display', 'none');
  }

  public createChart(chartData: LineChartSource[], colorPalette: string[]) {
    if(this.element.clientWidth < 450){
      this.chartScale = 0.7;
    }
    else{
      this.chartScale = 0.8;
    }

    this.width = Math.round(this.element.clientWidth*this.chartScale - this.margin.left - this.margin.right);
    this.height = Math.round((this.element.clientWidth*3)/5 - this.margin.top - this.margin.bottom);

    const data = chartData;

    // group by certNameShort, remove undefined
    let certificationNames = (data.map(d => d.certNameShort)).filter(d => d);
    // remove duplications
    certificationNames = Array.from(new Set(certificationNames));
    const groupedData = [];
    certificationNames.forEach(certification => {
      groupedData.push({
        key: certification,
        values: data.filter(d => d.certNameShort === certification)
      });
    });

    // Remove old canvas
    if(d3.select('svg')){
      d3.select('svg').remove();
    }

    const svg = d3.select(this.element).append('svg')
      .attr('id', 'chart')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 ' + this.element.clientWidth + ' ' + this.element.clientWidth*3/5)
      .attr('preserveAspectRatio','xMinYMin meet');

    const g = svg.append('g')
      .attr('class', 'canvas')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    if(data.length > 0){
      this.noData.style('display', 'none');
    }
    else{
      this.noData.style('display', 'block');
    }

    const color = d3.scaleOrdinal(colorPalette);
    color.domain(certificationNames);

    this.x = d3.scaleTime().rangeRound([0, this.width]);
    this.y = d3.scaleLinear().rangeRound([this.height, 0]);

    const line = d3.line()
      .x(d => { return this.x(new Date(d['importedDate'])); })
      .y(d => { return this.y(d['certNumbers']); });

    this.x.domain(d3.extent(data, (d: any) => { return new Date(d.importedDate); }));
    this.y.domain(d3.extent(data, (d: any) => { return Number(d.certNumbers); }));

    const xAxis = d3.axisBottom(this.x)
      .ticks(10)
      .tickFormat(d3.timeFormat('%m/%d'));

    const yAxis = d3.axisLeft(this.y)
      .ticks(4)
      .tickFormat(d3.format('d'))
      .tickSizeInner(this.width*-1);

    // X Axis
    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(xAxis);

    // Y Axis
    g.append('g')
      .attr('class', 'axis axis--y')
      .call(yAxis)
      .append('text')
      .attr('fill', '#000')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .style('text-anchor', 'end')
      .text('Numbers');

    // Lines
    g.append('g')
      .attr('class', 'lines')
      .selectAll('path')
      .data(groupedData)
      .enter().append('path')
        .attr('d', (d: any) => { d['line'] = this; return line(d.values); })
        .attr('class', (d: any) => 'line-' + d.key.toLowerCase())
        .attr('stroke', (d: any) => color(d.key))
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('stroke-width', '1  ')
        .attr('fill', 'none');

    // Dots
    g.append('g')
      .attr('class', 'dots')
      .selectAll('path')
      .data(data)
      .enter().append('circle')
        .attr('class', 'dot')
        .style('opacity', 1)
        .style('fill', (d: any) => color(d.certNameShort))
        .attr('cx', (d: any) => this.x(new Date(d.importedDate)))
        .attr('cy', (d: any) => this.y(Number(d.certNumbers)))
        .attr('r', () => 2.0);

    // Legend
    const legendMargin = {top: 5, right: 5, bottom: 5, left: this.width + 30};
    const legendCanvasWidth = this.width*(1.0-this.chartScale) - legendMargin.right;

    const legendSvg = g.append('g')
        .attr('class', 'legends')
        .attr('transform', 'translate(' + legendMargin.left + ',' + legendMargin.top + ')');

    const legend = {
      width: legendCanvasWidth,
      height: 20,
      bulletSize: 10
    };

    const legends = legendSvg.selectAll('path')
      .data(certificationNames)
      .enter().append('g')
        .attr('class', 'legend')
        .attr('transform', (d, i) => 'translate(0,' + i*legend.height + ')')
        .attr('pointer-events', 'all')
        .style('cursor', 'pointer')
        .on('mouseover', (d) => { this.legendMouseover(d); })
        .on('mouseout', (d) => { this.legendMouseout(d); });

    // legend for hovering area recognition
    legends.append('rect')
      .attr('width', legend.width)
      .attr('height', legend.height)
      .style('fill', 'none');

    // bullet
    legends.append('rect')
      .attr('width', legend.bulletSize)
      .attr('height', legend.bulletSize)
      .attr('transform', (d, i) => 'translate(0,' + (legend.height*0.5 - legend.bulletSize*0.5) +')')
      .attr('class', (d: any) => 'bullet-' + d.toLowerCase())
      .style('fill', (d: string, i) => color(d));

    // text of legends
    legends.append('text')
      .attr('transform', 'translate(' + (legend.bulletSize*1.5) + ',' + (legend.height*0.5 + 12*0.4) +')')
      .text((d: any) => { return d; })
      .attr('font-size', '12px');

    // circle and text
    this.focus = g.append('g')
      .attr('class', 'focus')
      .attr('transform', 'translate(-100, -100)')
      .style('display', 'block');

    this.focus.append('circle')
      .attr('fill', 'none')
      .attr('stroke', '#ff8800')
      .attr('r', 4);
  }

  // Legend Mouse
  private legendMouseover(d){
    const targetClass = d.currentTarget.textContent.toLowerCase();

    /* change line */
    d3.select(this.element)
      .selectAll('.line-' + targetClass)
      .attr('stroke-width', '2');

    /* change legend */
    d3.select(this.element).selectAll('rect.bullet-'+targetClass).style('fill-opacity', 0.5);
  }

  private legendMouseout(d){
    const targetClass = d.currentTarget.textContent.toLowerCase();

    /* change line */
    d3.select(this.element)
      .selectAll('.line-' + targetClass)
      .attr('stroke-width', '1');

    /* change legend */
    d3.select(this.element).selectAll('rect.bullet-'+targetClass).style('fill-opacity', 1.0);
  }
}
