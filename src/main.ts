import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideRouter } from '@angular/router'; // Import provideRouter
import { routes } from './app/app.routes'; // Importar las rutas
import { appConfig } from './app/app.config'; // Importar appConfig
import $ from 'jquery'; // Import jQuery para usar en el proyecto
import 'bootstrap'; // Import Bootstrap para usar en el proyecto

// Hacer jQuery disponible globalmente
(window as any).$ = $;
(window as any).jQuery = $;

bootstrapApplication(App, {
  providers: [
    provideRouter(routes), // Configurar el enrutamiento
    { provide: 'appConfig', useValue: appConfig } // Proveer appConfig como un valor
  ]
})
.catch((err) => console.error(err));
