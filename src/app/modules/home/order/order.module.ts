import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderPageRoutingModule } from './order-routing.module';

import { OrderPage } from './order.page';
import { OrderComponent } from 'src/app/components/order/order.component';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, OrderPageRoutingModule, PipesModule],
	declarations: [OrderPage, OrderComponent],
})
export class OrderPageModule {}
