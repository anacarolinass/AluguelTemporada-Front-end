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
  imovel: Imovel[] = [];
  alugueis: Aluguel[] = [];

  form: FormGroup = this.formBuilder.group({
    id: new FormControl(null),
    nome: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    cpf: new FormControl(null, [Validators.required, Validators.minLength(11)]),
    telefone: new FormControl(null),
    dataNasc: new FormControl(null, [Validators.required]),
  });

  formImovel: FormGroup = this.formBuilder.group({
    id: new FormControl(null),
    nome: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    tipoImovel: new FormControl(null),
    endereco: new FormControl(null),
    valorDiaria: new FormControl(null),
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
    this.carregarTabela();
    this.consultarAluguel();
    this.consultarImoveis();
    this.consultarHospedes();
  }
  private carregarTabela(): void {
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
            this.carregarTabela();
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
        this.carregarTabela();
      }
    });
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

  cadastrarAluguel(): void {
    if (this.formAddImovel.valid) {
      const idHospedes = this.formAddImovel.controls['idHospedes'].value;
      const idImovel = this.formAddImovel.controls['idImovel'].value;
      const dias = this.formAddImovel.controls['dias'].value;

      this.aluguelService
        .cadastrar(idHospedes, idImovel, dias)
        .subscribe(() => {
          this.consultarAluguel();
          this.formAddImovel.reset;
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
          this.formAddImovel.reset();
        });
    }
  }

  private resetForm(): void {
    this.form.reset();
    this.form.controls['idHospedes'].setValue('');
    this.form.controls['idImovel'].setValue('');

    this.formAddImovel.reset();
    this.form.controls['idImovel'].setValue('');
  }
}
