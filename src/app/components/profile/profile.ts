import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Follow } from '../../models/follow.model';
import { FollowService } from '../../services/follow.service';
import { global } from '../../services/global';
import { Sidebar } from '../sidebar/sidebar'; 
import { error, param } from 'jquery';

@Component({
  selector: 'app-profile',
  imports: [RouterModule,Sidebar, CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
  providers: [UserService, FollowService]
})
export class Profile implements OnInit{
    // Propiedades del componente
    public title: any;           // Título que se muestra en la página
    public user: User;           // Objeto usuario que se está editando
    public identity: any;        // Datos del usuario autenticado (copia de user)
    public token: any;           // Token de autenticación
    public url: any;             // URL base de la API
    public stats:any;
    public follow: Follow | undefined;
    public status:any;
    
    constructor(
      private _userService: UserService,    // Servicio para operaciones de usuario
      private _followService: FollowService, // Servicio para operaciones de follow
      private _route: ActivatedRoute,              // Router para navegación
      private _router: Router             // Router para navegación

    ){
      // Inicialización de propiedades en el constructor
      this.title = 'perfil';                    // Título de la página
      this.identity = this._userService.getIdentity();            // Obtener datos del usuario desde localStorage
      this.token = this._userService.getToken();              // Obtener token desde localStorage
      this.url = global.url;                                  // Obtener URL base desde configuración global
      this.stats =this._userService.getStast(); 
      this.user = new User('', '', '', '', '', '', 'ROLE_USER', '');
    }

  ngOnInit(): void {
    console.log('Profile cargado!!');
    this.loadPage();
  }

  loadPage(){
    this._route.params.subscribe(params => {
      let id = params['id'];
      this.getUser(id);
      this.getCounters(id);
    })
  }

  getUser(id:any){
    this._userService.getUser(id).subscribe(
      response => {
        if (response.user) {
          console.log(response);
          this.user = response.user;
        }else{
          this.status = 'error';
        }
      },
      error => {
        var errorMessage = <any>error; // Capturar el error
        console.log(errorMessage); // Imprimir el error en la consola

        // Si hay un error, establecer el estado en 'error'
        if (errorMessage != null) {
          this.status = 'error';
        }

        this._router.navigate(['/perfil', this.identity._id])
      }
    )
  }

getCounters(id:any){
  this._userService.getCounters(id).subscribe(
    response => {
      console.log(response);
      
      this.stats = response;
    },
    error => {
      var errorMessage = <any>error; // Capturar el error
      console.log(errorMessage); // Imprimir el error en la consola

      // Si hay un error, establecer el estado en 'error'
      if (errorMessage != null) {
        this.status = 'error';
      }
    }
  )
}

} 

