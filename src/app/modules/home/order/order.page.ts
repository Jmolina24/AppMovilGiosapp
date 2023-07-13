import { Component, OnInit } from '@angular/core';
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

	constructor(
		private _api: OrdersService,
		private _storage: StorageService
	) {}

	ngOnInit() {
		this.get();
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
		const textoBusqueda = event.target.value.toLowerCase();
		this.list = this.filteredList.filter(item => item.tipoorden.toLowerCase().includes(textoBusqueda));
	  }

}
