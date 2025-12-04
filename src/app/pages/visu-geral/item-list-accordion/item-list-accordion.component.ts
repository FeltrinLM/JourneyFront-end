import { Component, signal, inject, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { PecaService } from '../../../../app/core/services/api/peca.service';
import { EstampaService } from '../../../../app/core/services/api/estampa.service';
import { AdesivoService} from '../../../../app/core/services/api/adesivo.service';
import { ColecaoService} from '../../../../app/core/services/api/colecao.service';
import { ChaveiroService } from '../../../../app/core/services/api/chaveiro.service';

import {
  PecaDTO,
  EstampaDTO,
  AdesivoDTO,
  ColecaoDTO,
  ChaveiroDTO
} from '../../../../app/core/models';

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

  // --- LÓGICA DO TOGGLE (CORRIGIDA) ---
  @Input() set itemIdToOpen(id: number | null) {
    if (id !== null) {
      // Se vier um ID, fecha tudo e abre só ele
      this.openItemIds.set(new Set([id]));
    } else {
      // Se vier null, fecha tudo
      this.openItemIds.set(new Set());
    }
  }

  openItemIds = signal<Set<number>>(new Set());

  private router = inject(Router);

  // Injeção dos Services
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

  // Signals para armazenar os dados
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

  // --- LOADERS ---
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

  // --- TOGGLE MANUAL (Ao clicar no cabeçalho do accordion) ---
  toggleItem(itemId: number): void {
    this.openItemIds.update(currentSet => {
      const newSet = new Set(currentSet);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        // Se quiser comportamento "sanfona" (fecha os outros ao abrir um), descomente abaixo:
        // newSet.clear();
        newSet.add(itemId);
      }
      return newSet;
    });
  }

  // =================================================================
  // MÉTODOS DE AÇÃO (Esses eram os que estavam faltando!)
  // =================================================================

  // --- PEÇAS ---
  editarPeca(id: number): void {
    this.router.navigate(['/editar-peca', id]);
  }

  deletarPeca(id: number) {
    if (confirm('Tem certeza que deseja excluir esta Peça?')) {
      this.pecaService.deletar(id).subscribe({
        next: () => {
          alert('Peça excluída com sucesso!');
          this.carregarPecas();
        },
        error: (err) => alert('Erro ao excluir peça.')
      });
    }
  }

  // --- ESTAMPAS ---
  editarEstampa(id: number): void {
    this.router.navigate(['/editar-estampa', id]);
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

  // --- ADESIVOS ---
  editarAdesivo(id: number): void {
    this.router.navigate(['/editar-adesivo', id]);
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

  // --- COLEÇÕES ---
  editarColecao(id: number): void {
    this.router.navigate(['/editar-colecao', id]);
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

  // --- CHAVEIROS ---
  editarChaveiro(id: number): void {
    this.router.navigate(['/editar-chaveiro', id]);
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

  // --- HELPER ---
  obterNomeColecao(id: number): string {
    const colecao = this.colecoes().find(c => c.colecaoId === id);
    return colecao ? colecao.nome : '...';
  }
}
