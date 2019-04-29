import { Injectable   } from '@angular/core';
import { HttpClient } from '@angular/common/http' ;
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class ApiService {
  //localurl = 'http://localhost:8000/api' ; 
  
   localurl = 'https://dictionarybackend.herokuapp.com/api' ; 
  constructor(public http: HttpClient ) { }
  private messageSource = new BehaviorSubject('');
  setData(data) {
    this.messageSource.next(data) ;
  }

  getData() {
    return this.messageSource ;
  }

  updateWord(data) {
    console.log(data.id) ;
    return this.http.put(`${this.localurl}/dictionary/${data.id}` , data );
  }

  deleteImage(id) {
    return this.http.put(`${this.localurl}/deleteImage/${id}` , id );

  }
  deleteAudio(id) {
    return this.http.put(`${this.localurl}/deleteAudio/${id}` , id );

  }

  login(val) {
    return this.http.post(`${this.localurl}/login` , val );

  }
   getWords() {
     return this.http.get(`${this.localurl}/dictionary`);
   }

   addWord(data, options) {
   console.log(options) ;
    return this.http.post(`${this.localurl}/dictionary` , data);
  }


   delete(id) {
     return this.http.delete(`${this.localurl}/dictionary/${id}` ) ;
   }
   postImage(url) {
    return this.http.post(`${this.localurl}/uploadImage`, url) ;
   }
   postAudio(url) {
    return this.http.post(`${this.localurl}/uploadAudio`, url) ;

   }
}


