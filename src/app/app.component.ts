import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Projeto-Angular-SpringREST';

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') === null)
      this.router.navigate(['login'])
  }

  public sair() {
    localStorage.clear()   //Limpa o token de autenticação
    this.router.navigate(['login'])
  }

  public esconderBarra() {
    let token: String = localStorage.getItem('token')
    if (localStorage.getItem('token') !== null && localStorage.getItem('token').toString().trim() !== null)
      return false
    else return true
  }
}