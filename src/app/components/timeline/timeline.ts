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
import { PublicationService } from '../../services/publication.service';

@Component({
  selector: 'app-timeline',
  imports: [RouterModule,FormsModule, CommonModule, HttpClientModule,Sidebar],
  templateUrl: './timeline.html',
  styleUrl: './timeline.css',
  providers: [UserService, UploadService, FollowService, PublicationService]
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
    private _followService: FollowService, // Servicio para operaciones de follow
    private _route: ActivatedRoute,              // Router para navegación
    private _router: Router,              // Router para navegación
    private _uploadService: UploadService, // Servicio para subir archivos
    private _publicationService: PublicationService
  ){
        // Inicialización de propiedades en el constructor
        this.title = 'Timeline';                    // Título de la página
        this.identity = this._userService.getIdentity();            // Obtener datos del usuario desde localStorage
        this.token = this._userService.getToken();              // Obtener token desde localStorage
        this.url = global.url;                              // Obtener URL base desde configuración global
        this.page = 1;                            
  }

  ngOnInit(): void {
      console.log('Timeline.component cargado correctamente!');
      this.getPublication(this.page, false);
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
    

    
    if (this.publications.length == this.total) {
      this.noMore = true;
      console.log('true');
    }else{
      this.page += 1;
      console.log('= ',this.publications.length == this.total);
      this.getPublication(this.page, true);
    }
  }

  
}
