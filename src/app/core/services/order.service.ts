/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';
import { Order } from 'src/app/interfaces/order';
import { OrderDetail } from '../interfaces/order-detail';

@Injectable({
	providedIn: 'root',
})
export class OrdersService {
	constructor(private _api: ApiService, private _storage: StorageService) { }

	public get({
		idorden = 0,
		idcliente = '0',
		idclientesede = '0',
		estado = 'T',
	}: {
		idorden?: string | number;
		idcliente?: string;
		idclientesede?: string;
		estado?: 'T' | string;
	} = {}): Observable<Order[]> {
		idcliente = String(
			this._storage.getRolID() !== 1
				? this._storage.getUser().idcliente || '0'
				: '0'
		);
		idclientesede = String(
			this._storage.getRolID() !== 1
				? this._storage.getUser().idclientesede || '0'
				: '0'
		);

		return this._api.get<any[]>(
			`option/list-ordenes?idorden=${idorden}&idcliente=${idcliente}&idclientesede=${idclientesede}&estado=${estado}`
		);
	}

	public create(content: {
		idorden: string;
		idtipoorden: string;
		idclientesede: string;
		fechaentrega: string;
		horaentrega: string;
		observacion: string;
	}): Observable<any> {
		return this._api.post('admin/create-orden', {
			...content,
			idusuarioregistra: this._storage.getUserId(),
		});
	}

	public changeStatus(idorden = '0', status: string = 'A'): Observable<any> {
		return this._api.post('admin/orden-status/' + status, {
			idorden,
			idusuarioregistra: this._storage.getUserId(),
		});
	}

	public changeStatusOrderDatails(
		iddetalleorden = '0',
		status: string = 'F',
		observacion_tercero = ''
	): Observable<any> {
		return this._api.post('admin/orden-detalle-status/' + status, {
			iddetalleorden,
			idusuarioregistra: this._storage.getUserId(),
			observacion_tercero
		});
	}

	public getDetails({
		iddetalleorden = '0',
		idorden = 0,
		idcliente = '0',
		idclientesede = '0',
		idtercero = '0',
		estado = 'T',
	}: {
		iddetalleorden?: string;
		idorden?: string | number;
		idcliente?: string;
		idclientesede?: string;
		idtercero?: string;
		estado?: 'T' | string;
	} = {}): Observable<OrderDetail[]> {
		idcliente = String(
			this._storage.getRolID() !== 1
				? this._storage.getUser().idcliente || '0'
				: '0'
		);
		idclientesede = String(
			this._storage.getRolID() !== 1
				? this._storage.getUser().idclientesede || '0'
				: '0'
		);

		return this._api.get<any[]>(
			`option/list-ordenes-detalles?iddetalleorden=${iddetalleorden}&idorden=${idorden}&idcliente=${idcliente}&idclientesede=${idclientesede}&idtercero=${idtercero}&estado=${estado}`
		);
	}

	public createDetail(content: {
		iddetalleorden: string;
		idorden: string | number;
		idservicio: string;
		cantidad: string;
		referencia: string;
		observacion: string;
	}): Observable<any> {
		return this._api.post('admin/create-orden-detalle', {
			...content,
			idusuarioregistra: this._storage.getUserId(),
		});
	}

	public changeStatusDetail(
		iddetalleorden = '0',
		status: string = 'A'
	): Observable<any> {
		return this._api.post('admin/orden-detalle-status/' + status, {
			iddetalleorden,
			idusuarioregistra: this._storage.getUserId(),
		});
	}

	public getTypes({
		idtipoorden = 0,
		estado = 'T',
	}: {
		idtipoorden?: string | number;
		estado?: 'T' | string;
	} = {}): Observable<any[]> {
		return this._api.get<any[]>(
			`option/list-tipo-ordenes?idtipoorden=${idtipoorden}&estado=${estado}`
		);
	}

	public createType(content: {
		idtipoorden: string;
		nombre: string;
	}): Observable<any> {
		return this._api.post('admin/create-tipo-orden', {
			...content,
			idusuarioregistra: this._storage.getUserId(),
		});
	}

	public changeStatusType(
		idtipoorden = '0',
		status: string = 'A'
	): Observable<any> {
		return this._api.post('admin/tipo-orden-status/' + status, {
			idtipoorden,
			idusuarioregistra: this._storage.getUserId(),
		});
	}

	public getSupports({
		iddetalleordensoporte = 0,
		iddetalleorden = 0,
		estado = 'T',
	}: {
		iddetalleordensoporte?: string | number;
		iddetalleorden?: string | number;
		estado?: 'T' | string;
	} = {}): Observable<any[]> {
		return this._api.get<any[]>(
			`option/list-detalles-soportes?iddetalleordensoporte=${iddetalleordensoporte}&iddetalleorden=${iddetalleorden}&estado=${estado}`
		);
	}

	public getListScore({
		idcliente = 0,
		idclientesede = 0,
		idtercero = '0'
	}: {
		idcliente?: string | number;
		idclientesede?: string | number;
		idtercero?: '0' | string;
	} = {}): Observable<any[]> {
		return this._api.get<any[]>(
			`option/list-score-app?idcliente=${idcliente}&idclientesede=${idclientesede}&idtercero=${idtercero}`
		);
	}




	public uploadSupport(
		iddetalleordensoporte: string | number,
		soporte: string[]
	): Observable<any> {
		return this._api.post('upload/soporteOrden', {
			iddetalleordensoporte,
			soporte: JSON.stringify(soporte),
			idusuarioregistra: this._storage.getUserId(),
		});
	}

	public assign({
		iddetalleorden,
		idterceroservicio,
		valor,
	}: {
		iddetalleorden?: string | number;
		idterceroservicio?: string | number;
		valor?: string | number;
	}): Observable<any> {
		return this._api.post('admin/asigna-tercero-orden', {
			iddetalleorden,
			idterceroservicio,
			valor,
			idusuarioregistra: this._storage.getUserId(),
		});
	}
}
