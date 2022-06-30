import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AluguelComponent } from './aluguel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AluguelComponent
  ],
  imports: [
    CommonModule,  FormsModule, ReactiveFormsModule
  ]
})
export class AluguelModule { }
