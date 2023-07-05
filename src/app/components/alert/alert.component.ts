import { Component, Input, OnInit } from '@angular/core';

export type AlertType = 'success' | 'error' | 'warning'

export interface Alert { type: AlertType; message: string, duration?: number, title?: string };

@Component({
	selector: 'app-alert',
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
	@Input() alert: Alert = { type: 'error', message: '¡Error al procesar la alerta!', duration: 3, title: 'ERROR' };

	isVisible: boolean = true;

	constructor() {}

	ngOnInit() {
		setTimeout(() => {
			this.isVisible = false;
		}, (this.alert?.duration || 3) * 1000);
	}
}
