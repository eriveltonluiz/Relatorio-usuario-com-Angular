import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../app-constants';
import { Usuario } from '../model/usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient, private router: Router) { }

  recuperar(login: any){
    
    let usuario = new Usuario();
    usuario.login = login;
    return this.http.post(AppConstants.baseUrlPath + 'recuperar/', JSON.stringify(usuario)).subscribe(data => {
      alert(JSON.parse(JSON.stringify(data)).error)
    },
    error => {
      console.error("Erro ao recuperar login")
      alert("Erro ao recuperar login!")
    })
  }

  login(usuario: any){
    return this.http.post(AppConstants.baseLogin, JSON.stringify(usuario)).subscribe(data => {
      let token = JSON.parse(JSON.stringify(data)).Authorization.split(' ')[1]

      localStorage.setItem("token", token)

      this.router.navigate(['home']);
    },
    error => {
      console.error("Erro ao fazer login")
      alert("Acesso Negado!")
    })
  }
}
