import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatOption,
  MatFormField,
  MatFormFieldModule,
  MatAutocompleteModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatListModule,
  MatNativeDateModule,
  MatMenuModule,
  MatStepperModule,
  MatTooltipModule,
  MatTabsModule,
  MatTableModule,
  MatSortModule,
  MatSnackBarModule,
  MatSlideToggleModule,
  MatSliderModule,
  MatSidenavModule,
  MatSelectModule,
  MatRippleModule,
  MatRadioModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatPaginatorModule
} from '@angular/material';

const modules = [
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
  BrowserAnimationsModule
];

@NgModule({
  imports: modules,
  exports: modules,
  declarations: []
})
export class MaterialModule { }
