import { PoliticaComponent } from './politica/politica.component';
import { AcomodacoesComponent } from './acomodacoes/acomodacoes.component';
import { SobreComponent } from './sobre/sobre.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReservasComponent } from './reservas/reservas.component';

const routes: Routes = [
  { path: '' , component: HomeComponent},
  { path: 'sobre' , component: SobreComponent},
  { path: 'acomodacoes' , component: AcomodacoesComponent},
  { path: 'politica' , component: PoliticaComponent},
  { path: 'reservas' , component: ReservasComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
