import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewInfoPage } from './view-info.page';

const routes: Routes = [
  {
    path: '',
    component: ViewInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewInfoPageRoutingModule {}
