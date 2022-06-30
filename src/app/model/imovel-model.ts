import { Endereco } from '../domain/endereco';
import { StatusImovel } from '../enum/StatusImovel.enum';
import { TipoImovel } from '../enum/TipoImovel.enum';

export interface ImovelModel {
  id: string;
  nome: string;
  endereco: Endereco;
  valorDiaria: number;
  tipoImovel: TipoImovel;
  StatusImovel: StatusImovel;
}
