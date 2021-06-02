import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExperimentsRoutingModule } from './experiments-routing.module';
import { ExperimentsComponent } from './experiments.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ChartLibrariesComponent } from './chart-libraries/chart-libraries.component';
import { MatButtonModule } from '@angular/material/button';
import { D3Component } from './chart-libraries/d3/d3.component';
import { EchartsComponent } from './chart-libraries/echarts/echarts.component';
import { ArchitectureComponent } from './architecture/architecture.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { WorkHistoryComponent } from './work-history/work-history.component';
import { GoBackendComponent } from './go-backend/go-backend.component';
import { CodeLinkComponent } from './code-link/code-link.component';
import { WebglComponent } from './webgl/webgl.component';

@NgModule({
  declarations: [
    ExperimentsComponent,
    ChartLibrariesComponent,
    D3Component,
    EchartsComponent,
    ArchitectureComponent,
    WorkHistoryComponent,
    GoBackendComponent,
    CodeLinkComponent,
    WebglComponent,
  ],
  imports: [
    CommonModule,
    ExperimentsRoutingModule,
    MatDialogModule,
    MatButtonModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
  ]
})
export class ExperimentsModule { }
