import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartLibrariesComponent } from './chart-libraries/chart-libraries.component';
import { ExperimentsComponent } from './experiments.component';

const routes: Routes = [
  {
    path: '',
    component: ExperimentsComponent,
    children: [
      {
        path: 'chart-libraries',
        component: ChartLibrariesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExperimentsRoutingModule { }
