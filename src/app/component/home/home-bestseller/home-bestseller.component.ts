import { Component, OnInit } from '@angular/core';
import {ItemService} from '../../../service/item.service';

@Component({
  selector: 'app-home-bestseller',
  templateUrl: './home-bestseller.component.html',
  styleUrls: ['./home-bestseller.component.css']
})
export class HomeBestsellerComponent implements OnInit {

    itemsBest: any;
    constructor(private itemService: ItemService) { }

    ngOnInit() {
        this.itemService.getItemBest().subscribe((data: any) => {
            this.itemsBest = data;
        });
    }
}
