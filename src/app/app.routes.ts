import { Routes } from '@angular/router';

//COMPONENTES
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Home } from './components/home/home';
import { UserEdit } from './components/user-edit/user-edit';
import { Users } from './components/users/users';
import { Timeline } from './components/timeline/timeline';
import { Publications } from './components/publications/publications';
import { Profile } from './components/profile/profile';
import { Following } from './components/following/following';
import { Followed } from './components/followed/followed';

import { UserGuard } from './services/user.guard';

//RUTAS
export const routes: Routes = [
  
  { path: 'home',component: Home },
  { path: 'login',component: Login },
  { path: 'register',component: Register },
  { path: 'mis-datos',component: UserEdit, canActivate:[UserGuard] },
  { path: 'users/:page',component: Users,canActivate:[UserGuard] },
  { path: 'timeline', component: Timeline, canActivate:[UserGuard]},
  { path: 'publications', component: Publications, canActivate:[UserGuard]},
  { path: 'perfil/:id', component: Profile, canActivate:[UserGuard]},
  { path: 'siguiendo/:id/:page', component: Following, canActivate:[UserGuard]},
  { path: 'seguidores/:id/:page', component: Followed, canActivate:[UserGuard]},
  
  // Ruta para el módulo de mensajes
  {
    // Ruta padre para acceder al módulo de mensajes
    path: 'mensajes',
  
    // Lazy loading: carga el módulo MessagesModule solo cuando el usuario navega a /mensajes
    loadChildren: () =>
      import('./components/messages/messages.module') // Importa dinámicamente el módulo desde esta ruta
        .then(m => m.MessagesModule),                 // Obtiene el módulo MessagesModule exportado
        canActivate:[UserGuard]
  },

  //ruta por defecto
  { path: '', redirectTo: '/home', pathMatch: 'full' },
    //Manejo de rutas no encontradas
  { path: '**', redirectTo: '/home' }
  
];
