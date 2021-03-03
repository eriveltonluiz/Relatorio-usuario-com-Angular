import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  p: number = 1
  usuarios: Array<Usuario>[]
  nome: String
  total: number

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe(data => {
      this.usuarios = data.content
      this.total = data.totalElements
    })
  }

  deletarUsuario(id: Number, index: number) {
    if (confirm('Deseja deletar usuário?')) {
      this.usuarioService.deletarUsuario(id).subscribe(data => {
        this.usuarios.splice(index, 1)
        // this.usuarioService.getUsuarios().subscribe(data => {
        //   this.usuarios = data
        // })
      })
    }
  }

  consultaPorNome() {
    if (this.nome === '') {
      this.usuarioService.getUsuarios().subscribe(data => {
        this.usuarios = data.content
        this.total = data.totalElements
      })
    } else {
      this.usuarioService.getUsuarioPorNome(this.nome).subscribe(data => {
        this.usuarios = data.content
        this.total = data.totalElements
      })
    }
  }

  carregarPagina(pagina: number) {
    console.log(pagina)

    if (this.nome !== '') {
      this.usuarioService.getUsuarioPorNomeEPage(this.nome, pagina-1).subscribe(data => {
        this.usuarios = data.content
        this.total = data.totalElements
      })
    } else {
      this.usuarioService.getUsuariosPage(pagina-1).subscribe(data => {
        this.usuarios = data.content
        this.total = data.totalElements
      })
    }
  }

  imprimeRelatorio(){
    return this.usuarioService.downloadPdfRelatorio()
  }

}
