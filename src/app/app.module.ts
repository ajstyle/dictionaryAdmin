import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';

import {MaterialDesignModule} from './material-design/material-design.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BlogComponent } from './Blog/blog.component';

import { ApiService } from './api.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddBlogComponent } from './add-blog/add-blog.component';
import {ToastModule} from 'ng2-toastr/ng2-toastr' ;
import { RouterModule, Routes } from '@angular/router';
import {FileUploadModule} from 'ng2-file-upload';
import {ContentPipe} from './content-pipe';
const appRoutes: Routes = [
  {path : '' , component : BlogComponent },
  {path : 'addBlog' , component : AddBlogComponent },
  {path : 'editBlog' , component : AddBlogComponent }
] ;

@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    AddBlogComponent,
    ContentPipe
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
    ),
    RichTextEditorAllModule,

    BrowserModule,
    MaterialDesignModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule.forRoot(),
    FileUploadModule


  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
