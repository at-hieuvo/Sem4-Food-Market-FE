import {Component, OnInit, Output} from '@angular/core';
import {CategoryService} from '../../service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [CategoryService]
})
export class CategoryComponent implements OnInit {
  @Output() viewQuick: string ;
  constructor() {
    this.viewQuick = 'none';
  }

  ngOnInit() {
  }
  openViewQuick() {
    this.viewQuick = 'block';
  }
  closeViewQuick() {
    this.viewQuick = 'done';
  }
}
