import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { Aluguel } from './../domain/aluguel';

@Injectable({
  providedIn: 'root',
})
export class AluguelService {
  private url = 'http://localhost:8080/aluguel/';

  constructor(private http: HttpClient) {}

  consultar(): Observable<Aluguel[]> {
    return this.http.get<Aluguel[]>(this.url + 'consultar');
  }

  cadastrar(
    idHospedes: string,
    idImovel: string,
    dias: string
  ): Observable<Aluguel> {
    return this.http.post<Aluguel>(this.url + 'cadastrar', {
      idHospedes,
      idImovel,
      dias,
    });
  }

  adicionarImoveis(id: string, idImovel: string): Observable<Aluguel> {
    return this.http.put<Aluguel>(this.url + 'adicionar-imoveis/' + id, {
      idImoveis: [idImovel],
    });
  }

  pagar(id: string, valor: number): Observable<Aluguel> {
    return this.http.put<Aluguel>(this.url + 'pagar/' + id, {
      valor,
    });
  }
}
