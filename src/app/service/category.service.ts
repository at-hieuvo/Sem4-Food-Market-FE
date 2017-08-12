import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class CategoryService {
  cart: Array<any> = [];
  item: any = null;
  items: Array<any> = [];
  constructor(private http: Http) {
  }
  getList() {
    return this.http.get('assets/data.json').map(res => res.json());
  }
  getDetail(index: number) {
    return this.http.get('assets/data.json')
      .map(article => article.json().articles.find(trai => trai.id === index));
  }
}
