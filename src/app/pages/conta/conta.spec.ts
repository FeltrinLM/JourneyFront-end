import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Conta } from './conta';

describe('Conta', () => {
  let component: Conta;
  let fixture: ComponentFixture<Conta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Conta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Conta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
