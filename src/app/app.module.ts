import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ExpensesListComponent } from './components/expenses-list/expenses-list.component';
import { CreationFormComponent } from './creation-form/creation-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ExpensesListComponent,
    CreationFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
