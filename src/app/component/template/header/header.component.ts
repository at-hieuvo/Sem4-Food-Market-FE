import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {TokenService} from '../../../service/token.service';
import {ShareService} from '../../../service/share.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: []
})
export class HeaderComponent implements OnInit {
  currentUser: string;
  message: any;
  subscription: Subscription;

  constructor(private http: Http,
              private tokenService: TokenService,
              private shareService: ShareService,
              private router: Router) {
    this.currentUser = tokenService.getToken();
  }

  ngOnInit() {
  }

  logout() {
    this.tokenService.removeToken();
    this.currentUser = null;
    this.router.navigate(['/home']);
    swal('Thông báo', 'Đăng xuất thành công!', 'success');
  }

  getInfo() {
    let headers;
    headers = new Headers();
    headers.append('Authorization', this.tokenService.getToken());
    let options;
    options = new RequestOptions({
      headers: headers
    });
    this.http.get('http://localhost:8080/user', options).map(res => res.json()).subscribe((data: any) => {
      console.log(data);
    }, (err: any) => {
      if (err.status === 401) {
        this.tokenService.refreshToken().subscribe((data: any) => {
          this.tokenService.setToken(data);
          this.getInfo();
        }, (err2: any) => {
          if (err2.status === 401) {
            swal('Thông báo', 'Mời bạn đăng nhập lại!', 'error');
            this.tokenService.removeToken();
            this.shareService.loginToken(null);
          }
        });
      }
    });
  }
}
