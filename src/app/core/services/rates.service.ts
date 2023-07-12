import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';

@Injectable({
	providedIn: 'root',
})
export class RatesService {
	constructor(private _api: ApiService, private _storage: StorageService) {}

	public get({
		idterceroservicio = '0',
		idtercero = '0',
		idservicio = '0',
		idciudad = '0',
		estado = 'T',
	}: {
		idterceroservicio?: string;
		idtercero?: string;
		idservicio?: string;
		idciudad?: string;
		estado?: string;
	} = {}): Observable<any> {
		return this._api.get<any[]>(
			`option/list-terceros-servicios?idterceroservicio=${idterceroservicio}&idtercero=${idtercero}&idservicio=${idservicio}&idciudad=${idciudad}&estado=T`
		);
	}
}
