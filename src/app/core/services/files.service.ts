import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
	providedIn: 'root',
})
export class FilesService {
	constructor(
		private _api: ApiService
	) {}


	upload(bodyContent: FormData): Observable<any> {
		return this._api.postFile('upload/files', bodyContent);
	}
}
