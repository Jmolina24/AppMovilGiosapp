import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService, Module } from 'src/app/core/services/menu.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.page.html',
	styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


	menu: Module[] = [];

	constructor(private _router: Router, private _storage: StorageService, private _menu: MenuService) { }

	ngOnInit() {
		this.menu = JSON.parse(JSON.stringify(this._menu.getMenuAccess().map((r) => r.id)));
	}

	hasAccess(id: Module): boolean {
		return this.menu.includes(id);
	}

	signOut(): void {
		this._storage.signOut();
		this._router.navigate(['/sign-in']);
	}
}
