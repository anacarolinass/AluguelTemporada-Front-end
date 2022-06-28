import { MenuModule } from './menu/menu.module';
import { PoliticaModule } from './politica/politica.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { SobreModule } from './sobre/sobre.module';
import { ReservasModule } from './reservas/reservas.module';
import { AcomodacoesModule } from './acomodacoes/acomodacoes.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    SobreModule,
    PoliticaModule,
    ReservasModule,
    AcomodacoesModule,
    MenuModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
