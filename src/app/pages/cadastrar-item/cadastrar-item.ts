import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BackButtonComponent } from '../../shared/components/back-button/back-button.component';
import { ColecaoService } from '../../../app/core/services/api/colecao.service';
import { EstampaService } from '../../../app/core/services/api/estampa.service';
import { AdesivoService } from '../../../app/core/services/api/adesivo.service';
import { PecaService } from '../../../app/core/services/api/peca.service';
import { ChaveiroService } from '../../../app/core/services/api/chaveiro.service';
import {
  ColecaoDTO,
  ColecaoEdicaoDTO,
  EstampaEdicaoDTO,
  AdesivoEdicaoDTO,
  PecaEdicaoDTO,
  ChaveiroEdicaoDTO,
  AdesivoDTO,
  ChaveiroDTO,
  ColecaoDTO as BackendColecaoDTO,
  EstampaDTO,
  PecaDTO
} from '../../../app/core/models';

@Component({
  selector: 'app-cadastrar-item',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BackButtonComponent
  ],
  templateUrl: './cadastrar-item.html',
  styleUrls: ['./cadastrar-item.css']
})
export class CadastrarItem implements OnInit {

  tipoSelecionado: string | null = null;
  colecoes: ColecaoDTO[] = [];
  salvando: boolean = false;

  // Dados para cada tipo de item
  colecaoData: ColecaoEdicaoDTO = {
    nome: '',
    dataInicio: '',
    dataFim: ''
  };

  estampaData: EstampaEdicaoDTO = {
    nome: '',
    quantidade: 0,
    colecaoId: 0
  };

  adesivoData: AdesivoEdicaoDTO = {
    adesivoModelo: '',
    cromatico: false
  };

  pecaData: PecaEdicaoDTO = {
    tipo: '',
    tamanho: '',
    cor: '',
    quantidade: 0
  };

  chaveiroData: ChaveiroEdicaoDTO = {
    chaveiroModelo: '',
    colecaoId: 0
  };

  constructor(
    private router: Router,
    private colecaoService: ColecaoService,
    private estampaService: EstampaService,
    private adesivoService: AdesivoService,
    private pecaService: PecaService,
    private chaveiroService: ChaveiroService
  ) {}

  ngOnInit(): void {
    this.carregarColecoes();
  }

  carregarColecoes(): void {
    this.colecaoService.listarColecoes().subscribe({
      next: (data: ColecaoDTO[]) => {
        this.colecoes = data;
        console.log('Coleções carregadas:', this.colecoes);
      },
      error: (err) => {
        console.error('Erro ao carregar coleções:', err);
        alert('Erro ao carregar lista de coleções. Tente novamente.');
      }
    });
  }

  selecionarTipo(tipo: string) {
    this.tipoSelecionado = tipo;
  }

  voltarParaMenu() {
    this.tipoSelecionado = null;
    this.resetarDados();
  }

  resetarDados() {
    this.colecaoData = { nome: '', dataInicio: '', dataFim: '' };
    this.estampaData = { nome: '', quantidade: 0, colecaoId: 0 };
    this.adesivoData = { adesivoModelo: '', cromatico: false };
    this.pecaData = { tipo: '', tamanho: '', cor: '', quantidade: 0 };
    this.chaveiroData = { chaveiroModelo: '', colecaoId: 0 };
  }

  salvarItem() {
    if (this.salvando) return;

    // Validações específicas para cada tipo
    if (!this.validarFormulario()) {
      return;
    }

    this.salvando = true;
    console.log('Salvando dados:', this.getDadosAtuais());

    switch (this.tipoSelecionado) {
      case 'COLECAO':
        this.salvarColecao();
        break;

      case 'ESTAMPA':
        this.salvarEstampa();
        break;

      case 'ADESIVO':
        this.salvarAdesivo();
        break;

      case 'PECA':
        this.salvarPeca();
        break;

      case 'CHAVEIRO':
        this.salvarChaveiro();
        break;
    }
  }

  private salvarColecao(): void {
    // Validar datas
    if (new Date(this.colecaoData.dataFim) <= new Date(this.colecaoData.dataInicio)) {
      alert('A data de fim deve ser posterior à data de início');
      this.salvando = false;
      return;
    }

    this.colecaoService.criar(this.colecaoData).subscribe({
      next: (response: ColecaoDTO) => {
        console.log('Coleção criada com sucesso:', response);
        alert('Coleção criada com sucesso!');
        this.salvando = false;
        this.resetarDados();
        this.voltarParaMenu();
      },
      error: (error) => {
        console.error('Erro ao criar coleção:', error);
        alert('Erro ao criar coleção. Tente novamente.');
        this.salvando = false;
      }
    });
  }

