import { Injectable } from '@angular/core'; // Importa el decorador Injectable para permitir la inyección de dependencias.
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Importa HttpClient para realizar solicitudes HTTP y HttpHeaders para configurar los encabezados de las solicitudes.
import { Observable } from 'rxjs'; // Importa Observable para manejar las respuestas asíncronas.
import { User } from '../models/user.model'; // Importa el modelo User que define la estructura de un usuario.
import { global } from './global'; // Importa la configuración global, que incluye la URL base de la API.

@Injectable() // Marca la clase como un servicio que puede ser inyectado en otros componentes o servicios.
export class UserService {
    public url: string; // Declara una propiedad para almacenar la URL base de la API.
    public identity: any; // Declara una propiedad para almacenar la identidad del usuario (opcional).
    public token: any; // Declara una propiedad para almacenar el token de autenticación (opcional).
    public stats: any; 

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

    singup(user: User, gettoken:any): Observable<any> {
        // Crear un objeto que incluya el user y el gettoken. Ya que el modelo user.module no tiene el atributo gettoken
        const requestBody = {
            ...user,  // Spread operator para incluir todas las propiedades de user
            gettoken: gettoken
        };

        // Convertir el objeto a una cadena JSON
        let params = JSON.stringify(requestBody);

        // Configurar los encabezados
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        // Realizar la solicitud POST
        return this._http.post(this.url + 'login', params, { headers: headers });
    }

    getIdentity() {
        let identity = localStorage.getItem('identity');
        // console.log('(user.service) identity: ', identity);
        
        if (identity) {
            this.identity = JSON.parse(identity); // Convertir el string JSON a objeto
        } else {
            this.identity = null;
        }

        return this.identity;
    }

    getToken(){
        let token = localStorage.getItem('token');

        if (token != undefined) {
            this.token =token;
        }else {
            this.token = null;
        }
        return this.token;
    }

    getStast(){
        let stats = localStorage.getItem('stats');
        if (stats) {
            this.stats = JSON.parse(stats);
        }else{
            this.stats = null;
        }

        return this.stats;
    }

    getCounters(userId = null): Observable<any> {

        // Configurar los encabezados
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',this.getToken());

        if (userId != null) {
            return this._http.get(this.url + 'counters/' + userId, {headers:headers})
        }else{
            return this._http.get(this.url + 'counters', {headers:headers})
        }

    }

    updateUser(user: User): Observable<any>{
        let params =JSON.stringify(user);
        // Configurar los encabezados
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',this.getToken());

        return this._http.put(this.url + 'update-user/' + user._id, params, {headers:headers});
    }
}