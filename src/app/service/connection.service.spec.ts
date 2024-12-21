import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConnectionService } from './connection.service';

describe('ConnectionService', () => {
  let service: ConnectionService;
  let httpMock: HttpTestingController; 
   
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ConnectionService] 
    });
    service = TestBed.inject(ConnectionService);
    httpMock = TestBed.inject(HttpTestingController); 
  });
  
  afterEach(() => {
    httpMock.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch data from the API (GET)', () => {
    const mockData = { key: 'value' };

   
    service.getData().subscribe((data) => {
      expect(data).toEqual(mockData); 
    });

    
    const req = httpMock.expectOne('http://localhost:3000/api/data');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should add data to the API (POST)', () => {
    const newData = { key: 'newValue' };
    const mockResponse = { success: true };

    
    service.addData(newData).subscribe((response) => {
      expect(response).toEqual(mockResponse); 
    });

    // Simula la respuesta HTTP
    const req = httpMock.expectOne('http://localhost:3000/api/data');
    expect(req.request.method).toBe('POST'); 
    expect(req.request.body).toEqual(newData); 
    req.flush(mockResponse); 
  });

  it('should update data on the API (PUT)', () => {
    const updatedData = { key: 'updatedValue' };
    const mockResponse = { success: true };
    const id = 1;

   
    service.updateData(id, updatedData).subscribe((response) => {
      expect(response).toEqual(mockResponse); 
    });

   
    const req = httpMock.expectOne(`http://localhost:3000/api/data/${id}`);
    expect(req.request.method).toBe('PUT'); 
    expect(req.request.body).toEqual(updatedData);
    req.flush(mockResponse); 
  });

  it('should delete data from the API (DELETE)', () => {
    const mockResponse = { success: true };
    const id = 1;

    service.deleteData(id).subscribe((response) => {
      expect(response).toEqual(mockResponse); 
    });

    const req = httpMock.expectOne(`http://localhost:3000/api/data/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse); 
  });
});
