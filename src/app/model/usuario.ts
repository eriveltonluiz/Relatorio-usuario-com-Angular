import { Profissao } from "./profissao"
import { Telefone } from "./telefone"

export class Usuario {
    id: Number
    nome: String
    dataNascimento: String
    salario: DoubleRange
    cpf: String
    login: String
    senha: String

    profissao: Profissao = new Profissao();
    telefones: Array<Telefone>
}
