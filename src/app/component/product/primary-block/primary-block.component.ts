import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ItemService} from '../../../service/item.service';

@Component({
  selector: 'app-primary-block',
  templateUrl: './primary-block.component.html',
  styleUrls: ['./primary-block.component.css']
})
export class PrimaryBlockComponent implements OnInit, OnDestroy {

    id: number;
    private sub: any;
    private item: any;
    images_item: any;
    constructor(private route: ActivatedRoute, private router: Router, private itemService: ItemService) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
            this.itemService.getItemById(this.id).subscribe((data: any) => {
                this.item = data;
            });
            this.itemService.getImageOfItem(this.id).subscribe((data: any) => {
                this.images_item = data;
                console.log(this.images_item);
            });
        });
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
