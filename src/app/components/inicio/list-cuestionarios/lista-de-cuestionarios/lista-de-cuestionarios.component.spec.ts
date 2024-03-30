import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeCuestionariosComponent } from './lista-de-cuestionarios.component';

describe('ListaDeCuestionariosComponent', () => {
  let component: ListaDeCuestionariosComponent;
  let fixture: ComponentFixture<ListaDeCuestionariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaDeCuestionariosComponent]
    });
    fixture = TestBed.createComponent(ListaDeCuestionariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
