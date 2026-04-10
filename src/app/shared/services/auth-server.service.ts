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
export class AuthServiceService {
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly urlBase = 'http://localhost:4000/mock/';
  token = signal<string | null>(null);

  logar(usuario: string, senha: string) {
    console.log(usuario, senha);

    return this.httpClient.get<Login>(this.urlBase + 'login').pipe(
      tap({
        next: (retorno: Login) => {
          console.log(retorno);
          if (usuario == retorno.usuario) {
            console.log('logou');
            this.token.set('logado');
            sessionStorage.setItem('token', 'logado');
            this.router.navigate(['/']);
            return 'Ok';
          } else {
            console.log('erro service');
            throw new Error('Usuário ou senha inválidos');
          }
        },
        error: (error) => {
          throw new Error(error);
        },
      }),
    );
  }
}
