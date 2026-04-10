import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServerService } from '../../shared/services/auth-server.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthServerService);
  estaAutenticado = false;

  formulario = this.fb.group({
    nome: ['', Validators.required],
    senha: ['', Validators.required],
  });

  logar() {
    this.authService
      .logar(this.formulario.value.nome!, this.formulario.value.senha!)
      .subscribe({
        next: () => {
          this.estaAutenticado = false;
        },
        error: (erro) => {
          this.estaAutenticado = true;
        },
      });
  }
}
