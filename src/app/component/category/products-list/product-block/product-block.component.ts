import {Component, Input, OnInit} from '@angular/core';
import {CategoryService} from '../../../../service/category.service';
import {ShareService} from '../../../../service/share.service';

@Component({
  selector: 'app-product-block',
  templateUrl: './product-block.component.html',
  styleUrls: ['./product-block.component.css']
})
export class ProductBlockComponent implements OnInit {
  @Input() product: any;
  @Input() index: any;
  constructor(private service: ShareService) { }
  ngOnInit() {
    // console.log(this.product);
  }
  addCart() {
    this.service.addCart(this.product);
  }
}
