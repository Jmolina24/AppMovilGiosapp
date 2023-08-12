import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { timeInterval, timeout } from 'rxjs';
import { AlertService } from 'src/app/core/services/alerts.service';
import { Action, MenuService } from 'src/app/core/services/menu.service';
import { OrdersService } from 'src/app/core/services/order.service';
import { RatesService } from 'src/app/core/services/rates.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
	selector: 'app-view-info-detail',
	templateUrl: './view-info-detail.page.html',
	styleUrls: ['./view-info-detail.page.scss'],
})
export class ViewInfoDetailPage implements OnInit {

	public loaded = false;
	idorden: any = '';
	iddetalleorden: any = '';

	public idrole: number = 1;

	item: any = {};

	isOpen = false;
	isOpenFile = false;
	isOpenView = false;
	showImg = false;

	listSupports: any[] = [];

	public list: any[] = [];

	private activatedRoute = inject(ActivatedRoute);
	private platform = inject(Platform);

	public selected: string[] = [];

	actions: Action[] = [];


	constructor(
		private _storage: StorageService,
		private api: OrdersService,
		private _rates: RatesService,
		private _alert: AlertService,
		private _menu: MenuService
	) { }

	ngOnInit() {
		setTimeout(() => {
			this.loaded = true;
		}, 1000);

		this.actions = this._menu.getActions('process.assigned-services');

		if (this.getAction('view_details')) {
			this.idorden = this.activatedRoute.snapshot.paramMap.get(
				'id'
			) as string;
			this.iddetalleorden = this.activatedRoute.snapshot.paramMap.get(
				'iddetalleorden'
			) as string;
			this.get();
		}

	}

	get(): void {
		const { idorden, iddetalleorden } = this;

		this.api
			.getDetails({ idorden, iddetalleorden })
			.subscribe((r) => {
				const item = r[0];

				let soporte = JSON.parse(item.soporte);
				soporte = soporte.map(({ path: t, name }: any, index: number) => {
					const url =
						'https://demo.mainsoft.technology' +
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
				this.item = { ...item, soporte };
			});
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

	getDetailSupportSelect(
		iddetalleorden: string | number,
		action: 'upload' | 'view'
	): void {
		this.isOpenFile = false;
		this.api.getSupports({ iddetalleorden }).subscribe((response) => {
			if (action === 'view') {
				this.listSupports = response
					.filter(({ estado }) => estado === 'CARGADO')
					.map((r: any) => {
						try {
							r.soporte = JSON.parse(r.soporte || '[]');
							if (Array.isArray(r.soporte)) {
								r.soporte = r.soporte.map(
									(t: string, index: number) => {
										const url =
											'https://demo.mainsoft.technology' +
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
				this.isOpenFile = true;
				return;
			}
			this.listSupports = response;
			this.isOpenFile = true;
		});
	}

	getBackButtonText() {
		const isIos = this.platform.is('ios');
		return isIos ? 'Regresar' : '';
	}

	selectionChanged(item: any) { }


	changeStatusOrderDetail({ iddetalleorden }: any, status: 'F' | 'P' = 'P'): void {
		this._alert.loading();

		this.api
			.changeStatusOrderDatails(iddetalleorden, status)
			.subscribe(
				(response) => {
					this._alert.closeAlert();
					if (response.codigo !== 0) {
						this._alert.error(response.titulo, response.mensaje);
						return;
					}

					this._alert.success(response.titulo, response.mensaje);

					this.get();
				},
				({ error }) => {
					this._alert.closeAlert();
					this._alert.error(error.titulo || 'Error', error.mensaje || 'Error al procesar la solicitud.');
				}
			);
	}


	getAction(item: Action): boolean {
		return this.actions.includes(item);
	}

	showPanelSupport(): void {
		this.isOpenView = true;
	}
}
