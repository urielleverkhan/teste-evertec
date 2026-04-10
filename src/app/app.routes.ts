import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { authGuard } from './guard/auth.guard';
import { LoginComponent } from './componentes/login/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
];
