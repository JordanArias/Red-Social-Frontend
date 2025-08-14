// Importaciones necesarias para el enrutamiento
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importación de los componentes que se utilizarán en las rutas
import { Add } from './components/add/add';
import { Main } from './components/main/main';
import { Received } from './components/received/received';
import { Sended } from './components/sended/sended';

// Definición de las rutas para el módulo de mensajes
export const messagesRoutes: Routes = [
    {
        path: '', // Ruta principal para acceder a los mensajes. se pone '' porque la ruta padre es 'mensajes' que esta en app.routes.ts
        component: Main, // Componente que se carga al acceder a la ruta 'mensajes'
        children: [ // Rutas hijas que se cargarán dentro del componente Main
            { path: '', redirectTo: 'recibidos', pathMatch: 'full' }, // Redirige a 'recibidos' si no se especifica ninguna ruta
            { path: 'enviar', component: Add }, // Ruta para enviar mensajes
            { path: 'recibidos', component: Received }, // Ruta para ver mensajes recibidos
            { path: 'recibidos/:page', component: Received }, // Ruta para ver mensajes recibidos
            { path: 'enviados', component: Sended }, // Ruta para ver mensajes enviados
            { path: 'enviados/:page', component: Sended } // Ruta para ver mensajes enviados
        ]
    }
];

// Decorador NgModule para configurar el módulo de enrutamiento
// @NgModule({
//     imports: [
//         RouterModule.forChild(messagesRoutes) // Importa las rutas definidas
//     ],
//     exports: [
//         RouterModule // Exporta RouterModule para que esté disponible en otros módulos
//     ]
// })
// export class MessagesRoutingModule {} // Exporta el módulo de enrutamiento