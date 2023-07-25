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
  idcliente: string = this._storage.getUser().idcliente;
  idclientesede: string = this._storage.getUser().idclientesede;
  _data: ScoreAPP[] = [];
  _resultado: any = {};

  constructor(
    private _api: OrdersService,
    private _storage: StorageService,
    private _menu: MenuService
  ) { }


  ngOnInit() {
    console.log(this.idclientesede);
    // this._resultado = {
    //   "asignadas": 0,
    //   "pasignar": 0,
    //   "realizadas": 0,
    //   "total": 0,
    //   "anuladas": 0
    // }
    this.get();
  }

  handleRefresh(event: any) {
    this._api.getListScore({ idcliente: this.idcliente, idclientesede: this.idclientesede, idtercero: this.idtercero }).subscribe((r) => {
      this._data = r;
      const objetoResultado: { [key: string]: number } = {};
      for (const elemento of this._data) {
        const { estado, cantidad } = elemento;
        objetoResultado[estado] = cantidad;
      }
      this._resultado = objetoResultado;
      event.target.complete();
    });

  }



  get(): void {
    this._api.getListScore({ idcliente: this.idcliente, idclientesede: this.idclientesede, idtercero: this.idtercero }).subscribe((r) => {
      this._data = r;
      const objetoResultado: { [key: string]: number } = {};
      for (const elemento of this._data) {
        const { estado, cantidad } = elemento;
        objetoResultado[estado] = cantidad;
      }
      this._resultado = objetoResultado
    });
  }



}
