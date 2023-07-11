import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';

@Injectable({
	providedIn: 'root',
})
export class ServicesService {
	constructor(private _api: ApiService, private _storage: StorageService) {}

	public get({
		idservicio = 0,
		estado = 'T',
	}: {
		idservicio?: string | number;
		estado?: 'T' | string;
	} = {}): Observable<any[]> {
		return this._api.get<any[]>(
			`option/list-servicios?idservicio=${idservicio}&estado=${estado}`
		);
	}

	public createType(content: {
		idtiposervicio: string;
		codigo: string;
		nombre: string;
	}): Observable<any> {
		if (Object.keys(content).some((element) => !element)) {
			return of(null);
		}

		return this._api.post('admin/create-tipo-servicio', {
			...content,
			idusuarioregistra: this._storage.getUserId(),
		});
	}

	public getTypes({
		idtiposervicio = 0,
		estado = 'T',
	}: {
		idtiposervicio?: string | number;
		estado?: 'T' | string;
	} = {}): Observable<any[]> {
		return this._api.get<any[]>(
			`option/list-tipo-servicios?idtiposervicio=${idtiposervicio}&estado=${estado}`
		);
	}

	public create(content: {
		idservicio: string;
		idtiposervicio: string;
		idunidad: string;
		codigo: string;
		nombre: string;
		descripcion: string;
	}): Observable<any> {
		if (Object.keys(content).some((element) => !element)) {
			return of(null);
		}

		return this._api.post('admin/create-servicio', {
			...content,
			idusuarioregistra: this._storage.getUserId(),
		});
	}

	public changeStatus(
		idservicio = '0',
		status: string = 'A'
	): Observable<any> {
		if (!idservicio) {
			return of(null);
		}

		return this._api.post('admin/servicio-status/' + status, {
			idservicio,
			idusuarioregistra: this._storage.getUserId(),
		});
	}
}
