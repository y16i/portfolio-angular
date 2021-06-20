import { Injectable } from '@angular/core';
import * as matrix from 'gl-matrix';
import { Cube } from './data/cube';

const vertexShaderSource = `
  attribute vec4 aVertexPosition;
  attribute vec3 aVertexNormal;
  attribute vec2 aTextureCoord;

  uniform mat4 uModelViewMatrix;
  uniform mat4 uProjectionMatrix;
  uniform mat4 uNormalMatrix;

  varying highp vec2 vTextureCoord;
  varying highp vec3 vLighting;

  void main(void) {
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    vTextureCoord = aTextureCoord;

    // lighting
    highp vec3 ambientLight = vec3(0.3, 0.3, 0.3);
    highp vec3 directionalLightColor = vec3(1, 1, 1);
    highp vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));

    highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);

    highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
    vLighting = ambientLight + (directionalLightColor * directional);
  }
`;

const fragmentShaderSource = `
  varying highp vec2 vTextureCoord;
  varying highp vec3 vLighting;

  uniform sampler2D uSampler;

  void main(void) {
    highp vec4 texelColor = texture2D(uSampler, vTextureCoord);
    gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);
  }
`;

interface ObjectBuffer {
  position: WebGLBuffer,
  color?: WebGLBuffer,
  indices: WebGLBuffer
  textureCoord?: WebGLBuffer,
  normal?: WebGLBuffer,
}

/**
 * TODO: organize, reusable
 */
@Injectable({
  providedIn: 'root'
})
export class WebglService {
  private renderingContext: RenderingContext;
  private get gl(): WebGLRenderingContext {
    return this.renderingContext as WebGLRenderingContext;
  }
  private get clientCanvas(): Element {
    return this.gl.canvas as Element;
  }
  private programInfo: any; // TODO: interface?
  private modelViewMatrix: matrix.mat4;
  private projectMatrix: matrix.mat4;
  private normalMatrix: matrix.mat4;
  private buffers: ObjectBuffer;
  private texture: WebGLTexture;
  private cube = new Cube();

  constructor() {
  }

  public initContext(canvas: HTMLCanvasElement): WebGLRenderingContext {
    this.renderingContext = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!this.gl) {
      console.error('Unable to initialize WebGL.');
      return;
    }
    this.setCanvasSize(canvas);
    this.initGl();
    const program = this.initProgram();
    this.programInfo = {
      program: program,
      attribLocations: {
        vertexPosition: this.gl.getAttribLocation(program, 'aVertexPosition'),
        vertexNormal: this.gl.getAttribLocation(program, 'aVertexNormal'),
        textureCoord: this.gl.getAttribLocation(program, 'aTextureCoord'),
      },
      uniformLocations: {
        projectMatrix: this.gl.getUniformLocation(program, 'uProjectionMatrix'),
        modelViewMatrix: this.gl.getUniformLocation(program, 'uModelViewMatrix'),
        normalMatrix: this.gl.getUniformLocation(program, 'uNormalMatrix'),
        uSampler: this.gl.getUniformLocation(program, 'uSampler'),
      },
    };

    // init buffer
    this.buffers = this.initBuffer();

