import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarColecao } from './editar-colecao';

describe('EditarColecao', () => {
  let component: EditarColecao;
  let fixture: ComponentFixture<EditarColecao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarColecao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarColecao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
