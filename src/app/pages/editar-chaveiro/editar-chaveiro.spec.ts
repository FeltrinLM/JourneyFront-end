import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarChaveiro } from './editar-chaveiro';

describe('EditarChaveiro', () => {
  let component: EditarChaveiro;
  let fixture: ComponentFixture<EditarChaveiro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarChaveiro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarChaveiro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
