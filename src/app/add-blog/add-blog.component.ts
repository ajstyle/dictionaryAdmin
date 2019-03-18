import { Component, OnInit, ViewEncapsulation , EventEmitter} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { ApiService } from '../api.service';
import {Blog} from '../data-model/blog' ;
import { HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router' ;
import { MatSnackBar } from '@angular/material';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, TableService } from '@syncfusion/ej2-angular-richtexteditor';

const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, TableService]

})
export class AddBlogComponent implements OnInit {
  
  public imagePath;
  imgURL: any;
  file: File ;
  imageRes: any ;
  edit = false ;
  public message: string;
  public uploader: FileUploader = new FileUploader({
    url: URL
    });
  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;

  uploadData = new FormData() ;

  fileObject: any;
  form: FormGroup;
  model: any = {};
  constructor(public apiService: ApiService , public router: Router , public snackBar: MatSnackBar ) { }

  ngOnInit() {
     console.log(this.router.url) ;
    if (this.router.url === '/editBlog') {
      this.apiService.getData().subscribe(res => {
        if (res) {
          this.edit = true ;
          this.model = res ;
          this.imgURL = `http://localhost/blog/uploads/${this.model.uploadData}` ;
         // this.imgURL = `localhost/blog/uploads/${this.model.uploadData}` ;
          console.log(this.model) ;
        } else {
          this.router.navigate(['/']) ;
        }
      });
  }
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e ;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  preview(files) {
    console.log('previewFile' , files) ;
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.' ;
      this.imgURL = null;
      return;
    }
    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }
  previewDrag(files) {
    console.log('previewFile' , files) ;
    const mimeType = files.type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.' ;
      this.imgURL = null;
      return;
    }
    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

  public onFileSelected(event: EventEmitter<File[]>) {
     this.file = event[0];
    console.log(this.file);
    this.previewDrag(this.file) ;
  this.uploadData.append('myFile', this.file, this.file.name);
      this.apiService.postImage(this.uploadData).subscribe(res => {
        this.imageRes = res ;
        this.snackBar.open('Image Uploaded', 'Done', {
          duration: 2000
        });
      });
       readBase64(this.file)
      .then(function(data) {
    //  console.log(data);
    });
  }

  update() {
    if (this.imageRes) {
      this.model.uploadData =  this.imageRes.upload_data.file_name ;
    }
    console.log(this.model) ;
    this.apiService.updatePost(this.model).subscribe(data => {
      this.snackBar.open('Post Updated', 'Done', {
        duration: 2000
      });
      this.router.navigate(['/']) ;
    }) ;
   }

  addBlog() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json; charset=utf-8',
      })
    };
    console.log(this.model);
    this.model.uploadData =  this.imageRes.upload_data.file_name ;
     const blogData = new Blog(this.model) ;
    this.apiService.addPost(blogData, httpOptions).subscribe(data => {
      this.snackBar.open('Post Updated', 'Done', {
        duration: 2000
      });
      this.router.navigate(['/']) ;
        }, (error) => {console.log(error.message) ; });
  }
}

function readBase64(file): Promise<any> {
  const  reader  = new FileReader();
  const future = new Promise((resolve, reject) => {
    reader.addEventListener('load', function () {
      resolve(reader.result);
    }, false);
    reader.addEventListener('error', function (event) {
      reject(event);
    }, false);

    reader.readAsDataURL(file);
  });
  return future;
}
