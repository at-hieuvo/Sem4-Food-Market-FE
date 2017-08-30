import {Component, OnInit, ViewChild} from '@angular/core';
import {HeaderComponent} from './component/template/header/header.component';
import {ShareService} from './service/share.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {TokenService} from './service/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ShareService, TokenService]
})
export class AppComponent implements OnInit {
  @ViewChild(HeaderComponent) header: HeaderComponent;
  title = 'app';
  constructor(private router: Router,
              private titleService: Title,
              private activatedRoute: ActivatedRoute,
              private serviceShare: ShareService) {
  }
  ngOnInit() {
    this.serviceShare.login.subscribe(data => {
      this.header.currentUser = data;
    });
    this.serviceShare.cart.subscribe(data => {
      // console.log(data);
      this.header.addCart(data);
    })
    this.router.events
        .filter((event) => event instanceof NavigationEnd)
        .map(() => this.activatedRoute)
        .map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        })
        .filter((route) => route.outlet === 'primary')
        .mergeMap((route) => route.data)
        .subscribe((event) => this.titleService.setTitle(event['title']));
  }
}
