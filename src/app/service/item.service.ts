import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class ItemService {
  private url = 'http://localhost:8080/item/';
  constructor(private http: Http) {}

  getAll() {
    return this.http.get(this.url).map(res => res.json());
  }

  getItemPromotion() {
    return this.http.get(this.url + 'getItemPromotion?quantity=6').map(res => res.json());
  }

  getItemNew() {
    return this.http.get(this.url + 'getItemNew?quantity=7').map(res => res.json());
  }

    getItemBest() {
        return this.http.get(this.url + 'getItemBest').map(res => res.json());
    }

    getItemById(id: number) {
        return this.http.get(this.url + 'getItemById/' + id).map(res => res.json());
    }

    getItemRelated(id: number) {
        return this.http.get('http://localhost:8080/category/items/' + id).map(res => res.json());
    }

    getImageOfItem(id: number) {
        return this.http.get('http://localhost:8080/images/item/' + id).map(res => res.json());
    }
}
