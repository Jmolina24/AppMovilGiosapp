import { Component, Input, OnInit, inject } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Order } from 'src/app/interfaces/order';

@Component({
	selector: 'app-order',
	templateUrl: './order.component.html',
	styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
	private platform = inject(Platform);
	@Input() message?: Order;
	isIos() {
		return this.platform.is('ios');
	}

	constructor() {}

	ngOnInit() {}
}
