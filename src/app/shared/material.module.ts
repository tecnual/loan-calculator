import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

const modules = [
  CommonModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatNativeDateModule,
  MatDatepickerModule,
  BrowserModule,
  FormsModule,
  ReactiveFormsModule,
  MatIconModule,
  MatButtonModule,
  MatTableModule,
  MatCardModule
];

@NgModule({
  declarations: [],
  imports: [...modules],
  exports: [...modules]
})
export class MaterialModule { }
