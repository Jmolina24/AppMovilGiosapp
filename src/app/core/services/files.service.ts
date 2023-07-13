import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

import * as File from 'file-saver';


@Injectable({
	providedIn: 'root',
})
export class FilesService {
	constructor(
		private _api: ApiService,
		private _http: HttpClient
	) {}


	upload(bodyContent: FormData): Observable<any> {
		return this._api.postFile('upload/files', bodyContent);
	}

	download(url: string): void {
		this._http
			.get(url, { responseType: 'blob' })
			.subscribe((response: Blob) => {
				File.saveAs(response);
			});
	}
}
