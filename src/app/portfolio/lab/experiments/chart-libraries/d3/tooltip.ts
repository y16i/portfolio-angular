import * as d3 from 'd3';

export class Tooltip {
  private tooltip: d3.Selection<any, any, any, any>;
  private isTransform: boolean;

  // isTransform = false: The location is belong to a parent
  public constructor(g: d3.Selection<any, any, any, any>, isTransform: boolean){
    this.isTransform = isTransform;

    this.tooltip = g.append('g')
      .attr('class', 'tooltip')
      .style('display', 'block');

    if(this.isTransform){
      d3.select('g.tooltip').attr('transform', 'translate(-100, -100)')
    }

    // dropshadow filter
    let filter = this.tooltip.append('filter')
      .attr('id', 'dropshadow')
      .attr('width', '130%')
      .attr('height', '130%');

    filter.append('feGaussianBlur')
      .attr('in', 'SourceAlpha')
      .attr('stdDeviation', '3')
      .attr('result', 'blurOut');

    filter.append('feOffset')
      .attr('in', 'offOut')
      .attr('dx', 1)
      .attr('dy', 1)
      .attr('result', 'offOut');

    filter.append('feBlend')
      .attr('in', 'SourceGraphic')
      .attr('in2', 'blur')
      .attr('mode', 'normal');

    // tooltip: rect
    this.tooltip.append('rect')
      .attr('x', 8)
      .attr('y', '-21')
      .attr('width', 120)
      .attr('height', 24)
      .attr('filter', 'url(#dropshadow)')
      .style('fill', '#000')
      .style('opacity', '0.7');

    // tooltip: text
    this.tooltip.append('text')
      .attr('x', 15)
      .attr('y', '-4')
      .attr('font-size', '14px')
      .attr('fill', '#fff');
  }

  public show(text: string, targeClass: string){
    // transform
    if(this.isTransform){
      // get targetClass position
      let pos = d3.pointer((<SVGTSpanElement>d3.select(targeClass).node()));
      this.tooltip.attr('transform', 'translate(' + String(pos[0]) + ',' + String(pos[1]) + ')');
    }

    // update text
    this.tooltip.select('text').text(text);

    // adjust rect size by text length
    let textWidth = (<SVGTSpanElement>this.tooltip.select('text').node()).getComputedTextLength();
    const textMargin = 14;
    this.tooltip.select('rect').attr('width', textWidth + textMargin + 'px');
  }

  public hide(){
    if(this.isTransform){
      this.tooltip.attr('transform', 'translate(-100,-100)');
    }
  }

}