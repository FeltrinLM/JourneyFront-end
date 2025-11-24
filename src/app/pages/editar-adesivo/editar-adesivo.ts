import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BackButtonComponent } from '../../shared/components/back-button/back-button.component';
import { AdesivoService } from '../../../app/core/services/api/adesivo.service';
import { AdesivoDTO, AdesivoEdicaoDTO } from '../../../app/core/models';

@Component({
  selector: 'app-editar-adesivo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BackButtonComponent
  ],
  templateUrl: './editar-adesivo.html',
  styleUrl: './editar-adesivo.css'
})
export class EditarAdesivo implements OnInit {
  // Variáveis para armazenar os dados do adesivo
  adesivoId: number | null = null;
  modelo: string = '';
  cromatico: boolean = true;
  carregando: boolean = false;
  salvando: boolean = false;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private adesivoService: AdesivoService
  ) {}

  ngOnInit(): void {
    this.carregarDadosAdesivo();
  }

  carregarDadosAdesivo(): void {
    // Obter ID da rota
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.adesivoId = +id;
      this.carregando = true;

      this.adesivoService.buscarPorId(this.adesivoId).subscribe({
        next: (adesivo: AdesivoDTO) => {
          this.modelo = adesivo.adesivoModelo;
          this.cromatico = adesivo.cromatico;
          this.carregando = false;
        },
        error: (error) => {
          console.error('Erro ao carregar adesivo:', error);
          this.carregando = false;
        }
      });
    } else {
      // Modo criação - usar valores padrão
      this.modelo = 'Modelo_prototipo';
      this.cromatico = true;
      this.carregando = false;
    }
  }

  onSubmit(): void {
    if (this.salvando || !this.validarFormulario()) return;

    this.salvando = true;

    const adesivoData: AdesivoEdicaoDTO = {
      adesivoModelo: this.modelo,
      cromatico: this.cromatico
    };

    if (this.adesivoId) {
      // Modo edição
      this.adesivoService.atualizar(this.adesivoId, adesivoData).subscribe({
        next: () => {
          console.log('Adesivo atualizado com sucesso');
          this.salvando = false;
          alert('Adesivo atualizado com sucesso!');
          this.router.navigate(['/visu-geral']); // Navega para a mesma rota da estampa
        },
        error: (error) => {
          console.error('Erro ao atualizar adesivo:', error);
          this.salvando = false;
          alert('Erro ao salvar alterações. Tente novamente.');
        }
      });
    } else {
      // Modo criação
      this.adesivoService.criar(adesivoData).subscribe({
        next: (novoAdesivo: AdesivoDTO) => {
          console.log('Adesivo criado com sucesso:', novoAdesivo);
          this.salvando = false;
          alert('Adesivo criado com sucesso!');
          this.router.navigate(['/visu-geral']); // Navega para a mesma rota da estampa
        },
        error: (error) => {
          console.error('Erro ao criar adesivo:', error);
          this.salvando = false;
          alert('Erro ao criar adesivo. Tente novamente.');
        }
      });
    }
  }

  private validarFormulario(): boolean {
    if (!this.modelo || this.modelo.trim() === '') {
      alert('Por favor, informe o nome do modelo');
      return false;
    }

    if (this.modelo.trim().length < 2) {
      alert('O nome do modelo deve ter pelo menos 2 caracteres');
      return false;
    }

    return true;
  }

  voltar(): void {
    this.location.back();
  }

  onCheckboxChange(): void {
    console.log('Estado do cromático:', this.cromatico);
  }
}
