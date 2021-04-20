import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExperimentsRoutingModule } from './experiments-routing.module';
import { ExperimentsComponent } from './experiments.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ChartLibrariesComponent } from './chart-libraries/chart-libraries.component';
import { MatButtonModule } from '@angular/material/button';
import { D3Component } from './chart-libraries/d3/d3.component';
import { EchartsComponent } from './chart-libraries/echarts/echarts.component';

@NgModule({
  declarations: [
    ExperimentsComponent,
    ChartLibrariesComponent,
    D3Component,
    EchartsComponent
  ],
  imports: [
    CommonModule,
    ExperimentsRoutingModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class ExperimentsModule { }
