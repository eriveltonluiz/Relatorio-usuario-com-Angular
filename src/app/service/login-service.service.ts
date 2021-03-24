import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../app-constants';
import { Usuario } from '../model/usuario';
import { Router } from '@angular/router';
//import { environment } from 'src/environments/environment.prod';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private baseUrl = environment.baseUrl
  constructor(private http: HttpClient, private router: Router) { }

  login(usuario: any){
    return this.http.post(this.baseUrl + 'login', JSON.stringify(usuario)).subscribe(data => {
      let token = JSON.parse(JSON.stringify(data)).Authorization.split(' ')[1]

      localStorage.setItem("token", token)

      this.router.navigate(['home']);
    },
    error => {
      alert("Acesso Negado!")
    })
  }

  recuperar(login: any){
    
    let usuario = new Usuario();
    usuario.login = login;
    return this.http.post(this.baseUrl + 'recuperar/', usuario).subscribe(data => {
      alert(JSON.parse(JSON.stringify(data)).error)
    },
    error => {
      alert("Erro ao recuperar login!")
    })
  }

  liberarAcesso(login: any){
    
    let usuario = new Usuario();
    usuario.login = login;
    return this.http.post(this.baseUrl + 'recuperar/liberarAcesso', usuario).subscribe(data => {
      alert(JSON.parse(JSON.stringify(data)).error)
    },
    error => {
      alert("Erro ao recuperar login!")
    })
  }
}
