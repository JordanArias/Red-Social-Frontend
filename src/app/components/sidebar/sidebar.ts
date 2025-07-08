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
import { error, param } from 'jquery';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule,FormsModule, CommonModule, HttpClientModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
  providers: [UserService, UploadService, FollowService]
})
export class Sidebar implements OnInit{
  // Propiedades del componente
  public title: any;           // Título que se muestra en la página
  public user: User;           // Objeto usuario que se está editando
  public identity: any;        // Datos del usuario autenticado (copia de user)
  public token: any;           // Token de autenticación
  public url: any;             // URL base de la API
  public stats:any;

  constructor(
    private _userService: UserService,    // Servicio para operaciones de usuario
    private _followService: FollowService, // Servicio para operaciones de follow
    private _route: ActivatedRoute,              // Router para navegación
    private _router: Router,              // Router para navegación
    private _uploadService: UploadService // Servicio para subir archivos
  ){
    // Inicialización de propiedades en el constructor
    this.title = 'sidebar';                    // Título de la página
    this.user = this._userService.getIdentity();            // Obtener datos del usuario desde localStorage
    this.identity = this.user;                              // Crear copia de los datos del usuario
    this.token = this._userService.getToken();              // Obtener token desde localStorage
    this.url = global.url;                                  // Obtener URL base desde configuración global
    this.stats =this._userService.getStast(); 
  }

  ngOnInit(): void {
      console.log(this.title);
      
  }
}
