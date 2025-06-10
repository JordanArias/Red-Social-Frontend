import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import  $ from 'jquery'; // Import jQuery para usar en el proyecto
import 'bootstrap'; // Import Bootstrap para usar en el proyecto

// Hacer jQuery disponible globalmente
(window as any).$ = $;
(window as any).jQuery = $;

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
