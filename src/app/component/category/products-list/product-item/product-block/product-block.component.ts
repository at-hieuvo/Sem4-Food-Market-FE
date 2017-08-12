import {Component, Input, OnInit} from '@angular/core';
import {CategoryService} from '../../../../../service/category.service';

@Component({
  selector: 'app-product-block',
  templateUrl: './product-block.component.html',
  styleUrls: ['./product-block.component.css']
})
export class ProductBlockComponent implements OnInit {
  @Input() product: any;
  constructor(private service: CategoryService) { }
  ngOnInit() {
    console.log(this.product);
  }
  addCart(product: any) {
    this.service.cart.push(product);
    console.log(this.service.cart);
  }
}
