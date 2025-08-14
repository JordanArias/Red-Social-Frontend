import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { messagesRoutes } from './components/messages/messages.routing'; // ✅ Importa el arreglo de rutas, no el módulo
import { provideHttpClient } from '@angular/common/http';
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(), // Proporciona manejadores de errores globales para la aplicación
    provideZoneChangeDetection({ eventCoalescing: true }),// Configura la detección de cambios en la zona
    provideRouter(routes),// Proporciona las rutas definidas en app.routes.ts
    provideHttpClient() // Proporciona el servicio HttpClient para realizar solicitudes HTTP
  ]
};
