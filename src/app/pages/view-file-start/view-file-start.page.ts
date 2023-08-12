import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { IonicSlides } from '@ionic/angular';
import { FilesService } from 'src/app/core/services/files.service';

@Component({
	selector: 'app-view-file-start',
	templateUrl: './view-file-start.page.html',
	styleUrls: ['./view-file-start.page.scss'],
})
export class ViewFileStartPage implements OnInit {

	@Input() items: any[] = [];
	@Output() selectionCancel = new EventEmitter();
	@Output() selectionChange = new EventEmitter();

	swiperModules = [IonicSlides];

	slideOpts = {
		initialSlide: 1,
		speed: 400,
	};

	constructor(private _file: FilesService) { }

	ngOnInit() {
	}

	cancelChanges() {
		this.selectionCancel.emit('');
	}

	confirmChanges() {
		this.selectionChange.emit('');
	}

	download(url: string): void {
		this._file.download(url);
	}
}
