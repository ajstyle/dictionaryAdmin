import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ApiService} from '../api.service' ; 
import {Router} from '@angular/router' ;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LoginComponent implements OnInit {
  message : string ;
  constructor(private apiService : ApiService , private router: Router) { }

  ngOnInit() {
  }

  login(val) {
console.log(val) ; 
this.apiService.login(val).subscribe(res => { console.log(res) ;
if(res['statusCode'] === 200){
 this.router.navigate(['dictionary']) ;
}else {
  this.router.navigate(['/']) ;
  this.message = 'email or password is wrong' ;

}
})  ;
  }
}
