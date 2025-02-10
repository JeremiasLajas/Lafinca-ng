import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePropiedadesComponent } from './detalle-propiedades.component';

describe('DetallePropiedadesComponent', () => {
  let component: DetallePropiedadesComponent;
  let fixture: ComponentFixture<DetallePropiedadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallePropiedadesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallePropiedadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
