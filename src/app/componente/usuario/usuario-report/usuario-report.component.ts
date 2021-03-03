import { Component, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioReport } from 'src/app/model/usuario-report';
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
    return date ? validarDia(date.day) + this.DELIMITER + validarDia(date.month) + this.DELIMITER + validarDia(date.year) : null;
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
  templateUrl: './usuario-report.component.html',
  styleUrls: ['./usuario-report.component.css'],
  providers: [{ provide: NgbDateParserFormatter, useClass: FormatDate },
  { provide: NgbDateAdapter, useClass: FormatDateAdapter }]
})
export class UsuarioReportComponent {

  usuarioReport = new UsuarioReport();

  constructor(private usuarioService: UsuarioService, private activeRoute: ActivatedRoute) { }

  imprimeRelatorio(){
    console.log('tetse telatorio data: ' + this.usuarioReport.dataInicio)
    this.usuarioService.downloadPdfRelatorioParam(this.usuarioReport);
  }

}
