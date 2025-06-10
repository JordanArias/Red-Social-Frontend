import { Routes } from '@angular/router';

//COMPONENTES
import { Login } from './components/login/login';
import { Register } from './components/register/register';

//RUTAS
export const routes: Routes = [
  { path: 'login',component: Login },
  { path: 'register',component: Register },
  //ruta por defecto
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  //Manejo de rutas no encontradas
  { path: '**', redirectTo: '/login' }
];
