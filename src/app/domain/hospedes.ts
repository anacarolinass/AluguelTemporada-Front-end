import { Endereco } from './endereco';

export interface Hospedes {
  id: string;
  nome: string;
  cpf: string;
  telefone: string;
  dataNasc: Date;
  endereco: Endereco;
}
