import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import { environment } from '../../environments/environment.prod';  //Executa no heroku web
import { environment } from '../../environments/environment';    //Executa localmente
import { AppConstants } from '../app-constants';
import { Telefone } from '../model/telefone';
import { TelefoneDTO } from '../model/telefone-dto';
import { Usuario } from '../model/usuario';
import { UsuarioReport } from '../model/usuario-report';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl = environment.baseUrl
  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<any>{
    return this.http.get(this.baseUrl + 'usuario/')
  }

  getUsuariosPage(pagina): Observable<any>{
    return this.http.get(`${this.baseUrl}usuario/page/${pagina}`)
  }

  getUsuarioPorNome(nome: String): Observable<any>{
    return this.http.get(`${this.baseUrl}usuario/usuarioPorNome/${nome}`)
  }

  getUsuarioPorNomeEPage(nome: String, page: number): Observable<any>{
    return this.http.get(`${this.baseUrl}usuario/usuarioPorNome/${nome}/page/${page}`)
  }

  getUsuario(id: Number): Observable<any>{
    return this.http.get(`${this.baseUrl}usuario/buscar/${id}`)
  }

  addUsuario(usuario): Observable<any>{console.log(usuario)
    return this.http.post<any>(`${this.baseUrl}usuario/`, usuario)
  }

  deletarUsuario(id: Number): Observable<any>{
    return this.http.delete(`${this.baseUrl}usuario/${id}`)
  }

  editarUsuario(usuario): Observable<any>{
    return this.http.put<any>(`${this.baseUrl}usuario/`, usuario)
  }

  usuarioAutenticado(){
    if(localStorage.getItem('token') != null && localStorage.getItem('token')?.toString().trim() != null)
      return true
    else return false
  }

  addTelefone(telefoneDTO: TelefoneDTO): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}usuario/addFone`, telefoneDTO)
  }
  
  deletarTelefone(id: Number): Observable<any>{
    return this.http.delete(`${this.baseUrl}usuario/removerTelefone/${id}`, {responseType: 'text'})
  }

  getProfissoes(): Observable<any>{
    return this.http.get(`${this.baseUrl}profissao/`)
  }

  downloadPdfRelatorio(){
    return this.http.get(`${this.baseUrl}usuario/relatorio`, {responseType: 'text'}).subscribe(data => {
      document.querySelector('iframe').src = data
    })
  }

  downloadPdfRelatorioParam(usuarioReport: UsuarioReport){
    return this.http.post(`${this.baseUrl}usuario/relatorio`, usuarioReport, {responseType: 'text'}).subscribe(data => {
      document.querySelector('iframe').src = data
    })
  }

  carregarGrafico(): Observable<any>{
    return this.http.get(`${this.baseUrl}usuario/grafico`);
  }
}
