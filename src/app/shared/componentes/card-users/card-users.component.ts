import { Component, Input } from '@angular/core';
import { Usuario } from '../../../interfaces/usuario-interface';

@Component({
  selector: 'app-card-users',
  imports: [],
  templateUrl: './card-users.component.html',
  styleUrl: './card-users.component.scss',
})
export class CardUsersComponent {
  @Input() usuario: Usuario | undefined;
}
