import { StatusImovel } from './../enum/StatusImovel.enum';
import { StatusPedido } from './../enum/StatusPedido.enum';
import { Hospedes } from './hospedes';
import { Imovel } from './Imovel';
export interface Aluguel {
  id: string;
  imovel: Imovel;
  hospedes: Hospedes;
  dias: number;
  valorTotalDiaria: number;
  statusPedido: StatusPedido;
  statusImovel: StatusImovel;
}
