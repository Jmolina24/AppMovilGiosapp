import { Component, OnInit } from '@angular/core';
import { ScoreAPP } from 'src/app/core/interfaces/score';
import { MenuService } from 'src/app/core/services/menu.service';
import { OrdersService } from 'src/app/core/services/order.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.page.html',
  styleUrls: ['./score.page.scss'],
})
export class ScorePage implements OnInit {

  idtercero: string = this._storage.getUser().idtercero;
  _data: ScoreAPP[] = [];

  constructor(
    private _api: OrdersService,
    private _storage: StorageService,
    private _menu: MenuService
  ) { }


  ngOnInit() {
    this.get();
  }

  handleRefresh(event: any) {
    this._api.getListScore({ idcliente: 0, idclientesede: 0, idtercero: this.idtercero }).subscribe((r) => {
      this._data = r;
      event.target.complete();
      console.log(this._data);
    });

  }



  get(): void {
    this._api.getListScore({ idcliente: 0, idclientesede: 0, idtercero: this.idtercero }).subscribe((r) => {
      this._data = r;
      console.log(this._data);
    });
  }



}