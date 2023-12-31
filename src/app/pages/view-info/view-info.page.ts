import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonModal, Platform } from '@ionic/angular';
import { OrderDetail } from 'src/app/core/interfaces/order-detail';
import { Action, MenuService } from 'src/app/core/services/menu.service';
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
	@ViewChild('modalThirds', { static: true }) modalThirds!: IonModal;
	@ViewChild('modalView', { static: true }) modalView!: IonModal;
	@ViewChild('modalUpload', { static: true }) modalUpload!: IonModal;

	isOpen = false;
	isOpenFile = false;
	isOpenView = false;
	isOpenFileView = false;

	info: any = 0;

	public order!: Order;
	public detailOrder: OrderDetail[] = [];

	public idrole: number = 1;

	private activatedRoute = inject(ActivatedRoute);
	private platform = inject(Platform);

	public list: any[] = [];

	public selectedText = '0 Items';
	public selected: string[] = [];

	private idorden: any = '';

	public listSupport: any[] = [];

	actions: Action[] = [];

	constructor(
		private _storage: StorageService,
		private api: OrdersService,
		private _rates: RatesService,
		private _menu: MenuService
	) {}

	ngOnInit() {
		this.actions = this._menu.getActions('process.orders');

		if (this.getAction('list')) {
			this.idrole = this._storage.getRolID();

			this.idorden = this.activatedRoute.snapshot.paramMap.get(
				'id'
			) as string;

			this.get();
		}
	}

	get(): void {
		const { idorden } = this;
		this.api.get({ idorden }).subscribe((r) => (this.order = r[0]));

		this.api
			.getDetails({ idorden })
			.subscribe((r) => (
				this.detailOrder = r.map((t) => {
					let soporte = JSON.parse(t.soporte);
					soporte = soporte.map(({ path: t, name }: any, index: number) => {
						const url =
							'https://giosapp.mipresapp.co' +
							t.split('/web')[1];
						const y = url.split('.');
						const tipo = y[y.length - 1].toUpperCase();
						const supportObject = {
							tipo,
							soporte: url,
							name,
							index: index + 1
						};
						return supportObject;
					});
					return { ...t, soporte };
				})
			));
	}

	getBackButtonText() {
		const isIos = this.platform.is('ios');
		return isIos ? 'Regresar' : '';
	}

	selectionChanged(item: any) {
		this.selected = item;
		this.isOpen = false;
		this.isOpenFile = false;
		this.isOpenFileView = false;

		this.get();
	}

	showPanelSupport(): void {
		this.isOpenView = true;
	}

	getThirdsServices({
		idservicio,
		idciudadservicio,
		iddetalleorden,
	}: any): void {
		this.isOpen = false;
		this.info = iddetalleorden;
		this._rates
			.get({ idservicio, idciudad: idciudadservicio })
			.subscribe((response: any[]) => {
				this.list = response;

				this.isOpen = true;
			});
	}

	getDetailSupportSelect(
		iddetalleorden: string | number,
		action: 'upload' | 'view'
	): void {
		this.isOpenFile = false;
		this.isOpenFileView = false;
		this.api.getSupports({ iddetalleorden }).subscribe((response) => {
			this.info = iddetalleorden.toString();
			if (action === 'view') {
				this.listSupport = response
					.filter(({ estado }) => estado === 'CARGADO')
					.map((r: any) => {
						try {
							r.soporte = JSON.parse(r.soporte || '[]');
							if (Array.isArray(r.soporte)) {
								r.soporte = r.soporte.map(
									(t: string, index: number) => {
										const url =
											'https://giosapp.mipresapp.co' +
											t.split('/web')[1];
										const y = url.split('.');
										const tipo =
											y[y.length - 1].toUpperCase();
										const supportObject = {
											tipo,
											soporte: url,
											index:
												r.iddetalleordensoporte +
												'-' +
												(index + 1),
										};
										return supportObject;
									}
								);
							} else {
								r.soporte = [];
							}
						} catch (error) {
							r.soporte = [];
						}
						return r;
					})
					.reduce(
						(accumulator: any[], r: any) =>
							accumulator.concat(
								r.soporte.map((t: any) => ({ ...r, ...t }))
							),
						[]
					);

				this.isOpenFileView = true;
				return;
			}
			this.listSupport = response;
			this.isOpenFile = true;
		});
	}

	getAction(item: Action): boolean {
		return this.actions.includes(item);
	}
}
