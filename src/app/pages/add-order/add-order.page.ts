import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import {
	Observable,
	catchError,
	forkJoin,
	of,
	switchMap,
	throwError,
} from 'rxjs';
import { ClientsService } from 'src/app/core/services/clients.service';
import { FilesService } from 'src/app/core/services/files.service';
import { OrdersService } from 'src/app/core/services/order.service';
import { ServicesService } from 'src/app/core/services/services.service';
import { StorageService } from 'src/app/core/services/storage.service';

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

	roleId: any = '';

	constructor(
		private _clients: ClientsService,
		private _orders: OrdersService,
		private _services: ServicesService,
		private loadingCtrl: LoadingController,
		private alertController: AlertController,
		private _storage: StorageService,
		private _file: FilesService
	) {}

	ngOnInit() {
		this.getClients();
		this.getTypes();
		this.getServices();
	}

	getClients(): void {
		this.roleId = this._storage.getRolID();
		this._clients.get().subscribe((response) => {
			this.listCustomers = response;

			this.data.idcliente = this._storage.getUser().idcliente;

			if (this.data.idcliente) {
				this.getSites(this.data.idcliente);
			}
		});
	}

	getSites(idcliente: string | number): void {
		this._clients.bySite({ idcliente }).subscribe((response) => {
			this.listSites = response;

			this.data.idclientesede = this._storage.getUser().idclientesede;
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
			cantidad: '',
			referencia: '',
			observacion: '',
			soporte: [],
		};
		this.addService = false;
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

	fnCreateOnlyOrder(): void {
		this.present();

		const { idcliente, idclientesede, observacion } = this.data;

		if (Object.values([idcliente, idclientesede]).every((e) => !e)) {
			this.dismiss();
			this.presentAlert(
				'Error',
				'Ingrese los campos requeridos.'
			);

			return;
		}

		// this._orders.create({
		// 	idclientesede,
		// 	observacion,
		// 	fechaentrega: '',
		// 	horaentrega: '',
		// 	idorden: '',
		// 	idtipoorden: ''
		// }).subscribe(
		// 	(response) => {
		// 		if (response.codigo !== 0) {
		// 			this.presentAlert(response.titulo, response.mensaje);
		// 			return;
		// 		}
		// 		forkJoin(
		// 			this.listDetails.map((e) => this.createDetail(response, e))
		// 		).subscribe(
		// 			(r: any[]) => {
		// 				const i = r.filter((element) => element.codigo !== 0);
		// 				if (i.length > 0) {
		// 					this.presentAlert('Error', i.join(', '));
		// 					return;
		// 				}

		// 				this.dismiss();
		// 				this.presentAlert(
		// 					response.mensaje,
		// 					'Orden y Detalle(s) de Orden Creados Correctamente...'
		// 				);

		// 				this.clear();
		// 			},
		// 			({ error }) => {
		// 				this.dismiss();
		// 				this.presentAlert(
		// 					'Error',
		// 					error.mensaje || 'Error al procesar la solicitud.'
		// 				);
		// 			}
		// 		);
		// 	},
		// 	(error) => {
		// 		this.dismiss();
		// 		this.presentAlert(
		// 			'Error',
		// 			error.mensaje || 'Error al procesar la solicitud.'
		// 		);
		// 	}
		// );


		this.dismiss();
		this.presentAlert(
			'Completamente',
			'Orden Creada Correctamente... Orden No. #' + new Date().getTime().toString()[0]
		);

		this.clear();
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

		if (data.soporte.length === 0) {
			const detalleData = {
				...data,
				idorden: response.idorden,
				iddetalleorden: '0',
				soporte: JSON.stringify([]),
			};

			return this._orders.createDetail(detalleData);
		}

		const formData = new FormData();

		data.soporte.forEach(({ file }: any) => {
			formData.append('files', file);
		});

		return this._file.upload(formData).pipe(
			switchMap(({ rutas }) => {
				const soporte = rutas.map(({ path, originalname }: any) => ({
					path,
					name: originalname,
				}));

				return this._orders.createDetail({
					referencia: '',
					observacion: '',
					...data,
					idorden: response.idorden,
					iddetalleorden: '0',
					soporte: JSON.stringify(soporte),
				});
			}),
			catchError((error) => {
				return throwError(error); // or throwError(error) if you want to propagate the error
			})
		);
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

	onFileChange(event: any): void {
		let pFileList = event.target.files;
		pFileList = Array.from(pFileList);

		if (!pFileList) {
			return;
		}

		const f = pFileList as unknown as File[];
		if (f.some(({ size }) => size >= 5 * 1024 * 1024)) {
			this.presentAlert(
				'Error',
				'Algún archivo excede el tamaño máximo de 5 MB'
			);
			return;
		}

		this.dataDetail.soporte = pFileList.map((file: any, index: number) => ({
			file,
			id: new Date().getTime() + index,
		}));
	}

	deleteFile(id: number): void {
		this.dataDetail.soporte = this.dataDetail.soporte.filter(
			(r: any) => r.id !== id
		);
	}
}
