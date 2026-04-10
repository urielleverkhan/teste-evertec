import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpServerService } from './http-server.service';
import { Usuario } from '../../interfaces/usuario-interface';

describe('HttpServerService', () => {
  let service: HttpServerService;
  let httpMock: HttpTestingController;

  const mockUsuarios: Usuario[] = [
    { id: 1, nome: 'João', email: 'joao@test.com' },
    { id: 2, nome: 'Maria', email: 'maria@test.com' },
  ];

  const mockUsuario: Usuario = { id: 1, nome: 'João', email: 'joao@test.com' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpServerService],
    });

    service = TestBed.inject(HttpServerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize usuarios signal as empty array', () => {
    expect(service.usuarios()).toEqual([]);
  });

  it('should fetch all usuarios and update signal', (done) => {
    service.getUsuarios().subscribe((usuarios) => {
      expect(usuarios).toEqual(mockUsuarios);
      expect(service.usuarios()).toEqual(mockUsuarios);
      done();
    });

    const req = httpMock.expectOne(
      'http://localhost:4000/mock/usuarios/listar',
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockUsuarios);
  });

  it('should handle error in getUsuarios', (done) => {
    service.getUsuarios().subscribe({
      error: (error) => {
        expect(error).toBeTruthy();
        done();
      },
    });

    const req = httpMock.expectOne(
      'http://localhost:4000/mock/usuarios/listar',
    );
    req.error(new ErrorEvent('Network error'));
  });

  it('should fetch usuario by id and update signal', (done) => {
    const userId = 1;

    service.getUsuariosPorId(userId).subscribe((usuario) => {
      expect(usuario).toEqual(mockUsuario);
      expect(service.usuarios()).toEqual([mockUsuario]);
      done();
    });

    const req = httpMock.expectOne(
      `http://localhost:4000/mock/usuario/procurar?id=${userId}`,
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockUsuario);
  });

  it('should handle error in getUsuariosPorId', (done) => {
    service.getUsuariosPorId(1).subscribe({
      error: (error) => {
        expect(error).toBeTruthy();
        done();
      },
    });

    const req = httpMock.expectOne(
      'http://localhost:4000/mock/usuario/procurar?id=1',
    );
    req.error(new ErrorEvent('Network error'));
  });

  it('should make correct GET request to getUsuarios endpoint', () => {
    service.getUsuarios().subscribe();

    const req = httpMock.expectOne(
      'http://localhost:4000/mock/usuarios/listar',
    );
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('should make correct parameterized GET request to getUsuariosPorId endpoint', () => {
    const userId = 5;
    service.getUsuariosPorId(userId).subscribe();

    const req = httpMock.expectOne(
      `http://localhost:4000/mock/usuario/procurar?id=${userId}`,
    );
    expect(req.request.method).toBe('GET');
    expect(req.request.url).toContain(`id=${userId}`);
    req.flush({} as Usuario);
  });
});
