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
    this.BASE = 'http://192.168.0.6:8000/';
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



  /**
   * método que se encarga de manejar los errores de toda la aplicación
   * @param error error que se recibe
   */
  doCatch(error) {
    console.log(error);
    this.snack(this.GENERAL_MESSAGE + JSON.stringify(error.error));
  }

  handleError(error) {
    console.log(error);
  }

  /**
   * método que se encarga de mostar un mensaje tipo notificación inferior.
   * @param message string que contiene el mensaje
   * @param action
   */
  public snack(message, action = null) {
    let options = {};
    if (action == null) {
      options = {
        duration: 4000
      };
    }
    if (message instanceof Object) {
      message = JSON.stringify(message);
    }
    this.snackBar.open(message, action, options);
  }

  public doModal(message: any) {
    console.log(message);
  }
}
