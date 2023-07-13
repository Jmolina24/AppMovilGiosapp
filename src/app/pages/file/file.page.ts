import { Component, Input, Output, EventEmitter } from '@angular/core';
import type { OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { AlertService } from 'src/app/core/services/alerts.service';
import { FilesService } from 'src/app/core/services/files.service';
import { OrdersService } from 'src/app/core/services/order.service';

import * as _ from 'lodash';

import { register } from 'swiper/element/bundle';
import { IonicSlides } from '@ionic/angular';

register();

@Component({
	selector: 'app-file',
	templateUrl: './file.page.html',
	styleUrls: ['./file.page.scss'],
})
export class FilePage implements OnInit {
	@Input() items: any[] = [];
	@Input() iddetalleorden: any = '';
	@Input() title = 'Cargar Soporte';

	@Input() action: 'upload' | 'view' = 'view';

	@Output() selectionCancel = new EventEmitter<void>();
	@Output() selectionChange = new EventEmitter<void>();

	swiperModules = [IonicSlides];

	filteredItems: any[] = [];
	value: any = {};

	listFiles: any[] = [];

	files: any[] = [];

	isLoading = false;

	formData: FormData = new FormData();

	slideOpts = {
		initialSlide: 1,
		speed: 400,
	};

	constructor(
		private _service: OrdersService,
		private _alert: AlertService,
		private _file: FilesService
	) {}

	ngOnInit() {
		this.filteredItems = [...this.items];
		this.formData.forEach((element, key) => {
			this.formData.delete(key);
		});

		this.files = [];
		this.listFiles = [];
		console.log(this.items);
	}

	trackItems(index: number, item: any) {
		return item.value;
	}

	cancelChanges() {
		this.selectionCancel.emit();
	}

	confirmChanges() {
		this.selectionChange.emit();
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
				return item.tiposoporte.toLowerCase().includes(normalizedQuery);
			});
		}
	}

	onFileChange(target: any, iddetalleordensoporte: any): void {
		let pFileList = target.files;
		pFileList = Array.from(pFileList);

		if (!pFileList) {
			return;
		}

		if (!iddetalleordensoporte) {
			this._alert.error('Error', 'Seleccione un tipo de soporte');
			return;
		}

		const files = pFileList.map((file: any, index: number) => ({
			file,
			id: new Date().getTime() + index,
			iddetalleordensoporte: iddetalleordensoporte,
		}));

		this.files.push({
			files,
			iddetalleordensoporte: iddetalleordensoporte,
		});

		this.listFiles.push(...files);
	}

	getIfExitsIdDetailSoporte(id: any): boolean {
		return this.items.find((e) => e.iddetalleordensoporte === id);
	}

	getNameDetailSoporte(id: any): string {
		return this.items.find((e) => e.iddetalleordensoporte === id)
			.tiposoporte;
	}

	deleteFile(f: any, index: number): void {
		this.files[index].files = this.files[index].files.filter(
			(r: any) => r.id !== f.id
		);
		this.listFiles = this.listFiles.filter(({ id }) => id !== f.id);
	}

	isIdRepeated(id: number): boolean {
		return this.files.indexOf(id) !== this.files.lastIndexOf(id);
	}

	uploadSupport(
		iddetalleordensoporte: string | number,
		soporte: string[]
	): Observable<any> {
		return this._service.uploadSupport(iddetalleordensoporte, soporte);
	}

	fnUpload(): void {
		if (this.files.length === 0) {
			this._alert.error('Error', 'Ingrese un archivo');
			return;
		}

		if (
			this.files.some((e) => this.isIdRepeated(e.iddetalleordensoporte))
		) {
			this._alert.error(
				'Error',
				'Solamente se permite un archivo por tipo de soporte'
			);
			return;
		}

		this.isLoading = true;
		this._alert.loading();

		this.listFiles.forEach(({ file }) =>
			this.formData.append('files', file)
		);

		this._file.upload(this.formData).subscribe({
			next: (response) => {
				if (response.codigo !== 0) {
					this.isLoading = false;
					this._alert.closeAlert();
					this._alert.error(response.titulo, response.mensaje);
					return;
				}

				response.rutas.forEach((element: any, index: number) => {
					this.listFiles[index].path = element.path;
				});

				const files = _.chain(this.listFiles)
					.groupBy('iddetalleordensoporte')
					.value();

				forkJoin(
					Object.keys(files).map((r: any) =>
						this.uploadSupport(
							r,
							files[r].map(({ path }: any) => path)
						)
					)
				).subscribe(
					(r: any[]) => {
						this.isLoading = false;
						this._alert.closeAlert();
						const i = r.filter((element) => element.codigo !== 0);
						if (i.length > 0) {
							this._alert.error('Error', i.join(', '));
							return;
						}

						this._alert.success(
							response.titulo,
							'Soporte(s) Cargados Correctamente...'
						);

						this.confirmChanges();
					},
					({ error }) => {
						this.isLoading = false;
						this._alert.closeAlert();
						this._alert.error(
							error.titulo || 'Error',
							error.mensaje || 'Error al procesar la solicitud.'
						);
					}
				);
			},
			error: ({ error }) => {
				this.isLoading = false;
				this._alert.closeAlert();
				this._alert.error(
					error.titulo || 'Error',
					error.mensaje || 'Error al procesar la solicitud.'
				);
			},
		});
	}

	download(url: string): void {
		this._file.download(url);
	}
}
