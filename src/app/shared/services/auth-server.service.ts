import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

export interface Login {
  usuario: string;
  senha: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthServerService {
  private readonly httpClient = inject(HttpClient);
  private readonly route = inject(Router);
  private urlBase = 'http://localhost:4000/mock/';
  token = signal<string | null>(null);

  logar(usuario: string, senha: string) {
    return this.httpClient.get<Login>(this.urlBase + 'login').pipe(
      tap({
        next: (retorno: Login) => {
          alert(JSON.stringify(retorno));
          if (usuario === retorno.usuario) {
            this.token.set('logado');
            sessionStorage.setItem('token', 'logado');
            this.route.navigate(['/']);
            return 'ok';
          } else {
            throw new Error('Usuario ou senha errada');
          }
        },
        error: (error) => {
          throw new Error(error);
        },
      }),
    );
  }
}
