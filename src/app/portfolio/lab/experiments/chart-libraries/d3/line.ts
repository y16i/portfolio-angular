import { ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as d3 from 'd3';
// import { Delaunay } from 'd3-delaunay';

import { Tooltip } from './tooltip';
import { CamelCasePipe } from 'src/app/shared/pipes/camel-case.pipe';

export class Line {
  private margin: any = {top: 20, bottom: 30, left: 40, right: 0};
  private chart: any;
  private width: number;
  private height: number;
  private element: any;
  private x: d3.ScaleTime<number, number>;
  private y: d3.ScaleLinear<number, number>;
  private focus: d3.Selection<any, any, any, any>;
  private tooltip: Tooltip;
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
      .style('dispaly', 'none');
  }

  public createChart(chartData: any, colorPalette: string[]) {
    if(this.element.clientWidth < 450){
      this.chartScale = 0.7;
    }
    else{
      this.chartScale = 0.8;
    }
    
    this.width = Math.round(this.element.clientWidth*this.chartScale - this.margin.left - this.margin.right);
    this.height = Math.round((this.element.clientWidth*3)/5 - this.margin.top - this.margin.bottom);

    let data = chartData;

    // group by certNameShort, remove undefined
    let certificationNames = (data.map(d => d.certNameShort)).filter(data => data);
    // remove duplications
    certificationNames = Array.from(new Set(certificationNames));
    const groupedData = [];
    certificationNames.forEach(certification => {
      groupedData.push({
        key: certification,
        values: data.filter(d => d.certNameShort === certification)
      });
    });
 
    // generate certifications list
    // let certificationNames = new Array();
    // certifications.forEach((d: any) => {
    //   certificationNames.push(d.certNameShort);
    // });

    // Remove old canvas
    if(d3.select('svg')){
      d3.select('svg').remove();
    }

    let svg = d3.select(this.element).append('svg')
      .attr('id', 'chart')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 ' + this.element.clientWidth + ' ' + this.element.clientWidth*3/5)
      .attr('preserveAspectRatio','xMinYMin meet');

    let g = svg.append('g')
      .attr('class', 'canvas')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    if(data.length > 0){
      this.noData.style('display', 'none');
    }
    else{
      this.noData.style('display', 'block');
    }

    let color = d3.scaleOrdinal(colorPalette);
    color.domain(certificationNames);

    let parseTime = d3.timeParse('%Y-%m-%d');

    this.x = d3.scaleTime().rangeRound([0, this.width]);
    this.y = d3.scaleLinear().rangeRound([this.height, 0]);

    // d3.voronoi()
    // .x(d => { return this.x(new Date(d['importedDate'])); })
    // .y(d => { return this.y(d['certNumbers']); })
    // .extent([[0, 0], [this.width, this.height]]);

    let line = d3.line()
      .x(d => { return this.x(new Date(d['importedDate'])); })
      .y(d => { return this.y(d['certNumbers']); });

    this.x.domain(d3.extent(data, (d: any) => { return new Date(d.importedDate); }));
    this.y.domain(d3.extent(data, (d: any) => { return Number(d.certNumbers); }));

    let xAxis = d3.axisBottom(this.x)
      .ticks(10)
      .tickFormat(d3.timeFormat('%m/%d'));

    let yAxis = d3.axisLeft(this.y)
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
        .attr('class', (d: any) => 'line-' + new CamelCasePipe().transform(d.key))
        .attr('stroke', (d: any) => color(d.key))
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('stroke-width', '1  ')
        .attr('fill', 'none');

    // Dots on line 
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

    // push voronoi data
    let voronoiGroup = g.append('g')
      .attr('class', 'voronoi');

    voronoiGroup.selectAll('path')
      // .data(voronoi.polygons(d3.merge(groupedData.map((d: any) => { return d.values; }))))
      .enter().append('path')
        .attr('d', (d: any) => { return d ? 'M' + d.join('L') + 'Z': null;})
        .attr('fill', 'none')
        .attr('pointer-events', 'all')
        .on('mouseover', (value) => {
          this.chartMouseover(value.data); })
        .on('mouseout', (value) => { this.chartMouseout(value.data); });
/*      .style('stroke', '#eee') // display voronoi cells
        .style('fill', 'none');
*/
    // Legend
    let legendMargin = {top: 5, right: 5, bottom: 5, left: this.width + 30};
    let legendCanvasWidth = this.width*(1.0-this.chartScale) - legendMargin.right;
    let legendCanvasHeight = this.height - legendMargin.top - legendMargin.bottom;

    let legendSvg = g.append('g')
        .attr('class', 'legends')
        .attr('transform', 'translate(' + legendMargin.left + ',' + legendMargin.top + ')');

    let legend = {
      width: legendCanvasWidth,
      height: 20,
      bulletSize: 10
    };

    let legends = legendSvg.selectAll('path')
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
      .attr('class', (d: any) => 'bullet-' + new CamelCasePipe().transform(d))
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

    // tooltip is child of focus
    // Don't controll transform
    this.tooltip = new Tooltip(this.focus, false);
  }

  // Chart Mouseover
  private chartMouseover(d) {
    let targetClass = new CamelCasePipe().transform(d.certNameShort);

    // change line width
    d3.select(this.element)
      .selectAll('.line-' + targetClass)
      .attr('stroke-width', '2');
    
    // move circle
    this.focus.attr('transform', 'translate(' + this.x(new Date(d.importedDate)) + ',' + this.y(d.certNumbers) + ')');
    let datepipe = new DatePipe('en');
    this.focus.select('text').text(Number(d.certNumbers) + ' (' + datepipe.transform(d.importedDate, 'yyyy/MM/dd') + ')') ;

    this.tooltip.show(
      Number(d.certNumbers) + ' (' + datepipe.transform(d.importedDate, 'yyyy/MM/dd') + ')',
      'g.focus'
    );

    // Legend
    let legend = d3.select(this.element).selectAll('.legends').selectAll('.legend');
    legend.selectAll('rect.bullet-'+targetClass).style('fill-opacity', 0.5);
  }

  // Chart Mouseout
  private chartMouseout(d) {
    let targetClass = new CamelCasePipe().transform(d.certNameShort);

    // change line width
    d3.select(this.element)
      .selectAll('.line-' + targetClass)
      .attr('stroke-width', '1');

    this.focus.attr('transform', 'translate(-100,-100)');

    // Legend
    let legend = d3.select(this.element).selectAll('.legends').selectAll('.legend');
    legend.selectAll('rect.bullet-' + targetClass).style('fill-opacity', 1.0);
  }


  // Legend Mouse
  private legendMouseover(d){
    let targetClass = new CamelCasePipe().transform(d.currentTarget.textContent);

    /* change line */
    d3.select(this.element)
      .selectAll('.line-' + targetClass)
      .attr('stroke-width', '2');
    
    /* change legend */
    d3.select(this.element).selectAll('rect.bullet-'+targetClass).style('fill-opacity', 0.5);
  }

  private legendMouseout(d){
    let targetClass = new CamelCasePipe().transform(d.currentTarget.textContent);

    /* change line */
    d3.select(this.element)
      .selectAll('.line-' + targetClass)
      .attr('stroke-width', '1');

    /* change legend */
    d3.select(this.element).selectAll('rect.bullet-'+targetClass).style('fill-opacity', 1.0);
  }
}
