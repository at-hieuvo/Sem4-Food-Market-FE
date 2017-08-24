import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class ItemService {

  private url = "http://localhost:8080/";
  constructor(private http: Http) {}

  getAll() {
    return this.http.get(this.url + 'all').map(res => res.json());
  }

}
