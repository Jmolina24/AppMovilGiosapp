import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { OrderDetail } from 'src/app/core/interfaces/order-detail';
import { OrdersService } from 'src/app/core/services/order.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { Order } from 'src/app/interfaces/order';

@Component({
	selector: 'app-view-info',
	templateUrl: './view-info.page.html',
	styleUrls: ['./view-info.page.scss'],
})
export class ViewInfoPage implements OnInit {
	public order!: Order;
	public detailOrder: OrderDetail[] = [];

	public idrole: number = 1;

	private activatedRoute = inject(ActivatedRoute);
	private platform = inject(Platform);

	constructor(
		private _storage: StorageService,
		private api: OrdersService
	) {}

	ngOnInit() {
		this.idrole = this._storage.getRolID();

		const id = this.activatedRoute.snapshot.paramMap.get('id') as string;

		this.api.get({ idorden: id }).subscribe((r) => (this.order = r[0]));

		this.api
			.getDetails({ idorden: id })
			.subscribe((r) => (this.detailOrder = r));
	}

	getBackButtonText() {
		const isIos = this.platform.is('ios');
		return isIos ? 'Regresar' : '';
	}
}
