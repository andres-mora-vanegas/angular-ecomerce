import { BrandModel } from './../brand.model';
import { AppService } from './../../../app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  arrBrand: Array<BrandModel>;

  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {
    this.reset();
  }

  reset() {
    this.arrBrand = new Array<BrandModel>();
    this.getBrands();
  }

  getBrands() {
    const url = 'brand';
    this.appService.doGet(url)
      .then((r: Array<BrandModel>) => {
        this.arrBrand = r;
      })
      .catch(error => this.appService.doCatch(error));
  }
}
