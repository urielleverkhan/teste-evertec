import { Component, inject } from '@angular/core';
import { HttpServerService } from '../../shared/services/http-server.service';
import { AsyncPipe } from '@angular/common';
import { CardUsersComponent } from '../../shared/componentes/card-users/card-users.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../../interfaces/usuario-interface';

@Component({
  selector: 'app-home',
  imports: [AsyncPipe, CardUsersComponent, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly httpServer = inject(HttpServerService);
  usuarios$ = this.httpServer.getUsuarios();
  usuarios = this.httpServer.usuarios;

  private fb = inject(FormBuilder);

  formulario = this.fb.group({
    id: ['', Validators.required],
  });

  procurar() {
    if (this.formulario.value.id == '0') {
      this.httpServer.getUsuarios().subscribe({
        next: (usuario: Usuario[]) => {
          this.usuarios.update((currentValue) => usuario);
          console.log(this.usuarios());
        },
        error: (error) => {
          throw new Error(error);
        },
      });
    } else {
      this.httpServer
        .getUsuariosPorId(Number(this.formulario.value.id))
        .subscribe({
          next: (usuario: Usuario) => {
            this.usuarios.update((currentValue) => [usuario]);
            console.log(this.usuarios());
          },
          error: (error) => {
            throw new Error(error);
          },
        });
    }
  }
}
