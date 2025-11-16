import { Component, signal } from '@angular/core';

interface AccordionItem {
  id: number;
  title: string;
  content: string;
}

interface TableItem {
  id: number;
  name: string;
  category: string;
  status: 'ativo' | 'inativo' | 'pendente';
  quantity: number;
}

@Component({
  selector: 'app-item-list-accordion',
  standalone: true,
  imports: [],
  templateUrl: './item-list-accordion.component.html',
  styleUrl: './item-list-accordion.component.css'
})
export class ItemListAccordionComponent {
  openItemId = signal<number | null>(null);

  items: AccordionItem[] = [
    { id: 1, title: 'Lista de Peças', content: 'Conteúdo das peças' },
    { id: 2, title: 'Lista de Estampas', content: 'Conteúdo das estampas' },
    { id: 3, title: 'Lista de Adesivos', content: 'Conteúdo dos adesivos' },
    { id: 4, title: 'Lista de Colecoes', content: 'Conteúdo das Colecoes' },
    { id: 5, title: 'Lista de Chaveiros', content: 'Conteúdo dos Chaveiros' }
  ];

  // Dados de exemplo para as tabelas
  tableData: { [key: number]: TableItem[] } = {
    1: [
      { id: 101, name: 'Peça A', category: 'Mecânica', status: 'ativo', quantity: 15 },
      { id: 102, name: 'Peça B', category: 'Elétrica', status: 'inativo', quantity: 8 },
      { id: 103, name: 'Peça C', category: 'Hidráulica', status: 'pendente', quantity: 22 },
      { id: 104, name: 'Peça D', category: 'Mecânica', status: 'ativo', quantity: 5 }
    ],
    2: [
      { id: 201, name: 'Equipamento X', category: 'Produção', status: 'ativo', quantity: 3 },
      { id: 202, name: 'Equipamento Y', category: 'Teste', status: 'ativo', quantity: 7 }
    ],
    3: [
      { id: 301, name: 'Material 1', category: 'Insumo', status: 'ativo', quantity: 100 },
      { id: 302, name: 'Material 2', category: 'Embalagem', status: 'pendente', quantity: 50 }
    ],
    4: [
      { id: 401, name: 'Ferramenta P', category: 'Montagem', status: 'ativo', quantity: 12 },
      { id: 402, name: 'Ferramenta Q', category: 'Medição', status: 'inativo', quantity: 4 }
    ],
    5: [
      { id: 401, name: 'Ferramenta P', category: 'Montagem', status: 'ativo', quantity: 12 },
      { id: 402, name: 'Ferramenta Q', category: 'Medição', status: 'inativo', quantity: 4 }
    ]
  };

  toggleItem(itemId: number): void {
    if (this.openItemId() === itemId) {
      this.openItemId.set(null);
    } else {
      this.openItemId.set(itemId);
    }
  }

  getTableItems(itemId: number): TableItem[] {
    return this.tableData[itemId] || [];
  }
}
