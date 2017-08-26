import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class ItemService {

  private url = "http://localhost:8080/item/";
  constructor(private http: Http) {}

  getAll() {
    return this.http.get(this.url).map(res => res.json());
  }

  getItemPromotion() {
    return this.http.get(this.url + 'getItemPromotion?quantity=1').map(res => res.json());
  }

  getItemNew(){
    return this.http.get(this.url + 'getItemNew?quantity=1').map(res => res.json());
  }
}
