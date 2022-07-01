import { ImovelModel } from './../model/imovel-model';
import { AluguelService } from './../service/aluguel.service';
import { ImovelService } from './../service/imovel.service';
import { Imovel } from './../domain/Imovel';
import { Hospedes } from './../domain/hospedes';
import { HospedesService } from './../service/hospedes.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HospedesModel } from '../model/hospedes-model';
import { Aluguel } from '../domain/aluguel';
@Component({
  selector: 'app-hospedes',
  templateUrl: './hospedes.component.html',
  styleUrls: ['./hospedes.component.scss'],
})
export class HospedesComponent implements OnInit {
  hospedes: Hospedes[] = [];


  form: FormGroup = this.formBuilder.group({
    id: new FormControl(null),
    nome: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    cpf: new FormControl(null, [Validators.required, Validators.minLength(11)]),
    telefone: new FormControl(null),
    dataNasc: new FormControl(null, [Validators.required]),
  });


  constructor(
    private formBuilder: FormBuilder,
    private hospedesService: HospedesService,

  ) {}

  ngOnInit(): void {
    this.carregarHospedes();

  }
  private carregarHospedes(): void {
    this.hospedesService.consultar().subscribe((domains: Hospedes[]) => {
      if (domains) {
        this.hospedes = domains;
      }
    });
  }

  cadastrar(): void {
    const id = this.form.controls['id'].value;
    const hospedes: HospedesModel = this.form.getRawValue();
    if (id) {
      this.hospedesService
        .alterar(id, hospedes)
        .subscribe((domain: Hospedes) => {
          if (domain.id) {
            this.carregarHospedes();
            this.form.reset();
          }
        });
    } else {
      this.hospedesService.cadastrar(hospedes).subscribe((domain: Hospedes) => {
        if (domain.id) {
          this.hospedes.push(domain);
          this.form.reset();
        }
      });
    }
  }

  editar(hospedes: Hospedes): void {
    this.form.controls['id'].setValue(hospedes.id);
    this.form.controls['nome'].setValue(hospedes.nome);
    this.form.controls['cpf'].setValue(hospedes.cpf);
    this.form.controls['telefone'].setValue(hospedes.telefone);
    this.form.controls['dataNasc'].setValue(hospedes.dataNasc);
  }

  apagar(hospedes: Hospedes): void {
    this.hospedesService.remover(hospedes.id).subscribe((d: Hospedes) => {
      if (d.id) {
        this.carregarHospedes();
      }
    });
  }
}

