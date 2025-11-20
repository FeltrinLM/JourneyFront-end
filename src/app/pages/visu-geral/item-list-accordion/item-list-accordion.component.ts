import { Component, signal, inject, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { PecaService, PecaDTO } from './services/peca.service';
import { EstampaService, EstampaDTO } from './services/estampa.service';
import { AdesivoService, AdesivoDTO } from './services/adesivo.service';
import { ColecaoService, ColecaoDTO } from './services/colecao.service';
import { ChaveiroService, ChaveiroDTO } from './services/chaveiro.service';

interface AccordionItem {
  id: number;
  title: string;
}

@Component({
  selector: 'app-item-list-accordion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-list-accordion.component.html',
  styleUrl: './item-list-accordion.component.css'
})
export class ItemListAccordionComponent implements OnInit {

  @Input() set itemIdToOpen(id: number | null) {
    if (id !== null) {
      this.toggleItem(id);
    }
  }

  openItemId = signal<number | null>(null);
  private router = inject(Router);

  // Injeção dos serviços
  private pecaService = inject(PecaService);
  private estampaService = inject(EstampaService);
  private adesivoService = inject(AdesivoService);
  private colecaoService = inject(ColecaoService);
  private chaveiroService = inject(ChaveiroService);

  items: AccordionItem[] = [
    { id: 1, title: 'Lista de Peças' },
    { id: 2, title: 'Lista de Estampas' },
    { id: 3, title: 'Lista de Adesivos' },
    { id: 4, title: 'Lista de Colecoes' },
    { id: 5, title: 'Lista de Chaveiros' }
  ];

  pecas = signal<PecaDTO[]>([]);
  estampas = signal<EstampaDTO[]>([]);
  adesivos = signal<AdesivoDTO[]>([]);
  colecoes = signal<ColecaoDTO[]>([]);
  chaveiros = signal<ChaveiroDTO[]>([]);

  ngOnInit(): void {
    this.carregarTudo();
  }

  // --- CARREGAMENTO DE DADOS ---
  carregarTudo() {
    this.carregarPecas();
    this.carregarEstampas();
    this.carregarAdesivos();
    this.carregarColecoes();
    this.carregarChaveiros();
  }

  carregarPecas() { this.pecaService.listarPecas().subscribe(data => this.pecas.set(data)); }
  carregarEstampas() { this.estampaService.listarEstampas().subscribe(data => this.estampas.set(data)); }
  carregarAdesivos() { this.adesivoService.listarAdesivos().subscribe(data => this.adesivos.set(data)); }
  carregarColecoes() { this.colecaoService.listarColecoes().subscribe(data => this.colecoes.set(data)); }
  carregarChaveiros() { this.chaveiroService.listarChaveiros().subscribe(data => this.chaveiros.set(data)); }

  toggleItem(itemId: number): void {
    if (this.openItemId() === itemId) {
      this.openItemId.set(null);
    } else {
      this.openItemId.set(itemId);
    }
  }

  navegarParaEdicao(rota: string) {
    this.router.navigate([rota]);
  }

  // --- FUNÇÕES DE EXCLUSÃO ---

  deletarPeca(id: number) {
    if (confirm('Tem certeza que deseja excluir esta Peça?')) {
      this.pecaService.deletar(id).subscribe({
        next: () => {
          alert('Peça excluída com sucesso!');
          this.carregarPecas(); // Atualiza a lista na tela
        },
        error: (err) => alert('Erro ao excluir peça.')
      });
    }
  }

  deletarEstampa(id: number) {
    if (confirm('Tem certeza que deseja excluir esta Estampa?')) {
      this.estampaService.deletar(id).subscribe({
        next: () => {
          alert('Estampa excluída com sucesso!');
          this.carregarEstampas();
        },
        error: (err) => alert('Erro ao excluir estampa.')
      });
    }
  }

  deletarAdesivo(id: number) {
    if (confirm('Tem certeza que deseja excluir este Adesivo?')) {
      this.adesivoService.deletar(id).subscribe({
        next: () => {
          alert('Adesivo excluído com sucesso!');
          this.carregarAdesivos();
        },
        error: (err) => alert('Erro ao excluir adesivo.')
      });
    }
  }

  deletarColecao(id: number) {
    if (confirm('Tem certeza que deseja excluir esta Coleção?')) {
      this.colecaoService.deletar(id).subscribe({
        next: () => {
          alert('Coleção excluída com sucesso!');
          this.carregarColecoes();
        },
        error: (err) => alert('Erro ao excluir coleção.')
      });
    }
  }

  deletarChaveiro(id: number) {
    if (confirm('Tem certeza que deseja excluir este Chaveiro?')) {
      this.chaveiroService.deletar(id).subscribe({
        next: () => {
          alert('Chaveiro excluído com sucesso!');
          this.carregarChaveiros();
        },
        error: (err) => alert('Erro ao excluir chaveiro.')
      });
    }
  }
}
