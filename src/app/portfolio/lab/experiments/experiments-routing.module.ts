import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArchitectureComponent } from './architecture/architecture.component';
import { ChartLibrariesComponent } from './chart-libraries/chart-libraries.component';
import { ExperimentsComponent } from './experiments.component';
import { WorkHistoryComponent } from './work-history/work-history.component';

const routes: Routes = [
  {
    path: '',
    component: ExperimentsComponent,
    children: [
      {
        path: 'chart-libraries',
        component: ChartLibrariesComponent
      },
      {
        path: 'architecture',
        component: ArchitectureComponent
      },
      {
        path: 'work-history',
        component: WorkHistoryComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExperimentsRoutingModule { }
