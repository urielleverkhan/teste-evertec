import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthServiceService } from '../../shared/services/auth-server.service';
import { of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthServiceService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, HttpClientTestingModule],
      providers: [AuthServiceService],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthServiceService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.formulario.get('nome')?.value).toBe('');
    expect(component.formulario.get('senha')?.value).toBe('');
  });

  it('should mark form as invalid when empty', () => {
    expect(component.formulario.valid).toBeFalsy();
  });

  it('should mark form as valid when filled with values', () => {
    component.formulario.patchValue({
      nome: 'testuser',
      senha: 'password123',
    });

    expect(component.formulario.valid).toBeTruthy();
  });

  it('should set eInvalido to false on successful login', (done) => {
    component.formulario.patchValue({
      nome: 'testuser',
      senha: 'password123',
    });

    const mockResponse = { usuario: 'testuser', senha: 'password123' };
    jest.spyOn(authService, 'logar').mockReturnValue(of(mockResponse));

    component.logar();

    setTimeout(() => {
      expect(component.eInvalido).toBeFalsy();
      done();
    }, 100);
  });

  it('should set eInvalido to true on login error', (done) => {
    component.formulario.patchValue({
      nome: 'testuser',
      senha: 'wrongpassword',
    });

    jest
      .spyOn(authService, 'logar')
      .mockReturnValue(throwError(() => new Error('Unauthorized')));

    component.logar();

    setTimeout(() => {
      expect(component.eInvalido).toBeTruthy();
      done();
    }, 100);
  });

  it('should call authService.logar with correct parameters', () => {
    const spyLogar = jest.spyOn(authService, 'logar').mockReturnValue(of({}));

    component.formulario.patchValue({
      nome: 'testuser',
      senha: 'password123',
    });

    component.logar();

    expect(spyLogar).toHaveBeenCalledWith('testuser', 'password123');
  });

  it('should require nome field', () => {
    const nomeControl = component.formulario.get('nome');
    nomeControl?.setValue('');
    expect(nomeControl?.hasError('required')).toBeTruthy();
  });

  it('should require senha field', () => {
    const senhaControl = component.formulario.get('senha');
    senhaControl?.setValue('');
    expect(senhaControl?.hasError('required')).toBeTruthy();
  });
});
