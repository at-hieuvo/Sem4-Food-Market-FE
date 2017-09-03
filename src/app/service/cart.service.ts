import {Injectable, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Http} from '@angular/http';
import swal from 'sweetalert2';
import {environment} from '../../environments/environment';

@Injectable()
export class CartService implements OnDestroy {
  public login = new Subject<any>();
  carts: any;
  constructor(private http: Http) {
    let carts;
    carts = localStorage.getItem('cart');
    this.carts = carts !== null ? JSON.parse(carts) : [];
  }
  getCarts() {
    localStorage.getItem('carts');
  }
  addItem(product: any) {
    let existItem: any;
    this.carts.forEach(function (item) {
      if (item.id === product.id) {
        existItem = item;
        item.quantityCart++;
        return false;

      }
    });
    if (existItem === undefined) {
      let cartItem;
      cartItem = Object.assign({}, product);
      cartItem.quantityCart = 1;
      // console.log(cartItem);
      this.carts.push(cartItem);
    }
    console.log(this.carts);
    this.saveCartToLocalStorage();
  }
  saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.carts));
  }
  getTotal() {
    let total: number;
    total = 0;
    this.carts.forEach(function (item) {

      total += (item.price * item.quantityCart);
    });
    return total;
  }
  removeItem(item) {
    let index;
    index = this.carts.indexOf(item);
    this.carts.splice(index, 1);
    this.saveCartToLocalStorage();
  }
  removeCart() {
    this.carts = [];
    this.saveCartToLocalStorage();
  }
  updateCart() {
    let itemIds, value;
    itemIds = [];
    for (value of this.carts){
      itemIds.push(value.id);
    }
    console.log(itemIds);
    let headers;
    headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    this.http.post(environment.hostname + '/item/getCart', itemIds,
        { headers: headers })
        .map(res => res.json())
        .subscribe((data: any) => {
      console.log(data);
      this.carts.forEach(function (item) {
        item.price = data.find(trai => trai.id === item.id).price;
      });
      this.saveCartToLocalStorage();
          swal('Thông báo', 'Đã cập nhật giỏ hàng', 'success');
    });
  }
 ngOnDestroy() {
    console.log('Destroy');
    localStorage.setItem('cart', this.carts.toString());
 }
}
