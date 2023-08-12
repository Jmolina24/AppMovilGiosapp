import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewFileStartPageRoutingModule } from './view-file-start-routing.module';

import { ViewFileStartPage } from './view-file-start.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewFileStartPageRoutingModule
  ],
  declarations: []
})
export class ViewFileStartPageModule {}
