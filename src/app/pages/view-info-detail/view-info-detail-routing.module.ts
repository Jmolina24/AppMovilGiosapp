import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewInfoDetailPage } from './view-info-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ViewInfoDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewInfoDetailPageRoutingModule {}
