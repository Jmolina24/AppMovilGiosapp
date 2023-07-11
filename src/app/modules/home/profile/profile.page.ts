import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  data: any;
  constructor(
    private _storage: StorageService,
    private _router: Router
  ) {


  }

  ngOnInit() {
    this.data = this._storage.getUser();
  }


	signOut(): void {
		this._storage.signOut();
		this._router.navigate(['/sign-in']);
	}



}
