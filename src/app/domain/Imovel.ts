import { StatusImovel } from './../enum/StatusImovel.enum';
import { TipoImovel } from './../enum/TipoImovel.enum';
import { Endereco } from './endereco';
import { Hospedes } from './hospedes';

export interface Imovel {
  id: string;
  nome: string;
  endereco: Endereco;
  valorDiaria: number;
  tipoImovel: TipoImovel;
  StatusImovel: StatusImovel;
}
