import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Follow } from '../../models/follow.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UploadService } from '../../services/upload.service'; 
import { global } from '../../services/global';
import { FollowService } from '../../services/follow.service';
import { Publication } from '../../models/publication.model';
import { error, param } from 'jquery';
import { Sidebar } from '../sidebar/sidebar'; 

@Component({
  selector: 'app-timeline',
  imports: [RouterModule,FormsModule, CommonModule, HttpClientModule,Sidebar],
  templateUrl: './timeline.html',
  styleUrl: './timeline.css',
  providers: [UserService, UploadService, FollowService]
})
export class Timeline implements OnInit{
  // Propiedades del componente
  public title: any;           // Título que se muestra en la página
  public identity: any;        // Datos del usuario autenticado (copia de user)
  public token: any;           // Token de autenticación
  public url: any;             // URL base de la API

  constructor(
    private _userService: UserService,    // Servicio para operaciones de usuario
    private _followService: FollowService, // Servicio para operaciones de follow
    private _route: ActivatedRoute,              // Router para navegación
    private _router: Router,              // Router para navegación
    private _uploadService: UploadService // Servicio para subir archivos
  ){
        // Inicialización de propiedades en el constructor
        this.title = 'Timeline';                    // Título de la página
        this.identity = this._userService.getIdentity();            // Obtener datos del usuario desde localStorage
        this.token = this._userService.getToken();              // Obtener token desde localStorage
        this.url = global.url;                                  // Obtener URL base desde configuración global
  }

  ngOnInit(): void {
      console.log('Timeline.component cargado correctamente!');
      
  }

}
