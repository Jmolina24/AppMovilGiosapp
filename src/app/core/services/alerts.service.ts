import { Injectable } from '@angular/core';
import {
	AlertController,
	AlertOptions,
	LoadingController,
} from '@ionic/angular';

@Injectable({
	providedIn: 'root',
})
export class AlertService {
	private isLoading = false;

	constructor(
		private loadingCtrl: LoadingController,
		private alertController: AlertController
	) {}

	async closeAlert(): Promise<any> {
		this.isLoading = false;
		return await this.loadingCtrl.dismiss();
	}

	async loading(msj?: any): Promise<any> {
		this.isLoading = true;
		return await this.loadingCtrl
			.create({
				message: msj ? msj : 'Cargando...',
				mode: 'ios',
			})
			.then((a) => {
				a.present().then(() => {
					if (!this.isLoading) {
						a.dismiss();
					}
				});
			});
	}

	async success(header: string, message: string): Promise<any> {
		const alert = await this.alertController.create({
			header,
			message,
			buttons: ['Confirmar'],
		});

		await alert.present();
	}

	async error(header: string, message: string): Promise<any> {
		const alert = await this.alertController.create({
			header,
			message,
			buttons: ['Confirmar'],
		});

		await alert.present();
	}

	async alert(options: AlertOptions): Promise<any> {
		const alert = await this.alertController.create(options);

		await alert.present();
	}
}
