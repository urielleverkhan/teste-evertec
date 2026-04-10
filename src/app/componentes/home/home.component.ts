import { Component, inject } from '@angular/core';
import { HttpServerService } from '../../shared/services/http-server.service';
import { AsyncPipe } from '@angular/common';
import { CardUsersComponent } from '../../shared/componentes/card-users/card-users.component';

@Component({
  selector: 'app-home',
  imports: [AsyncPipe, CardUsersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly httpServer = inject(HttpServerService);
  usuarios$ = this.httpServer.getUsuarios();
  usuarios = this.httpServer.usuarios;
}
