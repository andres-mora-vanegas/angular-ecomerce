import { Component, OnInit } from "@angular/core";
import { map } from "rxjs/operators";
import {
  Breakpoints,
  BreakpointState,
  BreakpointObserver
} from "@angular/cdk/layout";
import { CategoryModel } from "../../core/product/category.model";
import { AppService } from "./../../app.service";

@Component({
  selector: "app-shared/dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  subLevels: Array<CategoryModel>;
  subLevelId: number;
  categoryId: number;
  active: boolean;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private appService: AppService
  ) {}

  ngOnInit(): void {
    this.reset();
  }

  reset() {
    this.active = false;
    this.subLevels = new Array<CategoryModel>();
    this.categoryId = 0;
    this.subLevelId = 0;
  }

  findSubLevel($event) {    
    try {
      if ($event.subLevels && $event.categoryId) {
        this.subLevels = $event.subLevels;
        this.categoryId = $event.categoryId;
        this.active = true;
      } else {
        this.reset();
      }
      console.log($event);
    } catch (error) {
      this.appService.doCatch(error);
    }
  }

  findSubLevelSecond($event) {
    /* if ($event.subLevels && $event.categoryId) {
      this.subLevels = $event.subLevels;
      this.categoryId = $event.categoryId;
      this.active = true;
    } else {
      this.reset();
    } */
    this.subLevelId = $event.subLevelId;
    console.log($event);
  }
}
