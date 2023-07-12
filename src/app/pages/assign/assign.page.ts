import { Component, Input, Output, EventEmitter } from '@angular/core';
import type { OnInit } from '@angular/core';
import { AlertService } from 'src/app/core/services/alerts.service';
import { OrdersService } from 'src/app/core/services/order.service';

@Component({
	selector: 'app-assign',
	templateUrl: './assign.page.html',
	styleUrls: ['./assign.page.scss'],
})
export class AssignPage implements OnInit {
	@Input() items: any[] = [];
	@Input() iddetalleorden: any = '';
	@Input() selectedItems: string[] = [];
	@Input() title = 'Select Items';

	@Output() selectionCancel = new EventEmitter<void>();
	@Output() selectionChange = new EventEmitter<string[]>();

	filteredItems: any[] = [];
	value: any = {};

	constructor(
		private _service: OrdersService,
		private _alert: AlertService
	) {}

	ngOnInit() {
		this.filteredItems = [...this.items];
	}

	trackItems(index: number, item: any) {
		return item.value;
	}

	cancelChanges() {
		this.selectionCancel.emit();
	}

	confirmChanges() {
		this.selectionChange.emit(this.value);
	}

	searchbarInput(ev: any) {
		this.filterList(ev.target.value);
	}

	filterList(searchQuery: string | undefined) {
		if (searchQuery === undefined) {
			this.filteredItems = [...this.items];
		} else {
			const normalizedQuery = searchQuery.toLowerCase();
			this.filteredItems = this.items.filter((item) => {
				return item.tercero.toLowerCase().includes(normalizedQuery);
			});
		}
	}

	assign(item: any): void {
		const { idterceroservicio, valor } = item;

		if (!this.iddetalleorden || !idterceroservicio) {
			// if (!iddetalleorden || !idterceroservicio || !valor) {
			this._alert.error('Error', 'Error al asignar');
			return;
		}

		this._alert.loading();

		this._service
			.assign({
				...item,
				iddetalleorden: this.iddetalleorden,
				valor: item.valor || '1',
			})
			.subscribe(
				(response) => {
					this._alert.closeAlert();
					if (response.codigo !== 0) {
						this._alert.error(response.titulo, response.mensaje);
						return;
					}

					this._alert.success(
						response.titulo,
						response.mensaje || 'Servicio asignado'
					);

					this.confirmChanges();
				},
				({ error }: any) => {
					this._alert.error(
						error.titulo || 'Error',
						error.mensaje || 'Error al procesar la solicitud.'
					);
				}
			);
	}
}
