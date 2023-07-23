import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

type Id = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type Module =
	| 'home'
	| 'process'
	| 'process.score'
	| 'process.orders'
	| 'process.assigned-services';


export type Action =
	| 'create'
	| 'edit'
	| 'list'
	| 'changeStatus'
	| 'changeStatusDetail'
	| 'view_details'
	| 'create_detail'
	| 'edit_detail'
	| 'assign_detail'
	| 'upload_support'
	| 'view_support';

@Injectable({
	providedIn: 'root',
})
export class MenuService {

	constructor(private _storage: StorageService) { }

	getMenuAccess(): { id: Module, actions: Action[] }[] {
		console.log(this._storage.getMenu())
		return this._storage.getMenu();
	}

	getActions(name: Module): Action[] {
		return (
			this._storage
				.getMenu()
				.find((e: { id: any }) => e.id === name)
				?.actions.map((action: { id: any; }) => action.id) || []
		);
	}

	getAction(name: Module, action: Action): boolean {
		return (
			this._storage
				.getMenu()
				.find((e: { id: any }) => e.id === name)
				?.actions.map((e: { id: string }) => e.id).includes(action)
		);
	}
}
