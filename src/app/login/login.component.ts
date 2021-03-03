import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from '../service/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = { login: '', senha: '' };

  constructor(private loginService: LoginServiceService, private router: Router) { }

  public login() {
    this.loginService.login(this.usuario)
  }

  public recuperar(){
    this.loginService.recuperar(this.usuario.login)
  }

  ngOnInit(): void {
    let token: String = localStorage.getItem('token')
    if (token !== null && token.toString().trim() !== null) this.router.navigate(['home'])
  }

}
