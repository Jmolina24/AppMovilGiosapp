import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Alert } from 'src/app/components/alert/alert.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { MenuService } from 'src/app/core/services/menu.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.page.html',
	styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
	screen: any = 'signin';
	formData: FormGroup;
	alert!: Alert;
	isLoading: boolean = false;
	showPassword: boolean = false;
	isAlertOpen = false;
	public alertButtons = ['OK'];

	constructor(
		private fb: FormBuilder,
		private auth: AuthService,
		private _storage: StorageService,
		private _router: Router,
		private alertController: AlertController,
		private menu: MenuService
	) {
		this.formData = this.fb.group({
			username: ['', [Validators.required]],
			password: ['', [Validators.required]],
		});
	}

	ngOnInit() {


	}

	async presentAlert(message: any) {
		const alert = await this.alertController.create({
			header: 'Notificación Giosapp',
			subHeader: '',
			message: message,
			buttons: ['OK'],
		});

		await alert.present();
	}



	signIn(): void {
		if (this.formData.invalid) {
			this.presentAlert('Completar todos los campos');
			return;
		}
		this.isLoading = true;
		this.formData.disable();
		this.auth.signIn(this.formData.value).subscribe(
			({
				next: (response: any) => {
					this.formData.get('username')?.setValue('');
					this.formData.get('password')?.setValue('');
					this.formData.enable();
					if (response.codigo == 1) {
						this.presentAlert(response.mensaje);
						return;
					} else {
						const { token, id, idrol, ...user } = response;

						this._storage.saveToken(token);
						this._storage.saveUser(user);
						this._storage.saveUserId(id);
						this._storage.saveRolId(idrol);

						if (this._storage.getUserId()) {
							const menu = this.menu.getMenuAccess().map((r) => r.id);
							if (menu) {
								if (menu.includes('process.assigned-services')) {
									this._router.navigate(['/manage-orders']);
									return
								} else if (menu.includes('process.orders')) {
									this._router.navigate(['/order']);
									return
								}

								this._router.navigate(['/profile']);

							}

						}
					}
				},
				error: (error) => {
					this.formData.enable();
					if (error.codigo == 1) {
						this.presentAlert(error.mensaje);
						return;
					} else {
						this.presentAlert(`error status ${error.status}: ${error.error.mensaje || 'Error al procesar'}`);
					}
				},
				complete: () => {
					this.formData.enable();
				}
			})
		);
	}

	fnShowPassword(): void {
		this.showPassword = !this.showPassword;
	}
}
