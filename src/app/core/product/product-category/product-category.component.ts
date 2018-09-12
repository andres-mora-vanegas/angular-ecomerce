import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { Input } from '@angular/core';
import { AppService } from './../../../app.service';
import { CategoryModel } from './../category.model';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit, OnChanges {
  @Input()
  categoryId: number;
  @Input()
  subLevelIn: Array<CategoryModel>;
  @Output()
  subLevelOut = new EventEmitter<any>();
  auto: number;
  categoryIdInitial: any;
  placeholder: string;
  arrCategoryModel: Array<CategoryModel>;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.placeholder = 'Categoría';
    this.auto = 0;
    this.arrCategoryModel = new Array<CategoryModel>();
    this.getCategories(r => this.validCategory(r));
  }

  /**
   * método que se encarga de validar si viene o no la categoría
   * @param r respuesta del api que contiene las categorías
   */
  validCategory(r) {
    try {
      if (this.categoryId == null) {
        this.arrCategoryModel = r.categories;
      } else {
        this.placeholder = 'Sub nivel';
        this.arrCategoryModel = this.subLevelIn;
      }
    } catch (error) {
      this.appService.doCatch(error);
    }
  }

  /**
   * método que se encarga de consultar las categorías disponibles
   * @param cb callback que ejecuta la validación si está
   * o no presente la categoría
   */
  getCategories(cb) {
    const url = './assets/data/categories.json';
    this.appService
      .doGet(url)
      .then((r: Array<CategoryModel>) => {
        cb(r);
      })
      .catch(this.appService.doCatch);
  }

  findSubLevels($event) {
    try {
      const value_ = $event.value.split('-')[0];
      this.subLevelOut.emit({});
      let response = [];
      this.arrCategoryModel.forEach((element: CategoryModel) => {
        if (value_ === element.id) {
          if (element.sublevels != null) {
            response = element.sublevels;
          }
        }
      });
      if (response != null) {
        setTimeout(() => {
          try {
            let obj = {};
            if (this.categoryId == null) {
              obj = { categoryId: value_, subLevels: response };
            } else {
              obj = { subLevelId: value_, subLevels: response };
            }
            this.subLevelOut.emit(obj);
            this.auto++;
          } catch (error) {
            this.appService.doCatch(error);
          }
        }, 500);
      }
    } catch (error) {
      this.appService.doCatch(error);
    }
  }

  /**
   * método que se ejecuta cuando se cambia la opción del desplegable
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges) {
    try {
      // console.log(changes);
      /* if (changes.accountName.currentValue.length > 0) {
        this.accountNameSend = changes.accountName.currentValue;
        this.reset();
        this.active = true;
        this.getSubAccounts();
      } */
    } catch (error) {
      this.appService.doCatch(error);
    }
  }
}
