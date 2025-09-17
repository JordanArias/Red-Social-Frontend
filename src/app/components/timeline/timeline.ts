import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { global } from '../../services/global';
import { Sidebar } from '../sidebar/sidebar'; 
import { PublicationService } from '../../services/publication.service';
import moment from 'moment';
import 'moment/locale/es'; // Importa el locale español
import { error } from 'jquery';

@Component({
  selector: 'app-timeline',
  imports: [FormsModule, CommonModule, HttpClientModule, Sidebar, RouterModule],
  templateUrl: './timeline.html',
  styleUrl: './timeline.css',
  providers: [UserService, PublicationService]
})
export class Timeline implements OnInit{
  // Propiedades del componente
  public title: any;           // Título que se muestra en la página
  public identity: any;        // Datos del usuario autenticado (copia de user)
  public token: any;           // Token de autenticación
  public url: any;             // URL base de la API
  public status:any;
  public page: any;

  constructor(
    private _userService: UserService,    // Servicio para operaciones de usuario
    private _publicationService: PublicationService,
  ){
        // Inicialización de propiedades en el constructor
        this.title = 'Publicaciones';                    // Título de la página
        this.identity = this._userService.getIdentity();            // Obtener datos del usuario desde localStorage
        this.token = this._userService.getToken();              // Obtener token desde localStorage
        this.url = global.url;                              // Obtener URL base desde configuración global
        this.page = 1;     
        // Configurar el locale a español
        moment.locale('es');                       
  }

  ngOnInit(): void {
      console.log('Timeline.component cargado correctamente!');
      this.getPublication(this.page, false);
  }

  formatDate(date: string) {
    return moment(date).format('YYYY-MM-DD HH:mm:ss'); // Cambia el formato según tus necesidades
  }
  getTimeAgo(date: string) {
    return moment(date).fromNow();
  }

  publications:any;
  total:any; pages:any; itemsPerPage:any;
  getPublication(page:any, adding:any){
    this._publicationService.getPublications(this.token, page).subscribe(
      response =>{
        
        if (response.publications) {
          this.total = response.total_items;
          this.pages = response.pages;
          this.itemsPerPage = response.itemsPerPage;

          if (!adding) {
            this.publications = response.publications;
          }else{
            var arrayA = this.publications;
            var arrayB = response.publications;
            this.publications = arrayA.concat(arrayB);

            $("html, body").animate({ scrollTop: $('body').prop('scrollHeight')},500);
          }

          if (page > this.pages) {
            // this._router.navigate(['/home']);
          }
        }else{
          this.status = 'error';
        }
        
      },
      error =>{
        var errorMessage = <any>error; // Capturar el error
        console.log(errorMessage); // Imprimir el error en la consola

        // Si hay un error, establecer el estado en 'error'
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    )
  }


 public noMore = false;
  viewMore(){
    console.log('this.publications.lenght', this.publications.length);
    console.log('total: ', this.total);
    this.page += 1;

    
    if (this.page == this.pages) {
      this.noMore = true;
      console.log('true');
    }
    this.getPublication(this.page, true);
  }


  refresh(event:any){
    console.log('Recibiendo evento en timeline'); 
    console.log(event);
    this.getPublication(1, false);
  }

  public showImage:any;
  showThisImage(id:any){
    this.showImage = id;
  }

  hideThisImage(id:any){
    this.showImage = 0;
  }

  deletePublication(id:any){
    this._publicationService.deletePublication(this.token, id).subscribe(
      response => {
        this.refresh(0);
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
