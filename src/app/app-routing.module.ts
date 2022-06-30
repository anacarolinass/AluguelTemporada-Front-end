import { PoliticaComponent } from './politica/politica.component';
import { AcomodacoesComponent } from './acomodacoes/acomodacoes.component';
import { SobreComponent } from './sobre/sobre.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HospedesComponent } from './hospedes/hospedes.component';
import { ImovelComponent } from './imovel/imovel.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sobre', component: SobreComponent },
  { path: 'acomodacoes', component: ImovelComponent },
  { path: 'politica', component: PoliticaComponent },
  { path: 'reservas', component: HospedesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
