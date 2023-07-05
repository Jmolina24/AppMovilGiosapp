import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alert } from 'src/app/components/alert/alert.component';
import { AuthService } from 'src/app/core/services/auth.service';

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

	constructor(private fb: FormBuilder, private auth: AuthService) {
		this.formData = this.fb.group({
			username: ['', [Validators.required]],
			password: ['', [Validators.required]],
		});
	}

	ngOnInit() {}

	signIn() {
		var formData: any = new FormData();
		if (!this.formData.valid) {
			this.alert = {
				title: '¡Datos incompletos!',
				message: 'Ingrese los datos requeridos',
				type: 'warning',
			};
			return;
		}
		this.isLoading = true;

		this.formData.disable();

		formData.append('username', this.formData.get('username')?.value);
		formData.append('password', this.formData.get('password')?.value);
		this.auth.signIn(formData.value).subscribe(
			(response: any) => {
				if (!response) {
					this.formData.enable();
					return;
				}
				this.alert = {
					title: response.message,
					message: 'Inicio de sesión',
					type: 'success',
				};
			},
			(error) => {
				this.alert = {
					title: error.message,
					message: error.errors.message,
					type: 'error',
				};

				this.formData.enable();
			},
			() => {
				this.isLoading = false;
			}
		);
	}

	fnShowPassword(): void {
		this.showPassword = !this.showPassword;
	}
}
