import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.page.html',
	styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
	constructor(private _router: Router, private _storage: StorageService) {}

	ngOnInit() {}

	signOut(): void {
		this._storage.signOut();
		this._router.navigate(['/sign-in']);
	}
}
