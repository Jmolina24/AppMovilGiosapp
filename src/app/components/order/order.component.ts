import { Component, Input, OnInit, inject } from '@angular/core';
import { Platform } from '@ionic/angular';
import { differenceInDays } from 'date-fns';

import { Order } from 'src/app/interfaces/order';

@Component({
	selector: 'app-order-c',
	templateUrl: './order.component.html',
	styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
	private platform = inject(Platform);
	@Input() order!: Order;

	constructor() {}

	ngOnInit() {}

	isIos() {
		return this.platform.is('ios');
	}

	calculateDaysElapsed(fromDate: string): number {
		const today = new Date();
		const _fromDate = new Date(fromDate);
		return differenceInDays(today, _fromDate);
	}
}
