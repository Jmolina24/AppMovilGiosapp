import { Component, Input, OnInit, inject } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Order } from 'src/app/interfaces/order';
import { differenceInDays } from 'date-fns';


@Component({
	selector: 'app-order',
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
