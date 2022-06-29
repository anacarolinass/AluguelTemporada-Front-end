import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HospedesComponent } from './hospedes.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HospedesComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
})
export class HospedesModule {}
