import { Component } from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http' ;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(sanitizer: DomSanitizer ,  private http: HttpClient ) {

  }
}
