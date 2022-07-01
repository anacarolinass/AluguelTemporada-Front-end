import { ImovelService } from './../service/imovel.service';
import { HospedesService } from './../service/hospedes.service';

import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Aluguel } from '../domain/aluguel';
import { AluguelService } from '../service/aluguel.service';
import { Hospedes } from '../domain/hospedes';
import { Imovel } from '../domain/Imovel';

@Component({
  selector: 'app-pedido',
  templateUrl: './aluguel.component.html',
  styleUrls: ['./aluguel.component.scss'],
})
export class AluguelComponent implements OnInit {
  alugueis: Aluguel[] = [];
  hospedes: Hospedes[] = [];
  imovel: Imovel[] = [];

  form: FormGroup = this.formBuilder.group({
    idHospedes: new FormControl('', [Validators.required]),
    idImovel: new FormControl('', [Validators.required]),
    dias: new FormControl(),
  });

  formAddImovel: FormGroup = this.formBuilder.group({
    idHospedes: new FormControl('', [Validators.required]),
    idImovel: new FormControl('', [Validators.required]),
    dias: new FormControl(),
  });

  constructor(
    private formBuilder: FormBuilder,
    private hospedesService: HospedesService,
    private imovelService: ImovelService,
    private aluguelService: AluguelService
  ) {}

  ngOnInit(): void {
    this.consultarHospedes();
    this.consultarAluguel();
    this.consultarImoveis();
  }

  private consultarHospedes(): void {
    this.hospedesService.consultar().subscribe((h) => {
      this.hospedes = h;
    });
  }

  private consultarImoveis(): void {
    this.imovelService.consultar().subscribe((i) => {
      this.imovel = i;
    });
  }

  private consultarAluguel(): void {
    this.aluguelService.consultar().subscribe((a) => {
      this.alugueis = a;
    });
  }

  cadastrarAluguel(): void {
    if (this.formAddImovel.valid) {
      const idHospedes = this.formAddImovel.controls['idHospedes'].value;
      const idImovel = this.formAddImovel.controls['idImovel'].value;
      const dias = this.formAddImovel.controls['dias'].value;

      this.aluguelService
        .cadastrar(idHospedes, idImovel, dias)
        .subscribe(() => {
          this.consultarAluguel();
          this.resetForm();
        });
    }
  }

  verModal(aluguel: Aluguel): void {
    this.formAddImovel.controls['idAluguel'].setValue(aluguel.id);
  }

  addImovel(): void {
    if (this.formAddImovel.valid) {
      const idAluguel = this.formAddImovel.controls['idAluguel'].value;
      const idImovel = this.formAddImovel.controls['idImovel'].value;
      this.aluguelService
        .adicionarImoveis(idAluguel, idImovel)
        .subscribe(() => {
          this.consultarImoveis();
          this.resetForm();
        });
    }
  }


  excluir(aluguel: Aluguel): void {
    this.aluguelService.remover(aluguel.id).subscribe((a: Aluguel) => {
      if (a.id) {
        this.consultarAluguel();
      }
    });
  }

  private resetForm(): void {
    this.form.reset();
    this.form.controls['idHospedes'].setValue('');
    this.form.controls['idImovel'].setValue('');

    this.formAddImovel.reset();
    this.form.controls['idImovel'].setValue('');
  }
}
