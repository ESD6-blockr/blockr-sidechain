import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSpinner} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';

import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { FileService } from './file.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    // MatSpinner,
    BrowserModule,
    BrowserAnimationsModule, 
    NoopAnimationsModule,
    MatInputModule,
    AppRoutingModule,
  ],
  providers: [FileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
