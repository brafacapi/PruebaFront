import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GestionesComponent } from './gestiones.component';

describe('GestionesComponent', () => {
  let component: GestionesComponent;
  let fixture: ComponentFixture<GestionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, CommonModule, GestionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    // Limpiar localStorage después de cada prueba
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the managements from localStorage', () => {
    const gestionesMock = [
      { alerta: 'Alerta 1', tipoGestion: 'Buena', detalleGestion: 'Cliente confirma', resumenGestion: 'Todo bien' },
    ];
    localStorage.setItem('gestiones', JSON.stringify(gestionesMock));

    component.cargarGestiones();

    expect(component.gestiones).toEqual(gestionesMock);
  });

  it('should update detail options when management type changes', () => {
    component.tipoGestion = 'Pendiente';
    component.onTipoGestionChange();

    expect(component.detalleGestionOptions).toEqual(['Sin contacto', 'Llamar más tarde']);
  });

  it('should reset theManagement detail when changing the management type', () => {
    component.tipoGestion = 'Pendiente';
    component.detalleGestion = 'Cliente no reconoce';
    component.onTipoGestionChange();

    expect(component.detalleGestion).toBe('');
  });

  it('should emit formSubmitted and save data when submitting the form', () => {
    spyOn(component.formSubmitted, 'emit');
    const formData = {
      alerta: 'Alerta de prueba',
      tipoGestion: 'Fraude',
      detalleGestion: 'Cliente no reconoce',
      resumenGestion: 'Revisión necesaria',
    };

    component.alerta = formData.alerta;
    component.tipoGestion = formData.tipoGestion;
    component.detalleGestion = formData.detalleGestion;
    component.resumenGestion = formData.resumenGestion;

    component.onSubmit();

    expect(component.gestiones).toContain(formData);
    expect(localStorage.getItem('gestiones')).toBe(JSON.stringify(component.gestiones));
    expect(component.formSubmitted.emit).toHaveBeenCalledWith(formData);

    // Comprobar que los campos fueron limpiados
    expect(component.alerta).toBe('');
    expect(component.tipoGestion).toBe('');
    expect(component.detalleGestion).toBe('');
    expect(component.resumenGestion).toBe('');
    expect(component.detalleGestionOptions).toEqual([]);
  });
});
