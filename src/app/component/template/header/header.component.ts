import {Component, OnInit} from '@angular/core';
import {TokenService} from '../../../service/token.service';
import {Http} from '@angular/http';
import swal from 'sweetalert2';
import {Router} from '@angular/router';
import {CartService} from '../../../service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: []
})
export class HeaderComponent implements OnInit {
  user: TokenService;
  cart: CartService;
  constructor(private http: Http,
              private tokenService: TokenService,
              private cartService: CartService,
              private router: Router) {
    this.user = this.tokenService;
    this.cart = this.cartService;
  }

  ngOnInit() {
  }
  login(data) {
    this.tokenService.currentUser = data;
  }
  logout() {
    this.tokenService.removeToken();
    this.user.currentUser = null;
    this.router.navigate(['/home']);
    swal('Thông báo', 'Đăng xuất thành công!', 'success');
  }
  addCart(product) {
    this.cartService.addItem(product);
  }
  getInfo() {
  }
}
