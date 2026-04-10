import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { Usuario } from '../../interfaces/usuario-interface';

@Injectable({
  providedIn: 'root',
})
export class HttpServerService {
  private readonly httpClient = inject(HttpClient);
  public usuarios = signal<Usuario[]>([]);
  private readonly urlBase = 'http://localhost:4000/mock/';
  getUsuarios() {
    return this.httpClient
      .get<Usuario[]>(this.urlBase + 'usuarios/listar')
      .pipe(
        tap({
          next: (retorno: Usuario[]) => {
            this.usuarios.set(retorno);
            console.log(this.usuarios());
          },
          error: (error) => {
            throw new Error(error);
          },
        }),
      );
  }

  getUsuariosPorId(id: number) {
    return this.httpClient
      .get<Usuario>(this.urlBase + `usuario/procurar?id=${id}`)
      .pipe(
        tap({
          next: (retorno: Usuario) => {
            this.usuarios.set([retorno]);
            console.log(this.usuarios());
          },
          error: (error) => {
            throw new Error(error);
          },
        }),
      );
  }
}
