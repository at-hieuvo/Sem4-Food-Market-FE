import { Component, OnInit } from '@angular/core';
import {PaginationService} from '../../../service/pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  pagination: PaginationService;
  constructor(private paginationService: PaginationService) {
    this.pagination = this.paginationService;
  }

  ngOnInit() {
  }

}
