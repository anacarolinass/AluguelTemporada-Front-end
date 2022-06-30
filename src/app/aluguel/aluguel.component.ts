
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
  });

  formAddImovel: FormGroup = this.formBuilder.group({
    idHospedes: new FormControl('', [Validators.required]),
    idImovel: new FormControl('', [Validators.required]),
  });

  constructor(
    private formBuilder: FormBuilder,
    private hospedesService: HospedesService,
    private imovelService: ImovelService,
    private aluguelService: AluguelService
  ) {}

  ngOnInit(): void {
    this.consultarAluguel();
    this.consultarImoveis();
    this.consultarHospedes();

  }

  private consultarHospedes(): void {
    this.hospedesService.consultar().subscribe((x) => {
      this.hospedes = x;
    });
  }

  private consultarImoveis(): void {
    this.imovelService.consultar().subscribe((x) => {
      this.imovel = x;
    });
  }

  private consultarAluguel(): void {
    this.aluguelService.consultar().subscribe((x) => {
      this.alugueis = x;
    });
  }


  cadastrar(): void {
    if (this.form.valid) {
      const idHospedes = this.form.controls['idHospedes'].value;
      const idImovel = this.form.controls['idImovel'].value;
      this.aluguelService.cadastrar(idHospedes, idImovel).subscribe(() => {
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

  private resetForm(): void {
    this.form.reset();
    this.form.controls['idFarmaceutico'].setValue('');
    this.form.controls['idCliente'].setValue('');

    this.formAddImovel.reset();
    this.form.controls['idProduto'].setValue('');
  }
}
