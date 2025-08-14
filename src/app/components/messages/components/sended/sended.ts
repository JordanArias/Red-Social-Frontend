import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// MODELS
import { User } from '../../../../models/user.model';
import { Follow } from '../../../../models/follow.model';
import { Message } from '../../../../models/message.model';
// SERVICIOS
import { UserService } from '../../../../services/user.service';
import { MessageService } from '../../../../services/message..service';
import { FollowService } from '../../../../services/follow.service';
import { global } from '../../../../services/global';
import moment from 'moment';

@Component({
  selector: 'app-sended',
  imports: [FormsModule, CommonModule, HttpClientModule, RouterModule],
  templateUrl: './sended.html',
  styleUrl: './sended.css',
  providers: [UserService, FollowService, MessageService]
})
export class Sended implements OnInit{
  public title:string;
  public messages: any;
  public identity: any;        // Datos del usuario autenticado (copia de user)
  public token: any;           // Token de autenticación
  public url: any;             // URL base de la API
  public page: any;
  public next_page: any;
  public prev_page: any;
  public status:any;
  public follows:any;

  constructor(
    private _route: ActivatedRoute,          // Router para navegación
    private _router: Router,                // Router para navegación
    private _userService: UserService,      // Servicio para operaciones de user
    private _followService: FollowService, // Servicio para operaciones de follow
    private _messageService: MessageService, // Servicio para operaciones de message
  ){
    this.title = 'Mensajes Enviados';
    this.identity = this._userService.getIdentity();            // Obtener datos del usuario desde localStorage
    this.token = this._userService.getToken();              // Obtener token desde localStorage
    this.url = global.url;     
    // this.message = new Message('','','','',this.identity,'');

  }


  ngOnInit(){
    console.log('sended.comnponent cargado...');
    this.actualPage();
  }
  
  actualPage() {
    // Suscribirse a los parámetros de la ruta para obtener el número de página
    this._route.params.subscribe(params => {
      let page = +params['page']; // Convertir el parámetro 'page' a un número

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

      this.getMessages(this.token, this.page);

    });
  }

  total:any; pages:any;
  getMessages(token:any, page:any){
    this._messageService.getEmmitMessages(token, page).subscribe(
      response => {
        if (!response.messages) {
          
        }else{
          this.messages = response.messages;
          this.total = response.total; // Almacenar el total de usuarios
          this.pages = response.pages; // Almacenar el número total de páginas

        }
        
      },
      error => {
        const errorMessage = <any>error
        console.log('errorMessage: ',errorMessage);

        if (errorMessage !=null) {
          this.status = 'error';
        }
      }
    )
  }

  getTimeAgo(date: string) {
    return moment(date).fromNow();
  }
  
}