import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortfolioComponent } from './portfolio/portfolio.component';

const routes: Routes = [
  {
    path: '',
    component: PortfolioComponent,
  },
  {
    path: 'experiments',
    loadChildren: () => import('./portfolio/lab/experiments/experiments.module').then(m => m.ExperimentsModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      relativeLinkResolution: 'corrected',
      anchorScrolling: 'enabled',
      // enableTracing: true,
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
