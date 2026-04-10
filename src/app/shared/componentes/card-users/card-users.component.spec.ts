import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardUsersComponent } from './card-users.component';
import { Usuario } from '../../../interfaces/usuario-interface';

describe('CardUsersComponent', () => {
  let component: CardUsersComponent;
  let fixture: ComponentFixture<CardUsersComponent>;

  const mockUsuario: Usuario = {
    id: 1,
    nome: 'João Silva',
    idade: 25,
  };

  const mockUsuario2: Usuario = {
    id: 2,
    nome: 'Maria Santos',
    idade: 30,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardUsersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not render card section when usuario is undefined', () => {
    component.usuario = undefined;
    fixture.detectChanges();

    const section = fixture.nativeElement.querySelector('section.card-usuario');
    expect(section).toBeNull();
  });

  it('should render card section when usuario is defined', () => {
    component.usuario = mockUsuario;
    fixture.detectChanges();

    const section = fixture.nativeElement.querySelector('section.card-usuario');
    expect(section).toBeTruthy();
  });

  it('should display usuario id correctly', () => {
    component.usuario = mockUsuario;
    fixture.detectChanges();

    const section = fixture.nativeElement.querySelector('section.card-usuario');
    expect(section.textContent).toContain(mockUsuario.id.toString());
  });

  it('should display usuario nome correctly', () => {
    component.usuario = mockUsuario;
    fixture.detectChanges();

    const section = fixture.nativeElement.querySelector('section.card-usuario');
    expect(section.textContent).toContain(`Nome: ${mockUsuario.nome}`);
  });

  it('should display usuario idade correctly', () => {
    component.usuario = mockUsuario;
    fixture.detectChanges();

    const section = fixture.nativeElement.querySelector('section.card-usuario');
    expect(section.textContent).toContain(`Idade: ${mockUsuario.idade}`);
  });

  it('should render all usuario data together', () => {
    component.usuario = mockUsuario;
    fixture.detectChanges();

    const section = fixture.nativeElement.querySelector('section.card-usuario');
    expect(section.textContent).toContain('1');
    expect(section.textContent).toContain('João Silva');
    expect(section.textContent).toContain('25');
  });

  it('should update card content when usuario input changes', () => {
    component.usuario = mockUsuario;
    fixture.detectChanges();

    let section = fixture.nativeElement.querySelector('section.card-usuario');
    expect(section.textContent).toContain('João Silva');

    component.usuario = mockUsuario2;
    fixture.detectChanges();

    section = fixture.nativeElement.querySelector('section.card-usuario');
    expect(section.textContent).toContain('Maria Santos');
    expect(section.textContent).not.toContain('João Silva');
  });

  it('should hide card when usuario changes from defined to undefined', () => {
    component.usuario = mockUsuario;
    fixture.detectChanges();

    let section = fixture.nativeElement.querySelector('section.card-usuario');
    expect(section).toBeTruthy();

    component.usuario = undefined;
    fixture.detectChanges();

    section = fixture.nativeElement.querySelector('section.card-usuario');
    expect(section).toBeNull();
  });

  it('should handle usuario with large idade value', () => {
    const elderUsuario: Usuario = {
      id: 3,
      nome: 'Sr. João',
      idade: 95,
    };

    component.usuario = elderUsuario;
    fixture.detectChanges();

    const section = fixture.nativeElement.querySelector('section.card-usuario');
    expect(section.textContent).toContain('Idade: 95');
  });

  it('should handle usuario with special characters in nome', () => {
    const usuarioWithSpecialChars: Usuario = {
      id: 4,
      nome: 'João da Silva Jr.',
      idade: 28,
    };

    component.usuario = usuarioWithSpecialChars;
    fixture.detectChanges();

    const section = fixture.nativeElement.querySelector('section.card-usuario');
    expect(section.textContent).toContain('João da Silva Jr.');
  });
});
