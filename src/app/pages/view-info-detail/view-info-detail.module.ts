import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewInfoDetailPageRoutingModule } from './view-info-detail-routing.module';

import { ViewInfoDetailPage } from './view-info-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewInfoDetailPageRoutingModule
  ],
  declarations: [ViewInfoDetailPage]
})
export class ViewInfoDetailPageModule {}
