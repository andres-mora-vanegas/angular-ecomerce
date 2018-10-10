import { CsvService } from './../csv.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'app-csv',
  templateUrl: './csv.component.html',
  styleUrls: ['./csv.component.css']
})
export class CsvComponent implements OnInit {

  constructor(
    private domSanitizer: DomSanitizer,
    private csvService: CsvService
  ) {
    this.csvService.componentMethodCalled$.subscribe(
      (action) => {
        // this.getCSVDownloadLink(action);
      }
    );
   }

  ngOnInit() {
  }

  

}
