import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConnectionService } from './connection.service';

describe('ConnectionService', () => {
  let service: ConnectionService;
  let httpMock: HttpTestingController; // Para interceptar las solicitudes HTTP

  // Configuración de la prueba
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importa HttpClientTestingModule para interceptar las peticiones
      providers: [ConnectionService] // Proveedor del servicio que vamos a probar
    });
    service = TestBed.inject(ConnectionService);
    httpMock = TestBed.inject(HttpTestingController); // Accede a HttpTestingController
  });

  // Limpieza después de cada prueba
  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes HTTP pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch data from the API (GET)', () => {
    const mockData = { key: 'value' };

    // Llamada al método del servicio
    service.getData().subscribe((data) => {
      expect(data).toEqual(mockData); // Compara la respuesta con los datos simulados
    });

    // Simula la respuesta HTTP
    const req = httpMock.expectOne('http://localhost:3000/api/data');
    expect(req.request.method).toBe('GET'); // Verifica que la solicitud sea de tipo GET
    req.flush(mockData); // Responde con los datos simulados
  });

  it('should add data to the API (POST)', () => {
    const newData = { key: 'newValue' };
    const mockResponse = { success: true };

    // Llamada al método del servicio
    service.addData(newData).subscribe((response) => {
      expect(response).toEqual(mockResponse); // Compara la respuesta con los datos simulados
    });

    // Simula la respuesta HTTP
    const req = httpMock.expectOne('http://localhost:3000/api/data');
    expect(req.request.method).toBe('POST'); // Verifica que la solicitud sea de tipo POST
    expect(req.request.body).toEqual(newData); // Verifica que los datos enviados sean los correctos
    req.flush(mockResponse); // Responde con los datos simulados
  });

  it('should update data on the API (PUT)', () => {
    const updatedData = { key: 'updatedValue' };
    const mockResponse = { success: true };
    const id = 1;

    // Llamada al método del servicio
    service.updateData(id, updatedData).subscribe((response) => {
      expect(response).toEqual(mockResponse); // Compara la respuesta con los datos simulados
    });

    // Simula la respuesta HTTP
    const req = httpMock.expectOne(`http://localhost:3000/api/data/${id}`);
    expect(req.request.method).toBe('PUT'); // Verifica que la solicitud sea de tipo PUT
    expect(req.request.body).toEqual(updatedData); // Verifica que los datos enviados sean los correctos
    req.flush(mockResponse); // Responde con los datos simulados
  });

  it('should delete data from the API (DELETE)', () => {
    const mockResponse = { success: true };
    const id = 1;

    // Llamada al método del servicio
    service.deleteData(id).subscribe((response) => {
      expect(response).toEqual(mockResponse); // Compara la respuesta con los datos simulados
    });

    // Simula la respuesta HTTP
    const req = httpMock.expectOne(`http://localhost:3000/api/data/${id}`);
    expect(req.request.method).toBe('DELETE'); // Verifica que la solicitud sea de tipo DELETE
    req.flush(mockResponse); // Responde con los datos simulados
  });
});
