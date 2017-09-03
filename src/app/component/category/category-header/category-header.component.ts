import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-category-header',
  templateUrl: './category-header.component.html',
  styleUrls: ['./category-header.component.css']
})
export class CategoryHeaderComponent implements OnInit {
  title: Title;
  constructor(private titleService: Title) {
    this.title = titleService;
  }
  header: string;
  ngOnInit() {
  }

}
