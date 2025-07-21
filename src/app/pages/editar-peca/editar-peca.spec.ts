import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPeca } from './editar-peca';

describe('EditarPeca', () => {
  let component: EditarPeca;
  let fixture: ComponentFixture<EditarPeca>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarPeca]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarPeca);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
