import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarItem } from './cadastrar-item';

describe('CadastrarItem', () => {
  let component: CadastrarItem;
  let fixture: ComponentFixture<CadastrarItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
