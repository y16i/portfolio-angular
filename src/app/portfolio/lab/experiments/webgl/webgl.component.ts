import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { WebglService } from './webgl.service';
import * as matrix from 'gl-matrix';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'pf-webgl',
  templateUrl: './webgl.component.html',
  styleUrls: ['./webgl.component.scss']
})
export class WebglComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('glPlot') private canvas: ElementRef<HTMLCanvasElement>;
  private gl: WebGLRenderingContext;
  private fps60: number = 1000/60;
  private deltaTime = 0;
  private rotation = 0;
  private ngUnSubscribe: Subject<any> = new Subject();

  constructor(private webglService: WebglService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }

  ngAfterViewInit() {
    if (!this.canvas) {
      console.error("canvas not supplied.");
      return;
    }
    this.gl = this.webglService.initContext(this.canvas.nativeElement);
    this.webglService.loadTexture('/assets/images/lab/apollo.jpg');

    const ms = 0.001;
    const increment = this.fps60 * ms;
    this.deltaTime = increment;
    interval(this.fps60)
    .pipe(takeUntil(this.ngUnSubscribe))
    .subscribe(() => {
      this.draw();
      this.deltaTime += increment;
    });
  }

  private draw() {
    this.webglService.prepareUpdate();
    // rotate
    const modelViewMatrix = this.webglService.getModelViewMatrix();
    matrix.mat4.rotate(modelViewMatrix, modelViewMatrix, this.rotation, [0, 0, 1]);
    matrix.mat4.rotate(modelViewMatrix, modelViewMatrix, this.rotation * 0.7, [0, 1, 0]);
    this.webglService.prepareRender();
    // draw
    const vertexCount = 36;
    const type = this.gl.UNSIGNED_SHORT;
    const offset = 0;
    this.gl.drawElements(this.gl.TRIANGLES, vertexCount, type, offset);
    this.webglService.textureOn();
    this.rotation = this.deltaTime;
  }
}
