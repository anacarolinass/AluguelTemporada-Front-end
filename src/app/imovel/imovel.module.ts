import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImovelComponent } from './imovel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    ImovelComponent
  ],
  imports: [
    CommonModule,  FormsModule, ReactiveFormsModule, HttpClientModule
  ]
})
export class ImovelModule { }
