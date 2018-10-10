import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  BASE: string;
  GENERAL_MESSAGE: string;

  constructor(private http: HttpClient, private snackBar: MatSnackBar
  ) {
    this.BASE = 'http://localhost:50000/';
    this.GENERAL_MESSAGE = 'Se presentó un error inesperado ';
  }

  /**
   * método que se encarga de consultar vía get un api
   * @param url url que consultará la petición http
   */
  doGet(url) {

    url = this.BASE + url;
    return this.http.get(url).toPromise();
  }

  doPost(url, data) {

    url = this.BASE + url;
    return this.http.post(url, data).toPromise();
  }

  doPut(url, data) {

    url = this.BASE + url;
    return this.http.put(url, data).toPromise();
  }



  /**
   * método que se encarga de manejar los errores de toda la aplicación
   * @param error error que se recibe
   */
  doCatch(error) {
    try {
      console.log(error);
      const detailMessage = (error.error != null) ? JSON.stringify(error.error) : error.message;
      this.snack(this.GENERAL_MESSAGE + detailMessage);
    } catch (error_) {
      console.log(error_);
    }

  }

  handleError(error) {
    console.log(error);
  }

  /**
   * método que se encarga de mostar un mensaje tipo notificación inferior.
   * @param message string que contiene el mensaje
   * @param action
   */
  public snack(message, action = null, delay = null) {
    let options = {};
    if (action == null) {
      options = {
        duration: 4000
      };
    }
    if (message instanceof Object) {
      message = JSON.stringify(message);
    }
    delay = (delay != null) ? delay : 0;
    setTimeout(() => {
      this.snackBar.open(message, action, options);
    }, delay);
    
  }

  public doModal(message: any) {
    console.log(message);
  }
}
