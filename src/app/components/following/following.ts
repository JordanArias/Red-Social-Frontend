import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Follow } from '../../models/follow.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { global } from '../../services/global';
import { FollowService } from '../../services/follow.service';
import { Sidebar } from '../sidebar/sidebar'; 
import { error } from 'jquery';

@Component({
  selector: 'app-following',
  imports: [RouterModule,FormsModule, CommonModule, HttpClientModule, Sidebar],
  templateUrl: './following.html',
  styleUrl: './following.css',
  providers: [UserService, FollowService]
})
export class Following {
  // Propiedades del componente
  public title: any;           // Título que se muestra en la página
  public user: User;           // Objeto usuario que se está editando
  public identity: any;        // Datos del usuario autenticado (copia de user)
  public token: any;           // Token de autenticación
  public url: any;             // URL base de la API
  public page: any;
  public next_page: any;
  public prev_page: any;
  public status:any;
  public userPageId:any;

  constructor(
    private _userService: UserService,    // Servicio para operaciones de usuario
    private _followService: FollowService, // Servicio para operaciones de follow
    private _route: ActivatedRoute,              // Router para navegación
    private _router: Router              // Router para navegación
  ){
    // Inicialización de propiedades en el constructor
    this.title = 'Usuarios seguidos por ';                    // Título de la página
    this.user = this._userService.getIdentity();            // Obtener datos del usuario desde localStorage
    this.identity = this.user;                              // Crear copia de los datos del usuario
    this.token = this._userService.getToken();              // Obtener token desde localStorage
    this.url = global.url;                                  // Obtener URL base desde configuración global
  }


  ngOnInit(): void {
    // Método que se ejecuta cuando el componente se inicializa
    console.log('Following.Component cargado!!');
    this.actualPage();
  }

  
  actualPage() {
    // Suscribirse a los parámetros de la ruta para obtener el número de página
    this._route.params.subscribe(params => {
      let page = +params['page']; // Convertir el parámetro 'page' a un número
      let user_id = params['id'];

      this.userPageId = user_id;

      this.page = page; // Asignar el número de página a la propiedad 'page'

      // Si no se proporciona un número de página, establecerlo en 1
      if (!page) {
        page = 1;
      } else {
        // Calcular la siguiente y la página anterior
        this.next_page = page + 1; // La siguiente página es la actual más uno
        this.prev_page = page - 1; // La página anterior es la actual menos uno

        // Si la página anterior es menor o igual a 0, establecerla en 1
        if (this.prev_page <= 0) {
          this.prev_page = 1;
        }
      }

      this.getUser(user_id, page);

    });
  }


  /* 
  *********************************************************
  * [GET-USERS] FUNCION PARA OBTENER TODOS LOS USARIOS 
  *********************************************************
  */
  total:any; pages:any;
  following:any; follows:any;
  users:User[] | undefined; 
  getFollows(user_id:any, page: any) {
    
    // Llamar al servicio para obtener los usuarios de la página especificada
    this._followService.getFollowing(this.token, user_id, page).subscribe(
      response => {
        // Verificar si la respuesta contiene usuarios
        if (!response.followingUsers) {
          this.status = 'error'; // Si no hay usuarios, establecer el estado en 'error'
        } else {
          console.log(response); // Imprimir la respuesta en la consola
          this.total = response.total; // Almacenar el total de usuarios
          this.pages = response.pages; // Almacenar el número total de páginas
          this.following = response.followingUsers; // Almacenar la lista de usuarios
          this.follows = response.users_following; //Almacenar lista de usuarios que sigue 
          console.log(this.follows);

          // Si la página actual es mayor que el total de páginas, redirigir a la primera página
          if (page > this.pages) {
            this._router.navigate(['/users', 1]);
          }
          
        }
      },
      error => {
        var errorMessage = <any>error; // Capturar el error
        console.log(errorMessage); // Imprimir el error en la consola

        // Si hay un error, establecer el estado en 'error'
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    );
  }

  getUser(user_id:any, page:any){
    this._userService.getUser(user_id).subscribe(
      response => {
        if (response.user) {
          this.user = response.user;
          
          // Llamar a la función para obtener el listado de usuarios
          this.getFollows(user_id, page);
        }else {
          this._router.navigate(['/home']);
        }
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

  followUserOver:any;
  mouseEnter(user_id:any){
    this.followUserOver = user_id;
  }
  mouseLeave(user_id:any){
    this.followUserOver = 0;
  }

  followUser(followed:any){
    var follow = new Follow('', this.identity._id, followed)
    this._followService.addFollow(this.token, follow).subscribe(
      response =>{
        if (!response.follow) {
          this.status = 'error';
        }else{
          this.status = 'success';
          this.follows.push(followed);
        }
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

  unfollowUser(followed:any){
    this._followService.deleteFollow(this.token, followed).subscribe(
      response =>{
        var search = this.follows.indexOf(followed);
        if (search != -1) {
          this.follows.splice(search, 1);
        }
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
