import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Profissao } from 'src/app/model/profissao';
import { Telefone } from 'src/app/model/telefone';
import { TelefoneDTO } from 'src/app/model/telefone-dto';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';

@Injectable()
export class FormatDateAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER = '/';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;
  }
  toModel(date: NgbDateStruct | null): string | null {
    return date ? validarDia(date.day) + this.DELIMITER + validarDia(date.month) + this.DELIMITER + validarDia(date.year) : null;
  }

}

@Injectable()
export class FormatDate extends NgbDateParserFormatter {

  readonly DELIMITER = '/';



  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  format(date: NgbDateStruct): string | null {
    return date ? validarDia(date.day) + this.DELIMITER + validarDia(date.month) + this.DELIMITER + date.year : '';
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }
}

function validarDia(valor) {
  if (valor.toString !== '' && parseInt(valor) <= 9) {
    return '0' + valor;
  }
  return valor;
}

@Component({
  selector: 'app-root',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css'],
  providers: [{ provide: NgbDateParserFormatter, useClass: FormatDate },
  { provide: NgbDateAdapter, useClass: FormatDateAdapter }]
})
export class UsuarioAddComponent implements OnInit {

  usuario = new Usuario();
  telefone = new Telefone();
  profissao = new Profissao();
  profissoes: Array<Profissao>;

  constructor(private usuarioService: UsuarioService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.usuarioService.getProfissoes().subscribe(data => {
      this.profissoes = data
    })

    let id = this.activeRoute.snapshot.paramMap.get('id');

    if (id !== null) {
      let idNumber: Number = +id;
      this.usuarioService.getUsuario(idNumber).subscribe(data => {
        this.usuario = data;

        if (!this.usuario.profissao)
          this.profissao = new Profissao();
        else
          this.profissao = this.usuario.profissao
      })
    }
    console.log(this.usuario)
  }

  salvarUsuario() {
    let id: Number = this.usuario.id
    console.log("Profissão salva: " + this.profissao.descricao)
    console.log("ID da Profissão salvo como: " + this.profissao.id)
    this.usuario.profissao = this.profissao
    if (this.usuario.id === null || this.usuario.id === undefined) {
      this.usuarioService.addUsuario(this.usuario).subscribe(data => {
        this.usuario = data
        this.novo()
      })
      alert(`Usuário ${this.usuario.nome} foi salvo com sucesso!!`)
    }
    else {
      this.usuarioService.editarUsuario(this.usuario).subscribe(data => {
        this.usuario = data
      })
      alert(`Usuário ${this.usuario.nome} foi editado com sucesso!!`)
    }
  }

  salvarFone() {
    if (this.usuario.telefones === undefined) {
      this.usuario.telefones = new Array<Telefone>();
    }

    let telefoneDTO = new TelefoneDTO();
    telefoneDTO.numero = this.telefone.numero
    telefoneDTO.usuario_id = this.usuario.id
    console.log(telefoneDTO)
    this.usuarioService.addTelefone(telefoneDTO).subscribe(data => {
      this.telefone = data
    })

    alert(`Telefone ${this.telefone.numero} foi salvo com sucesso!!`)
    this.usuario.telefones.push(this.telefone)
    this.telefone = new Telefone()
  }

  deletarTelefone(id: Number, index: any) {
    if (id === null) {
      this.usuario.telefones?.splice(index, 1)
      return
    }

    if (id !== null && confirm(`Deseja remover telefone da linha ${index + 1}?`)) {
      this.usuarioService.deletarTelefone(id).subscribe(data => {
        this.usuario.telefones?.splice(index, 1)
      })
    }
  }

  novo() {
    this.usuario = new Usuario()
    this.profissao = new Profissao()
  }

}
