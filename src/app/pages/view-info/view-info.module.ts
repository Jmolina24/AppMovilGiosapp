import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewInfoPageRoutingModule } from './view-info-routing.module';

import { ViewInfoPage } from './view-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewInfoPageRoutingModule
  ],
  declarations: [ViewInfoPage]
})
export class ViewInfoPageModule {}
