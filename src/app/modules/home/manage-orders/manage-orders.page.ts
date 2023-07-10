import { Component, OnInit } from '@angular/core';
import { OrderDetail } from 'src/app/core/interfaces/order-detail';
import { OrdersService } from 'src/app/core/services/order.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { Order } from 'src/app/interfaces/order';

@Component({
	selector: 'app-manage-orders',
	templateUrl: './manage-orders.page.html',
	styleUrls: ['./manage-orders.page.scss'],
})
export class ManageOrdersPage implements OnInit {
	list: OrderDetail[] = [];
	idtercero: string = this._storage.getUser().idtercero;

	constructor(private _api: OrdersService, private _storage: StorageService) {}

	ngOnInit() {
		this.get();
	}

	get(): void {
		this._api.getDetails({ idorden: 0, idtercero: this.idtercero }).subscribe((r) => this.list = r);
	}
}
