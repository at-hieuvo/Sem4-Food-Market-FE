import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Http, RequestOptions, Headers} from '@angular/http';

@Injectable()
export class TokenService {
  static TOKEN_KEY = 'AccessToken';
  static TOKEN_EXPIRES = 'Expires';
  public login = new Subject<any>();
  timeOut: any;
  constructor(private http: Http) {
  }
  getDataWithToken(url, headers) {
    return this.http.get(url, {
      headers: headers
    }).map(res => res.json());
  }
  getRole() {
    const url = 'http://localhost:8080/role';
    let headers;
    headers = new Headers();
    headers.append('Authorization', this.getToken());
    let options;
    options = new RequestOptions({
      headers: headers
    });
    console.log(options);
    return this.http.get(url, options).map(res => res.json());
  }
  isAdmin() {
    this.getRole().subscribe((data: any) => {
      for (const authority of data) {
        if (authority  === 'ROLE_ADMIN') {
          return true;
        }
      }
      return false;
    }, (err: any) => {
      if (err.status === 401) {
        this.refreshToken().subscribe((data: any) => {
          this.setToken(data);
          this.isAdmin();
        });
      }
    });
  }
  isLogged() {
    if (this.getToken() != null) {
      return true;
    }
    return false;
  }
  getToken() {
    return localStorage.getItem(TokenService.TOKEN_KEY);
  }
  refreshToken() {
  console.log('Refresh');
    const url = 'http://localhost:8080/refresh';
    let headers;
    headers = new Headers();
    headers.append('Authorization', this.getToken());
    return this.http.get(url, {
      headers: headers
    }).map(res => res.json());
  }
  setToken(token) {
    let expireDate;
    expireDate = new Date();
    expireDate.setSeconds(expireDate.getSeconds() + token.expire);
    localStorage.setItem(TokenService.TOKEN_KEY, token.token);
    localStorage.setItem(TokenService.TOKEN_EXPIRES, expireDate);
  }
  removeToken() {
    localStorage.removeItem(TokenService.TOKEN_KEY);
    localStorage.removeItem(TokenService.TOKEN_EXPIRES);
    clearTimeout(this.timeOut);
  }
}
