import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/core/services/alerts.service';
import { FilesService } from 'src/app/core/services/files.service';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.page.html',
	styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
	messageText: string = '';

	messages: {
		from: string;
		text: string;
		support: any;
	}[] = [];

	files: any[] = [];

	isWriting = false;

	constructor(private _alert: AlertService, private _file: FilesService) {}

	ngOnInit() {}

	sendMessage(): void {
		this.messages.push({
			text: this.messageText,
			from: 'ME',
			support: this.files.length > 0 ? this.files : null,
		});

		this.isWriting = true;

		this.messageText = '';
		this.files = [];

		setTimeout(() => {
			this.isWriting = false;
			this.messages.push({
				text: '¡ORDEN RECIBIDA CORRECTAMENTE!',
				from: 'SUPPORT',
				support: null,
			});
		}, 1500);
	}

	onFileChange(target: any): void {
		let pFileList = target.files;
		pFileList = Array.from(pFileList);

		if (!pFileList) {
			return;
		}

		const processFiles = async () => {
			if (pFileList.some(({ size }: any) => size >= 5 * 1024 * 1024)) {
				this._alert.error(
					'Error',
					'Algún archivo excede el tamaño máximo de 5 MB'
				);
				return;
			}

			this.files = await Promise.all(
				pFileList.map(async (file: File, index: number) => ({
					file,
					base64: await this.convertirImagenTOBase64(file),
					id: new Date().getTime() + index,
				}))
			);
		};

		processFiles();
	}

	convertirImagenTOBase64(file: File): Promise<string> {
		return new Promise((resolve, reject) => {
			if (file) {
				const lector = new FileReader();
				lector.onload = function (e) {
					if (e?.target) {
						resolve(e.target.result as string);
					}
				};
				lector.onerror = function (e) {
					reject(new Error('Error al leer la imagen.'));
				};
				lector.readAsDataURL(file);
			} else {
				reject(new Error('No se seleccionó ningún archivo.'));
			}
		});
	}
}
