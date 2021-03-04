import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';
import { Telefone } from '../model/telefone';
import { TelefoneDTO } from '../model/telefone-dto';
import { Usuario } from '../model/usuario';
import { UsuarioReport } from '../model/usuario-report';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<any>{
    return this.http.get(AppConstants.baseUrl)
  }

  getUsuariosPage(pagina): Observable<any>{
    return this.http.get(`${AppConstants.baseUrl}page/${pagina}`)
  }

  getUsuarioPorNome(nome: String): Observable<any>{
    return this.http.get(`${AppConstants.baseUrl}usuarioPorNome/${nome}`)
  }

  getUsuarioPorNomeEPage(nome: String, page: number): Observable<any>{
    return this.http.get(`${AppConstants.baseUrl}usuarioPorNome/${nome}/page/${page}`)
  }

  getUsuario(id: Number): Observable<any>{
    return this.http.get(`${AppConstants.baseUrl}buscar/${id}`)
  }

  addUsuario(usuario): Observable<any>{console.log(usuario)
    return this.http.post<any>(`${AppConstants.baseUrl}`, usuario)
  }

  deletarUsuario(id: Number): Observable<any>{
    return this.http.delete(`${AppConstants.baseUrl}${id}`)
  }

  editarUsuario(usuario): Observable<any>{
    return this.http.put<any>(AppConstants.baseUrl, usuario)
  }

  usuarioAutenticado(){
    if(localStorage.getItem('token') != null && localStorage.getItem('token')?.toString().trim() != null)
      return true
    else return false
  }

  addTelefone(telefoneDTO: TelefoneDTO): Observable<any>{
    return this.http.post<any>(`${AppConstants.baseUrl}addFone`, telefoneDTO)
  }
  
  deletarTelefone(id: Number): Observable<any>{
    return this.http.delete(`${AppConstants.baseUrl}removerTelefone/${id}`, {responseType: 'text'})
  }

  getProfissoes(): Observable<any>{
    return this.http.get(`${AppConstants.baseUrlPath}profissao/`)
  }

  downloadPdfRelatorio(){
    return this.http.get(`${AppConstants.baseUrl}relatorio`, {responseType: 'text'}).subscribe(data => {
      document.querySelector('iframe').src = data
    })
  }

  downloadPdfRelatorioParam(usuarioReport: UsuarioReport){
    return this.http.post(`${AppConstants.baseUrl}relatorio`, usuarioReport, {responseType: 'text'}).subscribe(data => {
      document.querySelector('iframe').src = data
    })
  }

  carregarGrafico(): Observable<any>{
    return this.http.get(`${AppConstants.baseUrl}grafico`);
  }
}
