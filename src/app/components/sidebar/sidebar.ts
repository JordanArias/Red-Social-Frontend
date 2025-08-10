import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
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
import { PublicationService } from '../../services/publication.service';
import { error, param } from 'jquery';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule,FormsModule, CommonModule, HttpClientModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
  providers: [UserService, UploadService, FollowService, PublicationService]
})
export class Sidebar implements OnInit{
  // Propiedades del componente
  public title: any;           // Título que se muestra en la página
  public user: User;           // Objeto usuario que se está editando
  public identity: any;        // Datos del usuario autenticado (copia de user)
  public token: any;           // Token de autenticación
  public url: any;             // URL base de la API
  public stats:any;
  public publication: Publication;
  public status:any;

  constructor(
    private _userService: UserService,    // Servicio para operaciones de usuario
    private _followService: FollowService, // Servicio para operaciones de follow
    private _route: ActivatedRoute,              // Router para navegación
    private _router: Router,              // Router para navegación
    private _uploadService: UploadService, // Servicio para subir archivos
    private _publicationService: PublicationService
  ){
    // Inicialización de propiedades en el constructor
    this.title = 'sidebar';                    // Título de la página
    this.user = this._userService.getIdentity();            // Obtener datos del usuario desde localStorage
    this.identity = this.user;                              // Crear copia de los datos del usuario
    this.token = this._userService.getToken();              // Obtener token desde localStorage
    this.url = global.url;                                  // Obtener URL base desde configuración global
    this.stats =this._userService.getStast(); 

    this.publication = new Publication('','','','',this.identity._id);
  }

  ngOnInit(): void {
      console.log(this.title);
      
  }
  onSubmit(form:any){
    console.log(this.publication);
    this._publicationService.addPublication(this.token, this.publication).subscribe(
      response => {
        if (response.publication) {
          //this.publication = response.publication;

          //Subir imagen
          this._uploadService.makeFileRequest(this.url + 'upload-image-publication/' + response.publication._id, [], this.filestoUpload, this.token, 'image')
              .subscribe((result:any) => {
                  this.publication.file = result.image;
                  this.status = 'success';
                  form.reset();
                  this._router.navigate(['/timeline']);
              });
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
      }
    )
  }

  public filestoUpload: Array<File> = [];
  fileChangeEvent(fileInput:any){
    this.filestoUpload = <Array<File>>fileInput.target.files;
  }


  //Output
  @Output() sended = new EventEmitter();
  sendPublication(event:any){
    console.log('Enviando evento desde sidebar');
    
    console.log(event);
    
    this.sended.emit({send:'true'});
  }

}
