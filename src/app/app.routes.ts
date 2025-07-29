import { Routes } from '@angular/router';

//COMPONENTES
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Home } from './components/home/home';
import { UserEdit } from './components/user-edit/user-edit';
import { Users } from './components/users/users';
import { Timeline } from './components/timeline/timeline';
import { Publications } from './components/publications/publications';

//RUTAS
export const routes: Routes = [
  
  { path: 'home',component: Home },
  { path: 'login',component: Login },
  { path: 'register',component: Register },
  { path: 'mis-datos',component: UserEdit },
  { path: 'users/:page',component: Users },
  { path: 'timeline', component: Timeline},
  { path: 'publications', component: Publications},

  //ruta por defecto
  { path: '', redirectTo: '/home', pathMatch: 'full' },
    //Manejo de rutas no encontradas
  { path: '**', redirectTo: '/home' }
  
];
