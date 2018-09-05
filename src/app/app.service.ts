import { Injectable } from "@angular/core";
import { HttpClientModule, HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AppService {
  constructor(private http: HttpClient) {}

  /**
   * método que se encarga de consultar vía get un api
   * @param url url que consultará la petición http
   */
  doGet(url) {
    return this.http.get(url).toPromise();
  }

  /**
   * método que se encarga de manejar los errores de toda la aplicación
   * @param error error que se recibe
   */
  doCatch(error) {
    console.log(error);
  }
}
