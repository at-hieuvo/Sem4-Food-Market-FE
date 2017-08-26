import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../../service/item.service';

@Component({
  selector: 'app-home-riceorder',
  templateUrl: './home-riceorder.component.html',
  styleUrls: ['./home-riceorder.component.css']
})
export class HomeRiceorderComponent implements OnInit {

  itemsNew: any;
  constructor(private itemService:ItemService) { }

  ngOnInit() {
    this.itemService.getItemNew().subscribe((data: any) => {
      this.itemsNew = data;
    })
  }

}
