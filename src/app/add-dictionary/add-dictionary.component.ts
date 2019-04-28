import { Component, OnInit, ViewEncapsulation , EventEmitter} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { ApiService } from '../api.service';
import {Dictionary,UpdateDictionary} from '../data-model/dictionary' ;
import { HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router' ;
import { MatSnackBar } from '@angular/material';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, TableService } from '@syncfusion/ej2-angular-richtexteditor';
import { NgProgress } from 'ngx-progressbar';
const URL = 'https://dictionarybackend.herokuapp.com/api/upload' ; 

@Component({
  selector: 'app-add-dictionary',
  templateUrl: './add-dictionary.component.html',
  styleUrls: ['./add-dictionary.component.css'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, TableService]

})
export class AddBlogComponent implements OnInit {
  public imagePath;
  imgURL: any;
  audioUrl : any = null ; 
  file: File ;
  imageRes: any ;
  audioRes : any ; 
  edit = false ;
  disable   = true ; 
  text : string ; 
  pdfUrl : any ; 
  public message: string;
  public uploader: FileUploader = new FileUploader({ url: URL });
 imageName :string ; 
audioName : string ; 
  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;
  uploadAudio = false ; 
  uploadData = new FormData() ;
  uploadAudioData = new FormData() ;
  fileObject: any;
  form: FormGroup;
  model: any = {};
  constructor(public apiService: ApiService , public router: Router , public snackBar: MatSnackBar  , public ngProgress: NgProgress ) { }

  ngOnInit() {
     console.log(this.router.url) ;


    if (this.router.url === '/editDictionary') {
    
      this.apiService.getData().subscribe(res => {
        console.log('res========' , res)  ; 
        if (res) {
          this.disable = false ;
          this.edit = true ;
          this.model = res ;
          if(this.model.imageName){
            const imageExt =  this.model.imageName.split('.').pop().toLowerCase()  ;   
        if(imageExt == 'jpeg' || imageExt == 'jpg' || imageExt == 'png' || imageExt=='gif' || imageExt == 'tiff' || imageExt == 'psd' ) {
          this.imgURL = `https://dictionarybackend.herokuapp.com/images/${this.model.imageName}` ;
         }
          }
          if(this.model.audioName){
            const audioExt =  this.model.audioName.split('.').pop().toLowerCase()  ; 
            if(audioExt == 'mp3' || audioExt == 'wav' || audioExt=='aif' || audioExt == 'mid') {
              this.audioUrl = `https://dictionarybackend.herokuapp.com/images/${this.model.audioName}` ;
              console.log('===audioUrl' , this.audioUrl);
            }
          }
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
    console.log('previewFile' , files[0]) ;
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    if (mimeType.match(/image\/*/) !== null) {
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      };
    }else if(mimeType.match(/audio\/*/) !== null) {
      reader.onload = (_event) => {
        this.audioUrl = reader.result;
        this.uploadAudio = true ; 
      };
    }else {
      reader.onload = (_event) => {
        console.log('====',reader) ; 
        this.pdfUrl = reader.result;
      };
    }

  }
  previewDrag(files) {
    console.log('previewFile' , files) ;
    const mimeType = files.type;

    console.log('mimetype======',mimeType) ;
    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files);

    if (mimeType.match(/image\/*/) !== null) {
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      };
    }else if (mimeType.match(/audio\/*/) !== null) {
      reader.onload = (_event) => {
        this.audioUrl = reader.result;
        this.uploadAudio = true ; 

      };
    }else {
      reader.onload = (_event) => {
        console.log('====',reader) ; 
        this.pdfUrl = reader.result;
      };
    }

  }

  public onFileSelected(event: EventEmitter<File[]>) {
    this.file = event[0];
   this.previewDrag(this.file) ;
   console.log('==files', this.file) ;
   if(this.file.type == 'image/jpeg' || this.file.type == 'image/png' ) {
    this.uploadData.append('imageFile', this.file, this.file.name);
    console.log(this.uploadData)
   }else {
    this.uploadAudioData.append('imageFile', this.file, this.file.name);
    this.uploadAudio = true ; 

   } 
 }

 


  update() {
    console.log('imageName=======', this.model.imageName) ; 
  //  if(this.imageName) {
  //   this.model.imageName =  this.imageName ;
  //  }
  //  if(this.audioName) {
  //   this.model.audioName = this.audioName ;

  //  }
    // this.apiService.updateWord(this.model).subscribe(data => {
    //   this.snackBar.open('Post Updated', 'Done', {
    //     duration: 2000
    //   });
    //   this.router.navigate(['/']) ;
    // }) ;

    this.apiService.postImage(this.uploadData).subscribe(response => {
      console.log(response) ; 
      this.imageRes = response ; 
    this.apiService.postImage(this.uploadAudioData).subscribe(res => {
      this.audioRes = res ;
      console.log('this.audioRes',this.audioRes);
             this.audioName = this.audioRes.uploadname ;
           this.imageName = this.imageRes.uploadname ;

      this.ngProgress.done() ;
      this.disable = false ;
      this.uploadData.delete('imageFile') ;
       this.uploadAudioData.delete('imageFile');
       this.model.imageName = (this.imageName) ? this.imageName : this.model.imageName  ; 
       this.model.audioName = (this.audioName ) ? this.audioName : this.model.audioName; 
       const dictionaryData = new UpdateDictionary(this.model) ;
       console.log('dictionaryData=====', dictionaryData) ;

    this.apiService.updateWord(dictionaryData).subscribe(data => {
      this.snackBar.open('Post Updated', 'Done', {
        duration: 2000
      });
      this.text = '' ;
      this.snackBar.open('Data Uploaded', 'Done', {
        duration: 2000
      });
      this.router.navigate(['/']);
    });
  }) ;
}) ;
   }

   deleteImage() {
    this.apiService.deleteImage(this.model._id).subscribe(data => {
      console.log(data) ; 
      this.imgURL = null ; 
      this.model.imageName = null ; 
    })
  }

  deleteAudio() { 
    this.apiService.deleteAudio(this.model._id).subscribe(data => {
      console.log(data) ; 
      this.audioUrl = null ; 
      this.model.audioName = null ; 
    })
  }

  removeImage() {
    this.imgURL = null ; 

  }

  removeAudio() {
    this.audioUrl = null ; 
    this.uploadAudio = false ; 
  }
  addBlog() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json; charset=utf-8',
      })
    };

    this.apiService.postImage(this.uploadData).subscribe(response => {
      console.log(response) ; 
      this.imageRes = response ; 
    this.apiService.postImage(this.uploadAudioData).subscribe(res => {
      this.audioRes = res ;
      console.log('this.audioRes',this.audioRes);
             this.audioName = this.audioRes.uploadname ;

           this.imageName = this.imageRes.uploadname ;
      this.ngProgress.done() ;
      this.disable = false ;
      this.uploadData.delete('imageFile') ;
       this.uploadAudioData.delete('imageFile');
       this.model.imageName = this.imageName ; 
       this.model.audioName = this.audioName ; 
       console.log('Model=====',this.model) ;
       const dictionaryData = new Dictionary(this.model) ;

         this.apiService.addWord(dictionaryData, httpOptions).subscribe(data => {
   this.snackBar.open('Word Updated', 'Done', {
     duration: 2000
   });
      this.text = '' ;

      this.snackBar.open('Data Uploaded', 'Done', {
        duration: 2000
      });
      this.router.navigate(['/']);
    });
  }) ;
}) ;
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
