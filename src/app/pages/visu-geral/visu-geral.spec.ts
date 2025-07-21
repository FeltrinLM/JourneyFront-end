import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisuGeral } from './visu-geral';

describe('VisuGeral', () => {
  let component: VisuGeral;
  let fixture: ComponentFixture<VisuGeral>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisuGeral]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisuGeral);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
