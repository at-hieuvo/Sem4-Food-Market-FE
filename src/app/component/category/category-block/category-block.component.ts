import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../../service/category.service';
import {PaginationService} from '../../../service/pagination.service';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-category-block',
  templateUrl: './category-block.component.html',
  styleUrls: ['./category-block.component.css']
})
export class CategoryBlockComponent implements OnInit {
  categories: any;
  categoryActive: any;
  id: number;
  private sub: any;
  constructor(private categorySevice: CategoryService,
              private paginationService: PaginationService,
              private route: ActivatedRoute,
              private titleService: Title) {
    this.categories = [];
  }

  ngOnInit() {
    this.categorySevice.getListCategory().subscribe((data: any) => {
      this.categories = data;
      this.sub = this.route.params.subscribe(params2 => {
        this.id = +params2['id'];
        if (!this.id) {
          this.id = 0;
          this.titleService.setTitle('Tất cả sản phẩm');
        } else {
          this.categoryActive = this.categories.find((obj) => obj.id === this.id);
          this.titleService.setTitle(this.categoryActive.name);
          this.route.data.subscribe((v: any) => {
            v.breadcrumb = this.categoryActive.name;
            console.log(v);
          });
        }
      });
    });
  }

}
