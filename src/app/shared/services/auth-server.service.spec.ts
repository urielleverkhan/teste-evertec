import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthServiceService } from './auth-server.service';
import { Router } from '@angular/router';

describe('AuthServerService', () => {
  let service: AuthServiceService;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthServiceService,
        {
          provide: Router,
          useValue: { navigate: jest.fn() },
        },
      ],
    });

    service = TestBed.inject(AuthServiceService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize token as null', () => {
    expect(service.token()).toBeNull();
  });

  it('should make HTTP GET request on logar', () => {
    const usuario = 'testuser';
    const senha = 'password123';

    service.logar(usuario, senha).subscribe();

    const req = httpMock.expectOne('http://localhost:4000/mock/login');
    expect(req.request.method).toBe('GET');
  });

  it('should set token and navigate on successful login', (done) => {
    const usuario = 'testuser';
    const senha = 'password123';
    const mockResponse = { usuario: 'testuser', senha: 'password123' };

    service.logar(usuario, senha).subscribe({
      next: () => {
        expect(service.token()).toBe('logado');
        expect(router.navigate).toHaveBeenCalledWith(['/']);
        done();
      },
    });

    const req = httpMock.expectOne('http://localhost:4000/mock/login');
    req.flush(mockResponse);
  });

  it('should throw error when usuario does not match', (done) => {
    const usuario = 'testuser';
    const senha = 'password123';
    const mockResponse = { usuario: 'otheruser', senha: 'password123' };

    service.logar(usuario, senha).subscribe({
      error: (error) => {
        expect(error.message).toContain('Usuário ou senha inválidos');
        done();
      },
    });

    const req = httpMock.expectOne('http://localhost:4000/mock/login');
    req.flush(mockResponse);
  });

  it('should handle HTTP errors', (done) => {
    const usuario = 'testuser';
    const senha = 'password123';

    service.logar(usuario, senha).subscribe({
      error: (error) => {
        expect(error).toBeTruthy();
        done();
      },
    });

    const req = httpMock.expectOne('http://localhost:4000/mock/login');
    req.error(new ErrorEvent('Network error'));
  });
});
