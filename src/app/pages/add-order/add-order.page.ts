import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Observable, forkJoin, of, throwError } from 'rxjs';
import { ClientsService } from 'src/app/core/services/clients.service';
import { OrdersService } from 'src/app/core/services/order.service';
import { ServicesService } from 'src/app/core/services/services.service';

@Component({
	selector: 'app-add-order',
	templateUrl: './add-order.page.html',
	styleUrls: ['./add-order.page.scss'],
})
export class AddOrderPage implements OnInit {
	listCustomers: any[] = [];
	listSites: any[] = [];
	listTypes: any[] = [];
	listServices: any[] = [];

	listDetails: any[] = [];

	data: any = {
		fechaentrega: this.getDate(new Date().toString()),
	};
	dataDetail: any = {};

	addService: boolean = false;

	isLoading: boolean = false;

	constructor(
		private _clients: ClientsService,
		private _orders: OrdersService,
		private _services: ServicesService,
		private loadingCtrl: LoadingController,
		private alertController: AlertController,
		private _router: Router
	) {}

	ngOnInit() {
		this.getClients();
		this.getTypes();
		this.getServices();
	}

	getClients(): void {
		this._clients.get().subscribe((response) => {
			this.listCustomers = response;
		});
	}

	getSites(idcliente: string | number): void {
		this._clients.bySite({ idcliente }).subscribe((response) => {
			this.listSites = response;
		});
	}

	getTypes(): void {
		this._orders.getTypes().subscribe((response: any) => {
			if (!response) {
				return;
			}

			this.listTypes = response;
		});
	}

	getServices(): void {
		this._services.get().subscribe((response) => {
			this.listServices = response;
		});
	}

	getNameService(id: number): string {
		return this.listServices.find((r) => r.idservicio === id).nombre;
	}

	removeDetail(id: number): void {
		this.listDetails = this.listDetails.filter((e) => e.idservicio !== id);
	}

	fnAddDetails(): void {
		this.listDetails.push(this.dataDetail);

		this.dataDetail = {
			idservicio: '0',
			cantidad: '0',
			referencia: '',
			observacion: '',
		};
	}

	fnCreate(): void {
		if (this.listDetails.length === 0) {
			this.presentAlert(
				'Alerta',
				'Tiene que tener por lo menos, un servicio asignado'
			);
			return;
		}

		this.present();

		this.create().subscribe(
			(response) => {
				if (response.codigo !== 0) {
					this.presentAlert(response.titulo, response.mensaje);
					return;
				}
				forkJoin(
					this.listDetails.map((e) => this.createDetail(response, e))
				).subscribe(
					(r: any[]) => {
						const i = r.filter((element) => element.codigo !== 0);
						if (i.length > 0) {
							this.presentAlert('Error', i.join(', '));
							return;
						}

						this.dismiss();
						this.presentAlert(
							response.mensaje,
							'Orden y Detalle(s) de Orden Creados Correctamente...'
						);

						this.clear();
					},
					({ error }) => {
						this.dismiss();
						this.presentAlert(
							'Error',
							error.mensaje || 'Error al procesar la solicitud.'
						);
					}
				);
			},
			(error) => {
				console.log(error);
				this.dismiss();
				this.presentAlert(
					'Error',
					error.mensaje || 'Error al procesar la solicitud.'
				);
			}
		);
	}

	create(): Observable<any> {
		try {
			let { fechaentrega, ...data } = this.data;

			if (Object.values(data).every((e) => !e)) {
				return throwError({ mensaje: 'Ingrese los datos completos.' });
			}

			if (Object.values(data).length < 3) {
				return throwError({ mensaje: 'Ingrese los datos requeridos.' });
			}

			if (!data.idtipoorden) {
				return throwError({
					mensaje: 'Ingrese los datos requeridos: El tipo de orden',
				});
			}

			if (!data.idclientesede) {
				return throwError({
					mensaje: 'Ingrese los datos requeridos: Sede',
				});
			}

			let content = {
				idorden: '0',
				...data,
			};

			if (fechaentrega) {
				fechaentrega = fechaentrega?.split('T');

				content = {
					...content,
					fechaentrega: fechaentrega[0],
					horaentrega: fechaentrega[1],
				};
			}

			return this._orders.create({
				fechaentrega: '',
				horaentrega: '',
				observacion: '',
				...content,
			});
		} catch (error) {
			return throwError({ mensaje: 'Ingrese los datos correctos.' });
		}
	}

	createDetail(response: any, data: any): Observable<any> {
		if (response.codigo !== 0) {
			this.presentAlert(
				response.titulo || 'Error',
				response.mensaje || 'Error al procesar la solicitud.'
			);
			return of(null);
		}

		return this._orders.createDetail({
			referencia: '',
			observacion: '',
			...data,
			idorden: response.idorden,
			iddetalleorden: '0',
		});
	}

	clear(): void {
		this.dataDetail = {
			idservicio: '0',
			cantidad: '0',
			referencia: '',
			observacion: '',
		};

		this.listDetails = [];

		this.data = {
			idtipoorden: '',
			idcliente: '',
			idclientesede: '',
			fechaentrega: this.getDate(new Date().toString()),
			observacion: '',
		};
	}

	async present() {
		this.isLoading = true;
		return await this.loadingCtrl.create().then((a) => {
			a.present().then(() => {
				if (!this.isLoading) {
					a.dismiss();
				}
			});
		});
	}

	async dismiss() {
		this.isLoading = false;
		return await this.loadingCtrl.dismiss();
	}

	async presentAlert(header: string, message: string) {
		const alert = await this.alertController.create({
			header,
			message,
			buttons: ['Confirmar'],
		});

		await alert.present();
	}

	getDate(date: string): string {
		const fecha = new Date(date);

		const year = fecha.getFullYear();
		const month = String(fecha.getMonth() + 1).padStart(2, '0');
		const day = String(fecha.getDate()).padStart(2, '0');
		const hours = String(fecha.getHours()).padStart(2, '0');
		const minutes = String(fecha.getMinutes()).padStart(2, '0');
		const seconds = String(fecha.getSeconds()).padStart(2, '0');

		return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
	}
}
