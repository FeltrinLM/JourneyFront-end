import { Component, signal, inject, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { PecaService, PecaDTO } from '../../../../app/core/services/api/peca.service';
import { EstampaService, EstampaDTO } from '../../../../app/core/services/api/estampa.service';
import { AdesivoService, AdesivoDTO } from '../../../../app/core/services/api/adesivo.service';
import { ColecaoService, ColecaoDTO } from '../../../../app/core/services/api/colecao.service';
import { ChaveiroService, ChaveiroDTO } from '../../../../app/core/services/api/chaveiro.service';

import {
  PecaDTO,
  EstampaDTO,
  AdesivoDTO,
  ColecaoDTO,
  ChaveiroDTO
} from '../../../../core/models';

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
      this.openItemIds.update(ids => {
        const newIds = new Set(ids);
        newIds.add(id);
        return newIds;
      });
    }
  }

  openItemIds = signal<Set<number>>(new Set());
  private router = inject(Router);

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

  carregarTudo() {
    this.carregarPecas();
    this.carregarEstampas();
    this.carregarAdesivos();
    this.carregarColecoes();
    this.carregarChaveiros();
  }

  carregarPecas() {
    this.pecaService.listarPecas().subscribe({
      next: (data) => this.pecas.set(data),
      error: (err) => console.error('Erro ao carregar peças:', err)
    });
  }

  carregarEstampas() {
    this.estampaService.listarEstampas().subscribe({
      next: (data) => this.estampas.set(data),
      error: (err) => console.error('Erro ao carregar estampas:', err)
    });
  }

  carregarAdesivos() {
    this.adesivoService.listarAdesivos().subscribe({
      next: (data) => this.adesivos.set(data),
      error: (err) => console.error('Erro ao carregar adesivos:', err)
    });
  }

  carregarColecoes() {
    this.colecaoService.listarColecoes().subscribe({
      next: (data) => this.colecoes.set(data),
      error: (err) => console.error('Erro ao carregar coleções:', err)
    });
  }

  carregarChaveiros() {
    this.chaveiroService.listarChaveiros().subscribe({
      next: (data) => this.chaveiros.set(data),
      error: (err) => console.error('Erro ao carregar chaveiros:', err)
    });
  }

  toggleItem(itemId: number): void {
    this.openItemIds.update(currentSet => {
      const newSet = new Set(currentSet);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  }

  // --- FUNÇÕES DE EDIÇÃO ESPECÍFICAS ---
  editarPeca(id: number): void {
    console.log('Editando peça ID:', id);
    this.router.navigate(['/editar-peca', id]);
  }

  editarEstampa(id: number): void {
    console.log('Editando estampa ID:', id);
    this.router.navigate(['/editar-estampa', id]);
  }

  editarAdesivo(id: number): void {
    console.log('Editando adesivo ID:', id);
    this.router.navigate(['/editar-adesivo', id]);
  }

  editarColecao(id: number): void {
    console.log('Editando coleção ID:', id);
    if (!id || id <= 0) {
      console.error('ID inválido para edição de coleção:', id);
      alert('ID da coleção inválido');
      return;
    }
    this.router.navigate(['/editar-colecao', id]);
  }

  editarChaveiro(id: number): void {
    console.log('Editando chaveiro ID:', id);
    this.router.navigate(['/editar-chaveiro', id]);
  }

  // --- FUNÇÕES DE EXCLUSÃO ---
  deletarPeca(id: number) {
    if (confirm('Tem certeza que deseja excluir esta Peça?')) {
      this.pecaService.deletar(id).subscribe({
        next: () => {
          alert('Peça excluída com sucesso!');
          this.carregarPecas();
        },
        error: (err) => {
          console.error('Erro ao excluir peça:', err);
          alert('Erro ao excluir peça.');
        }
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
        error: (err) => {
          console.error('Erro ao excluir estampa:', err);
          alert('Erro ao excluir estampa.');
        }
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
        error: (err) => {
          console.error('Erro ao excluir adesivo:', err);
          alert('Erro ao excluir adesivo.');
        }
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
        error: (err) => {
          console.error('Erro ao excluir coleção:', err);
          alert('Erro ao excluir coleção.');
        }
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
        error: (err) => {
          console.error('Erro ao excluir chaveiro:', err);
          alert('Erro ao excluir chaveiro.');
        }
      });
    }
  }

  // --- FUNÇÃO HELPER ---
  obterNomeColecao(id: number): string {
    const colecao = this.colecoes().find(c => c.colecaoId === id);
    return colecao ? colecao.nome : 'Carregando...';
  }
}
