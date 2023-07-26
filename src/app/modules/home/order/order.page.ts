import { Component, OnInit } from '@angular/core';
import { Action, MenuService } from 'src/app/core/services/menu.service';
import { OrdersService } from 'src/app/core/services/order.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { Order } from 'src/app/interfaces/order';

@Component({
	selector: 'app-order',
	templateUrl: './order.page.html',
	styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

	list: Order[] = [];
	filteredList: Order[] = [];
	idtercero: string = this._storage.getUser().idtercero;
	textoBusqueda = '';
	filtroEstado = '';
	actions: Action[] = [];

	constructor(
		private _api: OrdersService,
		private _storage: StorageService,
		private _menu: MenuService
	) { }

	ngOnInit() {
		this.actions = this._menu.getActions('process.orders');

		if (this.getAction('list')) {
			this.get();
		}
	}

	handleRefresh(event: any) {
		this._api
			.get({ idorden: 0 })
			.subscribe((r) => {
				this.list = r;
				this.filteredList = r;
				event.target.complete();
			});

	}


	segmentChanged( event:any ){
		const ValorSegmento = event.detail.value;
		if (ValorSegmento === 'default' ){
			this.filtroEstado = '';
			return;
		}
		this.filtroEstado = ValorSegmento;

		console.log(ValorSegmento);
	}


	get(): void {
		this._api
			.get({ idorden: 0 })
			.subscribe((r) => {
				this.list = r;
				this.filteredList = r;

			});
	}

	buscar(event: any) {
		this.textoBusqueda = event.target.value.toLowerCase();

	}

	getAction(item: Action): boolean {
		return this.actions.includes(item);
	}
}
