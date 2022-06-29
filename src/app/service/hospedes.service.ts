import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HospedesModel } from '../model/hospedes-model';
import { Hospedes } from './../domain/hospedes';

@Injectable({
  providedIn: 'root',
})
export class HospedesService {
  private url = 'http://localhost:8080/hospedes/';

  constructor(private http: HttpClient) {}

  consultar(): Observable<Hospedes[]> {
    return this.http.get<Hospedes[]>(this.url + 'consultar');
  }

  cadastrar(hospedesModel: HospedesModel): Observable<Hospedes> {
    return this.http.post<Hospedes>(this.url + 'cadastrar', hospedesModel);
  }
  alterar(id: string, model: HospedesModel): Observable<Hospedes> {
    return this.http.put<Hospedes>(this.url + 'alterar/' + id, model);
  }
  remover(id: string): Observable<Hospedes> {
    return this.http.delete<Hospedes>(this.url + 'remover/' + id);
  }
}
