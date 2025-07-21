import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoDeAlteracoes } from './historico-de-alteracoes';

describe('HistoricoDeAlteracoes', () => {
  let component: HistoricoDeAlteracoes;
  let fixture: ComponentFixture<HistoricoDeAlteracoes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricoDeAlteracoes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricoDeAlteracoes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
