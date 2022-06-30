import { ImovelModel } from './../model/imovel-model';
import { Imovel } from './../domain/Imovel';
import { ImovelService } from './../service/imovel.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-imovel',
  templateUrl: './imovel.component.html',
  styleUrls: ['./imovel.component.scss'],
})
export class ImovelComponent implements OnInit {
  imoveis : Imovel [] = [];

  form: FormGroup = this.formBuilder.group({
    id: new FormControl(null),
    nome: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    tipoImovel: new FormControl(null),
    endereco: new FormControl(null),
    valorDiaria: new FormControl(null)
  });


  constructor(private formBuilder: FormBuilder, private imovelService: ImovelService) { }

  ngOnInit(): void {
    this.cadastraAutomatico();
  }

  cadastraAutomatico(): void {
    this.imovelService.cadastraAutomatico().subscribe(() => {
      this.consultar();
    });
  }

  excluir(i: Imovel): void {
    this.imovelService.remover(i.id).subscribe(() => {
      this.consultar();
    });
  }

  consultar(): void {
    this.imovelService.consultar().subscribe((list: Imovel[]) => {
      this.imoveis = list;
    });
  }


}

