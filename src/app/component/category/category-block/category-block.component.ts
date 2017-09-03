import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../../service/category.service';
import {PaginationService} from '../../../service/pagination.service';

@Component({
  selector: 'app-category-block',
  templateUrl: './category-block.component.html',
  styleUrls: ['./category-block.component.css']
})
export class CategoryBlockComponent implements OnInit {
  categories: any;
  constructor(private categorySevice: CategoryService, private paginationService: PaginationService) {
    this.categories = [];
  }

  ngOnInit() {
    this.categorySevice.getListCategory().subscribe((data: any) => {
      console.log(data);
      this.categories = data;
    });
  }

}
