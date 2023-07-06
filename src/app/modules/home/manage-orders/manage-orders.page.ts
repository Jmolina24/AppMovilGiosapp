import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/core/services/order.service';
import { Order } from 'src/app/interfaces/order';

@Component({
	selector: 'app-manage-orders',
	templateUrl: './manage-orders.page.html',
	styleUrls: ['./manage-orders.page.scss'],
})
export class ManageOrdersPage implements OnInit {
	list: Order[] = [];

	constructor(private _api: OrdersService) {}

	ngOnInit() {
		this.get();
	}

	get(): void {
		this._api.get({ idorden: 0 }).subscribe((r) => this.list = r);
	}
}
