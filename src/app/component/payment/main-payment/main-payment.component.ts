import { Component, OnInit } from '@angular/core';
import {CartService} from '../../../service/cart.service';
import {TokenService} from '../../../service/token.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-main-payment',
  templateUrl: './main-payment.component.html',
  styleUrls: ['../payment.component.css']
})
export class MainPaymentComponent implements OnInit {
  cart: any;
  currentUser: any;
  ortherShip = false;
  orderForm: FormGroup;
  constructor(private cartService: CartService,
              private tokenService: TokenService,
              private formBuilder: FormBuilder) {
    this.currentUser = this.tokenService.getInfo();
    this.cart = this.cartService;
    this.orderForm = this.formBuilder.group({
      personal: this.formBuilder.group({
        email: new FormControl('', [Validators.required]),
        name: new FormControl('', [Validators.required]),
        phone: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required])
      }),
      shipAddress: this.formBuilder.group({
        name: new FormControl('', [Validators.required]),
        phone: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required]),
      })
    });
  }
  order() {
    if (!this.orderForm.valid) {
      swal('Thông báo!', 'Dữ liệu không hợp lệ!', 'error');
    } else {
      swal('Thông báo!', 'Đặt hàng thành công', 'success');
      console.log(this.orderForm.value);
    }
  }
  ngOnInit() {
  }

}
