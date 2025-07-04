import { Injectable } from '@angular/core'; // Importa el decorador Injectable para permitir la inyección de dependencias.
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Importa HttpClient para realizar solicitudes HTTP y HttpHeaders para configurar los encabezados de las solicitudes.
import { Observable } from 'rxjs'; // Importa Observable para manejar las respuestas asíncronas.
import { Follow } from '../models/follow.model'; // Importa el modelo User que define la estructura de un usuario.
import { global } from './global'; // Importa la configuración global, que incluye la URL base de la API.

@Injectable() // Marca la clase como un servicio que puede ser inyectado en otros componentes o servicios.
export class FollowService {
    public url: string; // Declara una propiedad para almacenar la URL base de la API.
    public identity: any; // Declara una propiedad para almacenar la identidad del usuario (opcional).
    public token: any; // Declara una propiedad para almacenar el token de autenticación (opcional).
    public stats: any; 

    constructor(
        private _http: HttpClient // Inyecta HttpClient en el constructor para poder realizar solicitudes HTTP.
    ) {
        this.url = global.url; // Asigna la URL base de la API desde la configuración global.
    }

    addFollow(token:any ,follow:any): Observable<any>{
        let params = JSON.stringify(follow);
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
        
        // Realizar la solicitud POST
        return this._http.post(this.url + 'follow', params, { headers: headers });
    }

    deleteFollow(token:any ,id:any): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
        
        // Realizar la solicitud POST
        return this._http.delete(this.url + 'follow/'+id, { headers: headers });
    }
}