import { StatusPedido } from './../enum/StatusPedido.enum';
import { Hospedes } from './../domain/hospedes';
import { Imovel } from './../domain/Imovel';
import { Endereco } from '../domain/endereco';
import { StatusImovel } from '../enum/StatusImovel.enum';
import { TipoImovel } from '../enum/TipoImovel.enum';

export interface AluguelModel {
  id: string;
  imovel: Imovel;
  hospedes: Hospedes;
  dias: number;
  statusPedido: StatusPedido;
  StatusImovel: StatusImovel;
}


