import { Routes } from '@angular/router';

//COMPONENTES
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Home } from './components/home/home';
//RUTAS
export const routes: Routes = [
  { path: 'home',component: Home },
  { path: 'login',component: Login },
  { path: 'register',component: Register },

    //ruta por defecto
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    //Manejo de rutas no encontradas
    { path: '**', redirectTo: '/home' }
  
];
