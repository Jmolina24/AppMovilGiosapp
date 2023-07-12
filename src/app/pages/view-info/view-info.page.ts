import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonModal, Platform } from '@ionic/angular';
import { OrderDetail } from 'src/app/core/interfaces/order-detail';
import { OrdersService } from 'src/app/core/services/order.service';
import { RatesService } from 'src/app/core/services/rates.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { Order } from 'src/app/interfaces/order';

@Component({
	selector: 'app-view-info',
	templateUrl: './view-info.page.html',
	styleUrls: ['./view-info.page.scss'],
})
export class ViewInfoPage implements OnInit {
	@ViewChild('modal', { static: true }) modal!: IonModal;
	isOpen = false;

	public order!: Order;
	public detailOrder: OrderDetail[] = [];

	public idrole: number = 1;

	private activatedRoute = inject(ActivatedRoute);
	private platform = inject(Platform);

	public list: any[] = [];

	public selectedText = '0 Items';
	public selected: string[] = [];

	private idorden: any = '';

	constructor(
		private _storage: StorageService,
		private api: OrdersService,
		private _rates: RatesService
	) {}

	ngOnInit() {
		this.idrole = this._storage.getRolID();

		this.idorden = this.activatedRoute.snapshot.paramMap.get('id') as string;

		this.get();
	}

	get(): void {
		const { idorden } = this;
		this.api.get({ idorden }).subscribe((r) => (this.order = r[0]));

		this.api
			.getDetails({ idorden })
			.subscribe((r) => (this.detailOrder = r));
	}

	getBackButtonText() {
		const isIos = this.platform.is('ios');
		return isIos ? 'Regresar' : '';
	}

	selectionChanged(item: any) {
		this.selected = item;
		this.isOpen = false;

		this.get();
	}

	getThirdsServices({ idservicio, idciudadservicio }: any): void {
		this.isOpen = false;
		this._rates
			.get({ idservicio, idciudad: idciudadservicio })
			.subscribe((response: any[]) => {
				this.list = response;

				this.isOpen = true;
			});
	}
}
