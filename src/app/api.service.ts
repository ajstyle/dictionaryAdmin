import { Injectable   } from '@angular/core';
import { HttpClient } from '@angular/common/http' ;
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class ApiService {

  constructor(public http: HttpClient ) { }
  private messageSource = new BehaviorSubject('');

  setData(data) {
    this.messageSource.next(data) ;
  }

  getData() {
    return this.messageSource ;
  }

  updatePost(data) {
    console.log(data) ;
    return this.http.put('http://localhost/blog/api/updatePosts' , data );

  }

   getPosts() {
     return this.http.get('http://localhost/blog/api/posts');
   }

   addPost(data, options) {
   console.log(options) ;
    return this.http.post('http://localhost/blog/api/addNewPost' , data);
  }


   delete(id) {
     return this.http.delete(`http://localhost/blog/api/deletePosts/${id}` ) ;
   }
   postImage(url) {
    return this.http.post(`http://localhost/blog/api/uploadImg/`, url) ;
   }
}


