import { Component, OnInit } from '@angular/core';
import { OrderDetail } from 'src/app/core/interfaces/order-detail';
import { Action, MenuService } from 'src/app/core/services/menu.service';
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
	filteredList: OrderDetail[] = [];
	idtercero: string = this._storage.getUser().idtercero;
	textoBusqueda = '';

	actions: Action[] = [];

	constructor(private _api: OrdersService, private _storage: StorageService, private _menu: MenuService) { }

	ngOnInit() {
		this.actions = this._menu.getActions('process.assigned-services');

		if (this.getAction('view_details')) {
			this.get();
		}
	}

	get(): void {
		this._api.getDetails({ idorden: 0, idtercero: this.idtercero }).subscribe((r) => {
			this.list = r;
		});
	}


	buscar(event: any) {
		this.textoBusqueda = event.target.value.toLowerCase();
		// this.list = this.filteredList.filter(item => item.tipoorden.toLowerCase().includes(textoBusqueda.toLowerCase()));
	}

	getAction(item: Action): boolean {
		return this.actions.includes(item);
	}
}
