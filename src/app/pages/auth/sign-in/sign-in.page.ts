import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alert } from 'src/app/components/alert/alert.component';
import { AuthService } from 'src/app/core/services/auth.service';
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

	constructor(
		private fb: FormBuilder,
		private auth: AuthService,
		private _storage: StorageService,
		private _router: Router
	) {
		this.formData = this.fb.group({
			username: ['', [Validators.required]],
			password: ['', [Validators.required]],
		});
	}

	ngOnInit() {}

	signIn(): void {
		if (this.formData.invalid) {
			return;
		}
		this.isLoading = true;

		this.formData.disable();

		this.auth.signIn(this.formData.value).subscribe(
			(response: any) => {
				this.alert = {
					type: response.codigo === 0 ? 'success' : 'error',
					message: response.mensaje,
				};

				if (response.codigo !== 0) {
					return;
				}
				const { token, id, idrol, ...user } = response;

				this._storage.saveToken(token);
				this._storage.saveUser(user);
				this._storage.saveUserId(id);
				this._storage.saveRolId(idrol);

				if (this._storage.getUserId()) {
					this._router.navigate(['/manage-orders']);
				}
			},
			(error: HttpErrorResponse) => {
				this.alert = {
					title: error.name,
					message: error.error.mensaje || error.message,
					type: 'error',
				};

				this.formData.enable();
				this.isLoading = false;
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
