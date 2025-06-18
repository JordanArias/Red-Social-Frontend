/**
 * Servicio de Carga de Archivos (Upload Service)
 * 
 * Este servicio se encarga de manejar la carga de archivos al servidor.
 * Permite subir múltiples archivos usando FormData y maneja la autenticación
 * mediante tokens. Utiliza HttpClient de Angular para realizar las peticiones HTTP.
 * 
 * Funcionalidades principales:
 * - Carga de archivos múltiples
 * - Envío de parámetros adicionales
 * - Autenticación con token
 * - Manejo de respuestas asíncronas con Observables
 * 
 * Uso típico: Subir imágenes de perfil, documentos, etc.
 */
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { global } from "./global";

@Injectable()
export class UploadService{
    public url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = global.url;
    }

    /**
     * Realiza una petición HTTP para subir archivos al servidor
     * 
     * Parámetros:
     * url - URL del endpoint donde se subirán los archivos
     * params - Array de parámetros adicionales que se enviarán junto con los archivos
     * files - Array de archivos (File) que se van a subir
     * token - Token de autenticación para autorizar la petición
     * name - Nombre del campo en el FormData donde se guardarán los archivos
     * Retorna: Observable<any> - Observable que emite la respuesta del servidor
     */
    makeFileRequest(url: string, params: Array<string>, files: Array<File>, token: string, name: string): Observable<any> {
        const formData = new FormData();
        
        // Inicia un bucle que recorre cada archivo en el array de archivos que se van a subir
        for (let i = 0; i < files.length; i++) {
            // Agrega cada archivo al FormData con el nombre especificado
            // El primer parámetro (name) es la clave del campo en el FormData
            // El segundo parámetro (files[i]) es el archivo actual del array
            // El tercer parámetro (files[i].name) es el nombre original del archivo en el sistema del usuario
            formData.append(name, files[i], files[i].name);
        }

        // Verifica si existe el array de parámetros y si tiene elementos
        if (params && params.length > 0) {
            // Inicia un bucle que recorre cada parámetro en el array de parámetros adicionales
            for (let i = 0; i < params.length; i++) {
                // Agrega cada parámetro al FormData con la clave 'params'
                // Esto permite enviar datos adicionales junto con los archivos
                formData.append('params', params[i]);
            }
        }

        // Crea un objeto HttpHeaders para configurar los encabezados de la petición HTTP
        // Los encabezados contienen información adicional sobre la petición
        // Para FormData, NO se debe establecer Content-Type manualmente
        // El navegador lo establece automáticamente con el boundary correcto
        const headers = new HttpHeaders().set('Authorization', token);

        // Realiza una petición POST al servidor usando HttpClient
        // POST es el método HTTP apropiado para subir archivos y crear recursos
        // Retorna un Observable que emitirá la respuesta del servidor cuando esté disponible
        return this._http.post(url, formData, { headers: headers });
    }
}