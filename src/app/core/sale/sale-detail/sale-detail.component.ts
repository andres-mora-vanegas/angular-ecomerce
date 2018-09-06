import { Component, OnInit, Input } from '@angular/core';
import { SaleDto } from '../sale.dto';

@Component({
  selector: 'app-sale-detail',
  templateUrl: './sale-detail.component.html',
  styleUrls: ['./sale-detail.component.css']
})
export class SaleDetailComponent implements OnInit {

  @Input()
  arrSaleDto: Array<SaleDto>;
  constructor() { }

  ngOnInit() {
  }

}
