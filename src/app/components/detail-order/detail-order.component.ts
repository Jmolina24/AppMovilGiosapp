import { Component, OnInit, inject, Input } from '@angular/core';
import { Platform } from '@ionic/angular';
import { differenceInDays } from 'date-fns';

import { OrderDetail } from 'src/app/core/interfaces/order-detail';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
	selector: 'app-detail-order',
	templateUrl: './detail-order.component.html',
	styleUrls: ['./detail-order.component.scss'],
})
export class DetailOrderComponent implements OnInit {
	private platform = inject(Platform);

	@Input() detail!: OrderDetail;
	idrole: number = this._storage.getRolID();

	constructor(private _storage: StorageService) {}

	ngOnInit() {
		console.log(this.detail);
	}

	isIos() {
		return this.platform.is('ios');
	}

	calculateDaysElapsed(fromDate: string): string {
		const today = new Date();
		const _fromDate = new Date(fromDate);
		const _d = differenceInDays(today, _fromDate);
		if (_d === 0) {
			return 'hoy';
		}
		return (_d < 0 ? 'dentro ' : 'hace ') + (_d < 0 ? -_d : _d) + ' dia(s)';
	}
}
