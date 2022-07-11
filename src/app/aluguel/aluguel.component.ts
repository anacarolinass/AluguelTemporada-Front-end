
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
  modal: boolean = false;
  modalPagar: boolean = false;

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

  formPagar: FormGroup = this.formBuilder.group({
    id: new FormControl('', [Validators.required]),
    enumFormaDePagamento: new FormControl('', [Validators.required]),
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

        });
    }
  }
  mostrarModal(aluguel: Aluguel): void {
    this.ativarModal();
    this.formAddImovel.controls['id'].setValue(aluguel.id);
  }

  mostrarModalPagar(aluguel: Aluguel): void {
    this.ativarModalPagar();
    this.formPagar.controls['id'].setValue(aluguel.id);
  }

  fecharModalPagar(): void {
    this.modal = false;
    this.formPagar.reset();
  }
  ativarModal(): void {
    this.modal = true;
    this.formAddImovel.reset();
  }

  ativarModalPagar(): void {
    this.modalPagar = true;
    this.formPagar.reset();
  }

  pagar(): void {
    if (this.formPagar.valid) {
      const idImovel = this.formPagar.controls['id'].value;
      const enumFormaDePagamento =
        this.formPagar.controls['enumFormaDePagamento'].value;

      this.aluguelService
        .pagar(idImovel, enumFormaDePagamento)
        .subscribe(() => {
          this.consultarImoveis();
          this.formPagar.reset();
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

}
