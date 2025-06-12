import { Injectable } from '@angular/core'; // Importa el decorador Injectable para permitir la inyección de dependencias.
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Importa HttpClient para realizar solicitudes HTTP y HttpHeaders para configurar los encabezados de las solicitudes.
import { Observable } from 'rxjs'; // Importa Observable para manejar las respuestas asíncronas.
import { User } from '../models/user.model'; // Importa el modelo User que define la estructura de un usuario.
import { global } from './global'; // Importa la configuración global, que incluye la URL base de la API.

@Injectable() // Marca la clase como un servicio que puede ser inyectado en otros componentes o servicios.
export class UserService {
    public url: string; // Declara una propiedad para almacenar la URL base de la API.
    public identity: User | undefined; // Declara una propiedad para almacenar la identidad del usuario (opcional).
    public token: any; // Declara una propiedad para almacenar el token de autenticación (opcional).

    constructor(
        private _http: HttpClient // Inyecta HttpClient en el constructor para poder realizar solicitudes HTTP.
    ) {
        this.url = global.url; // Asigna la URL base de la API desde la configuración global.
    }

    register(user: User): Observable<any> { // Método para registrar un nuevo usuario, recibe un objeto User y devuelve un Observable.
        let params = JSON.stringify(user); // Convierte el objeto user en una cadena JSON.
        let headers = new HttpHeaders().set('Content-Type', 'application/json'); // Configura los encabezados de la solicitud, indicando que el contenido es JSON.

        return this._http.post(this.url + 'register', params, { headers: headers }); // Realiza una solicitud POST a la URL de registro, enviando los parámetros y los encabezados configurados.
    }
}