import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Http, RequestOptions} from '@angular/http';
import {TokenService} from '../../service/token.service';
import {Router} from '@angular/router';
import 'rxjs/Rx';
import {ShareService} from '../../service/share.service';
import swal from 'sweetalert2';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [TokenService]
})
export class LoginComponent implements OnInit {
  email: string;
  data: any;
  loginForm: FormGroup;
  @Output() changeToken: EventEmitter<any> = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
              private http: Http,
              private tokenService: TokenService,
              private service: ShareService,
              private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }
  ngOnInit() {
  }
  save(model: any) {
    const url = 'http://localhost:8080/auth';
    let data;
    data = {
      'username': model.email,
      'password': model.password,
    };
    let headers;
    headers = new Headers({ 'Content-Type': 'application/json' });
    // headers.set('Content-Type', 'application/json')
    //  headers.append('Content-Type', 'application/json');
     console.log(headers);
     let options;
    options = new RequestOptions({headers: headers});
      console.log(options);
      this.http.post(url, data, options).map(res => res.json()).subscribe((a: any) => {
      console.log(a);
      this.tokenService.setToken(a);
      this.service.loginToken(a.token);
      swal('Thông báo', 'Đăng nhập thành công!', 'success');
      this.router.navigate(['/home']);
    }, (err: any) => {
      if (err.status === 401) {
        swal('Thông báo', 'Email hoặc mật khẩu không tồn tại!', 'error');
      } else {
        swal('Thông báo', 'Đăng nhập thất bại!', 'error');
      }
    });
  }
}
