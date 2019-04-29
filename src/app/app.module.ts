import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';

import {MaterialDesignModule} from './material-design/material-design.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DictionaryComponent } from './Dictionary/dictionary.component';

import { ApiService } from './api.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddBlogComponent } from './add-dictionary/add-dictionary.component';
import {ToastModule} from 'ng2-toastr/ng2-toastr' ;
import { RouterModule, Routes } from '@angular/router';
import {FileUploadModule} from 'ng2-file-upload';
import {ContentPipe} from './content-pipe';
import { NgProgressModule } from 'ngx-progressbar';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { LoginComponent } from './login/login.component';
const appRoutes: Routes = [
  {path : '' , component : LoginComponent },
  {path : 'dictionary' , component : DictionaryComponent },
  {path : 'addDictionary' , component : AddBlogComponent },
  {path : 'editDictionary' , component : AddBlogComponent }

] ;

@NgModule({
  declarations: [
    AppComponent,
    DictionaryComponent,
    AddBlogComponent,
    ContentPipe,
    LoginComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes, {useHash : true}
    ),
    RichTextEditorAllModule,
    NgProgressModule,
    BrowserModule,
    MaterialDesignModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule.forRoot(),
    FileUploadModule,
    PdfViewerModule


  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
