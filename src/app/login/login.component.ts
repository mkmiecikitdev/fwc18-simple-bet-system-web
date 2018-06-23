import {Component, OnInit} from '@angular/core';
import {LoginForm} from './login.form';
import {DataService} from '../data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: LoginForm = {
    login: '',
    password: ''
  };

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {

  }

  login() {
    this.dataService.login(this.loginForm)
      .subscribe(_ => this.router.navigateByUrl('bets'));
  }

}
