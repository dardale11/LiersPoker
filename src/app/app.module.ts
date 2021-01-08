import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChooseCardsComponent } from './components/choose-cards/choose-cards.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatDialog,
  MatDialogModule
} from '@angular/material';
import { PlayerService } from './services/player.service';
import { HttpClient, HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { HttpService } from './services/http.service';
import { TableComponent } from './components/table/table.component';
@NgModule({
  declarations: [
    AppComponent,
    ChooseCardsComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    HttpClientJsonpModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  exports: [
    MatDialogModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
  ],
  providers: [
    HttpClient,
    PlayerService,
    CookieService,
    HttpService
  ],
  entryComponents: [ ChooseCardsComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export class MaterialModule { }
