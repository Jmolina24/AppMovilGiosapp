import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(private _api: ApiService) {}

	signIn(content: { username: string; password: string }): Observable<any> {
		return this._api.post('login/sign', content);
	}
}