    this.setupPerspective();
    this.modelViewMatrix = matrix.mat4.create();
    // destination, to translate, amount
    matrix.mat4.translate(this.modelViewMatrix, this.modelViewMatrix, [-0.0, 0.0, -6.0]);
    this.prepareRender();
    return this.gl;
  }

  public prepareUpdate() {
    this.initGl();
    this.setupPerspective();
    this.modelViewMatrix = matrix.mat4.create();
    matrix.mat4.translate(this.modelViewMatrix, this.modelViewMatrix, [-0.0, 0.0, -6.0]);
  }

  public uniformMatrix() {
    this.gl.uniformMatrix4fv(this.programInfo.uniformLocations.projectMatrix, false, this.projectMatrix);
    this.gl.uniformMatrix4fv(this.programInfo.uniformLocations.modelViewMatrix, false, this.modelViewMatrix);
    this.gl.uniformMatrix4fv(this.programInfo.uniformLocations.normalMatrix, false, this.normalMatrix);
  }

  private setNormalMatrix() {
    this.normalMatrix = matrix.mat4.create();
    matrix.mat4.invert(this.normalMatrix, this.modelViewMatrix);
    matrix.mat4.transpose(this.normalMatrix, this.normalMatrix);
  }

  public prepareRender() {
    this.setNormalMatrix();

    // position
    {
      const numComponents = 3;
      const type = this.gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.position);
      this.gl.vertexAttribPointer(
        this.programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset
      );
      this.gl.enableVertexAttribArray(this.programInfo.attribLocations.vertexPosition);
    }

    // texture
    {
      const num = 2;
      const type = this.gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.textureCoord);
      this.gl.vertexAttribPointer(this.programInfo.attribLocations.textureCoord, num, type, normalize, stride, offset);
      this.gl.enableVertexAttribArray(this.programInfo.attribLocations.textureCoord);
    }

    // normal
    {
      const numComponents = 3;
      const type = this.gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.normal);
      this.gl.vertexAttribPointer(this.programInfo.attribLocations.vertexNormal, numComponents, type, normalize, stride, offset);
      this.gl.enableVertexAttribArray(this.programInfo.attribLocations.vertexNormal);
    }

    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.buffers.indices);

    this.gl.useProgram(this.programInfo.program);

    // set uniform
    this.uniformMatrix();
  }

  public getModelViewMatrix(): matrix.mat4 {
    return this.modelViewMatrix;
  }

  private setCanvasSize(canvas: HTMLCanvasElement) {
    this.gl.canvas.width = canvas.clientWidth;
    this.gl.canvas.height = canvas.clientHeight;
  }

  private initGl() {
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.depthFunc(this.gl.LEQUAL);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
  }

  // create a program and initialize shaders
  private initProgram(): WebGLProgram {
    const program = this.gl.createProgram();

    // load shaders
    const vertexShader = this.loadShader(this.gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = this.loadShader(this.gl.FRAGMENT_SHADER, fragmentShaderSource);

    // attach shaders to the program
    this.gl.attachShader(program, vertexShader);
    this.gl.attachShader(program, fragmentShader);
    // link
    this.gl.linkProgram(program);
    // check the link
    if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
      console.error('Unable to initialize program: ' + this.gl.getProgramInfoLog(program));
      return;
    }
    return program;
  }

  private loadShader(shaderType: number, source: string): WebGLShader {
    const shader: WebGLShader = this.gl.createShader(shaderType);
    // send the source to the shader object
    this.gl.shaderSource(shader, source);
    // compile
    this.gl.compileShader(shader);

    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      console.error('An error occurred compiling the shader: ' + shaderType );
      this.gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  private initBuffer(): ObjectBuffer {
    // position
    const positionBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.cube.data.positions, this.gl.STATIC_DRAW);

    // vertices
    const indexBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, this.cube.data.indices, this.gl.STATIC_DRAW);

    // texture
    const textureCoordinateButter = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, textureCoordinateButter);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.cube.data.textureCoordinates, this.gl.STATIC_DRAW);

    // normals
    const normalBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, normalBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.cube.data.vertexNormals, this.gl.STATIC_DRAW);

    return {
      position: positionBuffer,
      // color: colorBuffer,
      indices: indexBuffer,
      textureCoord: textureCoordinateButter,
      normal: normalBuffer
    };
  }

  private setupPerspective() {
    const fieldOfView = 45 * Math.PI / 180; //radians
    const aspect = this.clientCanvas.clientWidth / this.clientCanvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    this.projectMatrix = matrix.mat4.create();
    matrix.mat4.perspective(this.projectMatrix, fieldOfView, aspect, zNear, zFar);
  }

  public loadTexture(url: string) {
    this.texture = this.gl.createTexture();
    const level = 0;
    const internalFormat = this.gl.RGBA;
    const width = 1;
    const height = 1;
    const border = 0;
    const srcFormat = this.gl.RGBA;
    const srcType = this.gl.UNSIGNED_BYTE;
    const pixel = new Uint8Array([0, 0, 255, 255]);

    this.gl.texImage2D(
      this.gl.TEXTURE_2D, level, internalFormat,
      width, height, border, srcFormat, srcType,
      pixel
    );

    const image = new Image();
    image.onload = () => {
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
      this.gl.texImage2D(this.gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, image);

      if (this.isPowerOf2(image.width) && this.isPowerOf2(image.height)) {
        this.gl.generateMipmap(this.gl.TEXTURE_2D);
      } else {
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
      }
    };
    image.src = url;
  }

  private isPowerOf2(value): boolean {
    return (value & (value - 1)) === 0;
  }

  public textureOn() {
    this.gl.activeTexture(this.gl.TEXTURE0);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
    this.gl.uniform1i(this.programInfo.uniformLocations.uSampler, 0);
  }
}