  private salvarEstampa(): void {
    this.estampaService.criar(this.estampaData).subscribe({
      next: (response: EstampaDTO) => {
        console.log('Estampa criada com sucesso:', response);
        alert('Estampa criada com sucesso!');
        this.salvando = false;
        this.resetarDados();
        this.voltarParaMenu();
      },
      error: (error) => {
        console.error('Erro ao criar estampa:', error);
        alert('Erro ao criar estampa. Tente novamente.');
        this.salvando = false;
      }
    });
  }

  private salvarAdesivo(): void {
    this.adesivoService.criar(this.adesivoData).subscribe({
      next: (response: AdesivoDTO) => {
        console.log('Adesivo criado com sucesso:', response);
        alert('Adesivo criado com sucesso!');
        this.salvando = false;
        this.resetarDados();
        this.voltarParaMenu();
      },
      error: (error) => {
        console.error('Erro ao criar adesivo:', error);
        alert('Erro ao criar adesivo. Tente novamente.');
        this.salvando = false;
      }
    });
  }

  private salvarPeca(): void {
    this.pecaService.criar(this.pecaData).subscribe({
      next: (response: PecaDTO) => {
        console.log('Peça criada com sucesso:', response);
        alert('Peça criada com sucesso!');
        this.salvando = false;
        this.resetarDados();
        this.voltarParaMenu();
      },
      error: (error) => {
        console.error('Erro ao criar peça:', error);
        alert('Erro ao criar peça. Tente novamente.');
        this.salvando = false;
      }
    });
  }

  private salvarChaveiro(): void {
    this.chaveiroService.criar(this.chaveiroData).subscribe({
      next: (response: ChaveiroDTO) => {
        console.log('Chaveiro criado com sucesso:', response);
        alert('Chaveiro criado com sucesso!');
        this.salvando = false;
        this.resetarDados();
        this.voltarParaMenu();
      },
      error: (error) => {
        console.error('Erro ao criar chaveiro:', error);
        alert('Erro ao criar chaveiro. Tente novamente.');
        this.salvando = false;
      }
    });
  }

  private validarFormulario(): boolean {
    switch (this.tipoSelecionado) {
      case 'COLECAO':
        if (!this.colecaoData.nome?.trim()) {
          alert('Por favor, informe o nome da coleção');
          return false;
        }
        if (!this.colecaoData.dataInicio) {
          alert('Por favor, informe a data de início');
          return false;
        }
        if (!this.colecaoData.dataFim) {
          alert('Por favor, informe a data de fim');
          return false;
        }
        break;

      case 'ESTAMPA':
        if (!this.estampaData.nome?.trim()) {
          alert('Por favor, informe o nome da estampa');
          return false;
        }
        if (this.estampaData.quantidade < 0) {
          alert('A quantidade não pode ser negativa');
          return false;
        }
        if (!this.estampaData.colecaoId || this.estampaData.colecaoId <= 0) {
          alert('Por favor, selecione uma coleção');
          return false;
        }
        break;

      case 'ADESIVO':
        if (!this.adesivoData.adesivoModelo?.trim()) {
          alert('Por favor, informe o modelo do adesivo');
          return false;
        }
        break;

      case 'PECA':
        if (!this.pecaData.tipo) {
          alert('Por favor, selecione o tipo da peça');
          return false;
        }
        if (!this.pecaData.tamanho) {
          alert('Por favor, selecione o tamanho');
          return false;
        }
        if (!this.pecaData.cor) {
          alert('Por favor, selecione a cor');
          return false;
        }
        if (this.pecaData.quantidade < 0) {
          alert('A quantidade não pode ser negativa');
          return false;
        }
        break;

      case 'CHAVEIRO':
        if (!this.chaveiroData.chaveiroModelo?.trim()) {
          alert('Por favor, informe o modelo do chaveiro');
          return false;
        }
        if (!this.chaveiroData.colecaoId || this.chaveiroData.colecaoId <= 0) {
          alert('Por favor, selecione uma coleção');
          return false;
        }
        break;
    }
    return true;
  }

  private getDadosAtuais(): any {
    switch (this.tipoSelecionado) {
      case 'COLECAO': return this.colecaoData;
      case 'ESTAMPA': return this.estampaData;
      case 'ADESIVO': return this.adesivoData;
      case 'PECA': return this.pecaData;
      case 'CHAVEIRO': return this.chaveiroData;
      default: return null;
    }
  }
}
