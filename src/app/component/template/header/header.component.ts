import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../../service/category.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [CategoryService]
})
export class HeaderComponent implements OnInit {
  count: number;
  constructor() { }

  ngOnInit() {
  }

}
