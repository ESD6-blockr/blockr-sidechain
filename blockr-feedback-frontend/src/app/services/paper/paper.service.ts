import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaperService extends ApiService {

  constructor(http: HttpClient) {
    super(http);
  }

  addPaper(fileContent) {
    const body = {
      file: fileContent
    };
    return this.getHttpClient().post(`${this.getApiUrl()}/paper`, body, this.getHttpOptions());
  }
}
