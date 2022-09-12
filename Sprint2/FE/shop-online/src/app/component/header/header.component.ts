import {Component, OnInit} from '@angular/core';
import {LogoutService} from '../../service/user/logout.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {AuthService} from '../../service/user/auth.service';
import {ReloadService} from '../../service/user/reload.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  role: string;
  btnLoginStatus = true;
  loginStatus: any;
  username: string;
  private subscriptionName: Subscription;
  messageReceived: any;

  constructor(private logout: LogoutService,
              private toastr: ToastrService,
              private router: Router,
              private auth: AuthService,
              private reload: ReloadService) {
    this.auth.checkLogin().subscribe(value => {
      this.loginStatus = value;
      this.role = this.readLocalStorage('role');
      this.username = this.readLocalStorage('username');
    }, error => {
      localStorage.clear();
    });
    this.subscriptionName = this.reload.getUpdate().subscribe(message => {
      this.messageReceived = message;
      this.role = this.readLocalStorage('role');
      this.username = this.readLocalStorage('username');
      this.auth.checkLogin().subscribe(value => {
        this.loginStatus = value;
      }, error => {
        localStorage.clear();
      });
    });
  }

  ngOnInit(): void {
  }

  readLocalStorage(key: string): string {
    return localStorage.getItem(key);
  }

  onLogout() {
    this.btnLoginStatus = false;
    this.logout.onLogout().subscribe(() => {
      setTimeout(() => {
        this.router.navigateByUrl('/login').then(() => {
          this.toastr.success('Đăng xuất thành công');
          this.btnLoginStatus = true;
          this.sendMessage();
        });
        localStorage.clear();
      }, 2000);
    });
  }

  sendMessage(): void {
    this.reload.sendUpdate('Đăng Xuất thành công');
  }
}
