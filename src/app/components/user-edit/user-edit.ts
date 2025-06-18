import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UploadService } from '../../services/upload.service'; 
import { global } from '../../services/global';

@Component({
  selector: 'app-user-edit',
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './user-edit.html',
  styleUrl: './user-edit.css',
  providers: [UserService, UploadService]
})
export class UserEdit implements OnInit{
  // Propiedades del componente
  public title: any;           // Título que se muestra en la página
  public user: User;           // Objeto usuario que se está editando
  public identity: any;        // Datos del usuario autenticado (copia de user)
  public token: any;           // Token de autenticación
  public status: any;          // Estado de la operación ('success' o 'error')
  public url: any;             // URL base de la API
  public filesToUpload: any;   // Array de archivos seleccionados para subir

  constructor(
    private _userService: UserService,    // Servicio para operaciones de usuario
    private _router: Router,              // Router para navegación
    private _uploadService: UploadService // Servicio para subir archivos
  ){
    // Inicialización de propiedades en el constructor
    this.title = 'Actualizar mis datos';                    // Título de la página
    this.user = this._userService.getIdentity();            // Obtener datos del usuario desde localStorage
    this.identity = this.user;                              // Crear copia de los datos del usuario
    this.token = this._userService.getToken();              // Obtener token desde localStorage
    this.url = global.url;                                  // Obtener URL base desde configuración global
  }

  ngOnInit(): void {
    // Método que se ejecuta cuando el componente se inicializa
    console.log('user-edit.Component cargado!!');
  }

  onSubmit(form: any){
    // Método que se ejecuta cuando se envía el formulario
    console.log(this.user); // Mostrar datos del usuario en consola
    
    // Llamar al servicio para actualizar los datos del usuario
    this._userService.updateUser(this.user).subscribe(
      response => {
        // Si la respuesta no contiene un usuario, hay un error
        if (!response.user) {
          this.status = 'error';
        } else {
          // Si la actualización fue exitosa
          this.status = 'success';
          
          // Actualizar los datos del usuario en localStorage
          localStorage.setItem('identity', JSON.stringify(this.user));
          this.identity = this.user;

          // SUBIDA DE IMAGEN DE USUARIO
          // Solo subir imagen si hay archivos seleccionados
          if (this.filesToUpload && this.filesToUpload.length > 0) {
            // Llamar al servicio de upload para subir la imagen
            this._uploadService.makeFileRequest(
              this.url + 'upload-image-user/' + this.user._id,  // URL del endpoint
              [],                                               // Parámetros adicionales (vacío)
              this.filesToUpload,                              // Archivos a subir
              this.token,                                      // Token de autenticación
              'image'                                          // Nombre del campo en FormData
            ).subscribe({
              next: (response) => {
                // Si la subida fue exitosa
                console.log('Archivo subido exitosamente:', response);
                
                // Actualizar la imagen del usuario con la respuesta del servidor
                this.user.image = response.user.image;
                
                // Actualizar el localStorage con la nueva información del usuario
                localStorage.setItem('identity', JSON.stringify(this.user));
                this.identity = this.user;
              },
              error: (error) => {
                // Si hubo un error en la subida
                console.error('Error al subir archivo:', error);
                this.status = 'error';
              }
            });
          }
        }
      },
      error => {
        // Si hubo un error en la actualización del usuario
        var errorMessage = <any>error;
        console.log(errorMessage);
        
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    )
  }

  fileChangeEvent(fileInput: any){
    // Método que se ejecuta cuando se selecciona un archivo en el input
    // Guarda los archivos seleccionados en la propiedad filesToUpload
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log('Archivos seleccionados:', this.filesToUpload);
  }
}
