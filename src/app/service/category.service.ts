import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';

@Injectable()
export class CategoryService {
  constructor(private http: Http) {
  }
  getListCategory() {
    return this.http.get(environment.hostname + '/category/level/1').map(res => res.json());
  }
  getDetail(index: number) {
    return this.http.get('assets/data.json')
      .map(article => article.json().articles.find(trai => trai.id === index));
  }
}
