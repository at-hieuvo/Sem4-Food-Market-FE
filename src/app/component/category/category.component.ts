import {Component, OnInit, Output, ViewChild} from '@angular/core';
import {CategoryService} from '../../service/category.service';
import {PaginationService} from '../../service/pagination.service';
import {Http} from '@angular/http';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {ProductsListComponent} from './products-list/products-list.component';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [CategoryService]
})
export class CategoryComponent implements OnInit {
  @Output() viewQuick: string ;
  @ViewChild(ProductsListComponent) productListComponent: ProductsListComponent
  page: number;
  private sub: any;
  constructor(private paginationService: PaginationService,
              private http: Http,
              private route: ActivatedRoute,
              private router: Router) {
    this.viewQuick = 'none';
    this.sub = this.route.queryParams.subscribe(params => {
      console.log(params['page']);
      this.page = +params['page'];
      if (!this.page) {
        this.page = 1;
      }
      this.getList(this.page);
    });
  }

  ngOnInit() {
  }
  getList (page) {
    this.http.get(environment.hostname + '/item/all?page=' + (this.page - 1) + '&size=12').map(res => res.json()).subscribe((data: any) => {
      console.log(data);
      this.productListComponent.items = data.content;
      this.paginationService.init(data);
    }, (err: any) => {

    });
  }
  openViewQuick() {
    this.viewQuick = 'block';
  }
  closeViewQuick() {
    this.viewQuick = 'done';
  }
}
