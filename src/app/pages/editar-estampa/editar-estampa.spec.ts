import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEstampa } from './editar-estampa';

describe('EditarEstampa', () => {
  let component: EditarEstampa;
  let fixture: ComponentFixture<EditarEstampa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarEstampa]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarEstampa);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
