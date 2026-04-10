import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../../shared/services/auth-server.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthServiceService);
  eInvalido = false;

  formulario = this.fb.group({
    nome: ['', Validators.required],
    senha: ['', Validators.required],
  });

  logar() {
    this.authService
      .logar(this.formulario.value.nome!, this.formulario.value.senha!)
      .subscribe({
        next: () => {
          this.eInvalido = false;
        },
        error: () => {
          this.eInvalido = true;
        },
      });
  }
}
