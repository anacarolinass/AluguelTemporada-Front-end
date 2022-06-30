import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Imovel } from '../domain/Imovel';
import { ImovelModel } from '../model/imovel-model';

@Injectable({
  providedIn: 'root',
})
export class ImovelService {
  private url = 'http://localhost:8080/imovel/';

  constructor(private http: HttpClient) {}

  consultar(): Observable<Imovel[]> {
    return this.http.get<Imovel[]>(this.url + 'consultar');
  }

  cadastrar(imovelModel: ImovelModel): Observable<Imovel> {
    return this.http.post<Imovel>(this.url + 'cadastrar', imovelModel);
  }

  cadastraAutomatico(): Observable<Imovel> {
    return this.http.post<Imovel>(this.url + 'cadastrar-automatico', {});
  }
  alterar(id: string, model: ImovelModel): Observable<Imovel> {
    return this.http.put<Imovel>(this.url + 'alterar/' + id, model);
  }
  remover(id: string): Observable<Imovel> {
    return this.http.delete<Imovel>(this.url + 'remover/' + id);
  }
}
