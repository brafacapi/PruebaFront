import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialComponent } from './historial.component';

describe('HistorialComponent', () => {
  let component: HistorialComponent;
  let fixture: ComponentFixture<HistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialComponent], // Se incluye en `imports` porque es standalone
    }).compileComponents();

    fixture = TestBed.createComponent(HistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize "gestiones" as an empty array', () => {
    expect(component.gestiones).toEqual([]);
  });

  describe('loadGestiones', () => {
    it('should load data from localStorage if available', () => {
      const mockData = JSON.stringify([{ id: 1, name: 'Gestión 1' }]);
      spyOn(localStorage, 'getItem').and.returnValue(mockData);

      component.loadGestiones();

      expect(localStorage.getItem).toHaveBeenCalledWith('formData');
      expect(component.gestiones).toEqual([{ id: 1, name: 'Gestión 1' }]);
    });

    it('should assign a single object from localStorage as an array', () => {
      const mockData = JSON.stringify({ id: 1, name: 'Gestión única' });
      spyOn(localStorage, 'getItem').and.returnValue(mockData);

      component.loadGestiones();

      expect(component.gestiones).toEqual([{ id: 1, name: 'Gestión única' }]);
    });

    it('should leave "gestiones" as an empty array if localStorage has no data', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);

      component.loadGestiones();

      expect(component.gestiones).toEqual([]);
    });

    it('should log a warning if localStorage is unavailable', () => {
      const consoleSpy = spyOn(console, 'warn');

      // Simulate environment without localStorage
      const originalLocalStorage = window.localStorage;
      Object.defineProperty(window, 'localStorage', {
        value: undefined,
        configurable: true,
      });

      component.loadGestiones();

      expect(consoleSpy).toHaveBeenCalledWith(
        'localStorage no está disponible en este entorno.'
      );

      // Restore localStorage
      Object.defineProperty(window, 'localStorage', {
        value: originalLocalStorage,
        configurable: true,
      });
    });
  });

  it('should call loadGestiones on component initialization', () => {
    const loadGestionesSpy = spyOn(component, 'loadGestiones').and.callThrough();

    component.ngOnInit();

    expect(loadGestionesSpy).toHaveBeenCalled();
  });
});
