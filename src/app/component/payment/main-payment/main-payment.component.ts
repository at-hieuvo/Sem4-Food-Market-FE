import { Component, OnInit } from '@angular/core';
import {CartService} from '../../../service/cart.service';
import {TokenService} from '../../../service/token.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import swal from 'sweetalert2';
import {OrderService} from '../../../service/order.service';

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
              private formBuilder: FormBuilder,
              private orderService: OrderService) {
    this.currentUser = this.tokenService.currentUser;
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
      }),
      note: new FormControl('')
    });
  }
  order(items) {
    // console.log(items);
    // console.log(this.currentUser);
    if (this.tokenService.currentUser === undefined) {
      swal('Thông báo!', 'Mời bạn đăng nhập rồi thực hiện chức năng này!', 'error');
      return;
    }
    // if (!this.orderForm.valid) {
    //   swal('Thông báo!', 'Dữ liệu không hợp lệ!', 'error');
    // } else {

      let model, data;
      model = this.orderForm.value;
      data = {
        'address': model.shipAddress.address,
        'name': model.shipAddress.name,
        'phone': model.shipAddress.phone,
        'note': model.note,
        'transportedAt': '2017-09-09',
        'userId': this.tokenService.currentUser.id,
        'promotionId': 1,
        'shipId': 1,
        'orderItems': items
      };
    console.log(data);
      this.orderService.sendOrder(data).subscribe((a: any) => {
        // console.log(a);
        swal('Thông báo', 'Đặt hàng thành công!', 'success');
      }, (err: any) => {
        // console.log(err);
        swal('Thông báo!', 'Đặt hàng thất bại!', 'error');
      });
    // }
  }
  ngOnInit() {
  }

}
