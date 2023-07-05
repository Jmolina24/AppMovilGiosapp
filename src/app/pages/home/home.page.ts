import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/core/services/order.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.page.html',
	styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

	list: any[] = [];

	constructor(private _api: OrdersService) {}

	ngOnInit() {
		this.get();
	}

	get(): void {
		this._api.getDetails({ idorden: 0, iddetalleorden: '0' }).subscribe((r) => {
			this.list = r;
		})
	}
}
