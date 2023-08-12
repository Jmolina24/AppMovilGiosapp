import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewFileStartPage } from './view-file-start.page';

const routes: Routes = [
  {
    path: '',
    component: ViewFileStartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewFileStartPageRoutingModule {}
