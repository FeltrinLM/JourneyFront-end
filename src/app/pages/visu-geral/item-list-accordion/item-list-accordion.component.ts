// item-list-accordion.component.ts

import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Imports dos serviços
import { PecaService, PecaDTO } from './services/peca.service';
import { EstampaService, EstampaDTO } from './services/estampa.service';
import { AdesivoService, AdesivoDTO } from './services/adesivo.service';
import { ColecaoService, ColecaoDTO } from './services/colecao.service';
import { ChaveiroService, ChaveiroDTO } from './services/chaveiro.service'; // <-- 1. IMPORTAR NOVO SERVIÇO

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
  openItemId = signal<number | null>(null);

  // 2. INJETAR O NOVO SERVIÇO
  private pecaService = inject(PecaService);
  private estampaService = inject(EstampaService);
  private adesivoService = inject(AdesivoService);
  private colecaoService = inject(ColecaoService);
  private chaveiroService = inject(ChaveiroService); // <-- NOVO

  items: AccordionItem[] = [
    { id: 1, title: 'Lista de Peças' },
    { id: 2, title: 'Lista de Estampas' },
    { id: 3, title: 'Lista de Adesivos' },
    { id: 4, title: 'Lista de Colecoes' },
    { id: 5, title: 'Lista de Chaveiros' }
  ];

  // 3. ADICIONAR O NOVO SIGNAL
  pecas = signal<PecaDTO[]>([]);
  estampas = signal<EstampaDTO[]>([]);
  adesivos = signal<AdesivoDTO[]>([]);
  colecoes = signal<ColecaoDTO[]>([]);
  chaveiros = signal<ChaveiroDTO[]>([]); // <-- NOVO

  ngOnInit(): void {
    // 4. CARREGAR TODAS AS 5 LISTAS
    this.pecaService.listarPecas().subscribe(data => {
      this.pecas.set(data);
    });

    this.estampaService.listarEstampas().subscribe(data => {
      this.estampas.set(data);
    });

    this.adesivoService.listarAdesivos().subscribe(data => {
      this.adesivos.set(data);
    });

    this.colecaoService.listarColecoes().subscribe(data => {
      this.colecoes.set(data);
    });

    this.chaveiroService.listarChaveiros().subscribe(data => { // <-- NOVO
      this.chaveiros.set(data);
    });
  }

  toggleItem(itemId: number): void {
    if (this.openItemId() === itemId) {
      this.openItemId.set(null);
    } else {
      this.openItemId.set(itemId);
    }
  }
}
