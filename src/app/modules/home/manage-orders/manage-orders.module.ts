import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageOrdersPageRoutingModule } from './manage-orders-routing.module';

import { ManageOrdersPage } from './manage-orders.page';
import { OrderComponent } from 'src/app/components/order/order.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageOrdersPageRoutingModule
  ],
  declarations: [ManageOrdersPage, OrderComponent]
})
export class ManageOrdersPageModule {}
