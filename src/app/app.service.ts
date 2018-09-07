import { Injectable } from "@angular/core";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { SaleDto } from "./core/sale/sale.dto";
import { MatSnackBar } from "@angular/material";

@Injectable({
  providedIn: "root"
})
export class AppService {
  constructor(private http: HttpClient,    private snackBar: MatSnackBar
  ) {}

  /**
   * método que se encarga de consultar vía get un api
   * @param url url que consultará la petición http
   */
  doGet(url) {
    return this.http.get(url).toPromise();
  }

  /**
   * método que se encarga de guardar el array en el localStorage
   * @param init parametro que indica si el componente se carga por primera vez.
   */
  handleStorage(init = false, arrSaleDto: Array<SaleDto>) {
    try {
      /**
       * si se están guardando datos
       */
      if (init == false) {
        const jsonifyCart = JSON.stringify(arrSaleDto);
        localStorage.setItem("products", jsonifyCart);
      } else {
        /**
         * si se van a consultar los articulos ya guardados en el storage
         */
        if (localStorage.getItem("products")) {
          const previusData = localStorage.getItem("products");
          const jsonifyCart = JSON.parse(previusData);
          arrSaleDto = jsonifyCart;
        }
      }
    } catch (error) {
      this.doCatch(error);
    }
    return arrSaleDto;
  }

  /**
   * método que se encarga de manejar los errores de toda la aplicación
   * @param error error que se recibe
   */
  doCatch(error) {
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
}
