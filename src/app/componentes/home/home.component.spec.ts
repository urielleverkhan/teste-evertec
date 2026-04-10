import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { HomeComponent } from './home.component';
import { HttpServerService } from '../../shared/services/http-server.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let httpServerService: HttpServerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, HttpClientTestingModule],
      providers: [HttpServerService],
    }).compileComponents();

    httpServerService = TestBed.inject(HttpServerService);
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have formulario with id control', () => {
    expect(component.formulario.get('id')).toBeDefined();
  });

  it('should mark id control as required', () => {
    const idControl = component.formulario.get('id');
    idControl?.setValue('');
    expect(idControl?.hasError('required')).toBe(true);
  });

  it('should mark id control as valid with value', () => {
    const idControl = component.formulario.get('id');
    idControl?.setValue('1');
    expect(idControl?.hasError('required')).toBe(false);
  });

  it('should call getUsuarios when procurar is called with id 0', () => {
    const getUsuariosSpy = jest
      .spyOn(httpServerService, 'getUsuarios')
      .mockReturnValue(of([]));

    component.formulario.setValue({ id: '0' });
    component.procurar();

    expect(getUsuariosSpy).toHaveBeenCalled();
  });

  it('should call getUsuariosPorId when procurar is called with valid id', () => {
    const getUsuariosPorIdSpy = jest
      .spyOn(httpServerService, 'getUsuariosPorId')
      .mockReturnValue(of({}));

    component.formulario.setValue({ id: '1' });
    component.procurar();

    expect(getUsuariosPorIdSpy).toHaveBeenCalledWith(1);
  });

  it('should update usuarios signal when getUsuarios returns data', () => {
    const mockData = [{ id: 1, nome: 'Test User' }];
    jest.spyOn(httpServerService, 'getUsuarios').mockReturnValue(of(mockData));

    component.formulario.setValue({ id: '0' });
    component.procurar();

    expect(component.usuarios()).toEqual(mockData);
  });
});
