// messages/messages.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Add } from './components/add/add';
import { Main } from './components/main/main';
import { Received } from './components/received/received';
import { Sended } from './components/sended/sended';
import { FormsModule } from '@angular/forms';
import { routes } from '../../app.routes';
import { messagesRoutes } from './messages.routing';


@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(messagesRoutes)  // Rutas específicas del módulo mensajes
  ],
  exports: [

  ]
})
export class MessagesModule { }