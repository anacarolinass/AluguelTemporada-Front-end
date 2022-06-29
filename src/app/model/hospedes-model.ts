import { Endereco } from '../domain/endereco';

export interface HospedesModel {
  id: string;
  nome: string;
  cpf: string;
  telefone: string;
  dataNasc: Date;
}
