
import { Component, OnInit, ViewEncapsulation, ViewContainerRef , ViewChild , AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../api.service';
import { MatTableDataSource , MatPaginator} from '@angular/material';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddBlogComponent } from '../add-dictionary/add-dictionary.component';
import { MatSnackBar } from '@angular/material';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DictionaryComponent implements OnInit , AfterViewInit{

  wordList : any = [];  
  dataSource: MatTableDataSource<any>;
  data;
  value;
  form;
  show = false;
  url = '';
  uploadData = new FormData();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  /* ----------------------- Table Coloumns ---------------------*/

  displayedColumns = ['S.no.', 'channelName', 'channelId', 'Action'];

  constructor(private router: Router, public dialog: MatDialog, private apiService: ApiService, public snackBar: MatSnackBar) {

  }

  /* ----------------------- GEt Channel ---------------------*/

  ngOnInit() {
    this.show = true;
    this.apiService.getWords().subscribe((wordList) => {
      this.wordList = wordList;
      this.dataSource = new MatTableDataSource(this.wordList);
          this.dataSource.paginator = this.paginator;

      this.show = false;
    }, (err) => { this.show = false; });

  }
  ngAfterViewInit() {
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  /************ Update Channel ****************/

  update(element) {
    console.log(element);
    this.apiService.setData(element);
    this.router.navigate(['editDictionary']);
  }


  /************ Delete Channel ****************/
  delete(id) {
    console.log(id);
    this.show = true;
    this.apiService.delete(id).subscribe(() => {
      this.wordList = this.wordList.filter(word => word._id !== id);
      console.log(this.wordList);
      this.dataSource = new MatTableDataSource<any>(this.wordList);
      this.show = false;
      this.snackBar.open('Word Delete', '', {
        duration: 2000
      });
    });
  }

}


/** Error when invalid control is dirty, touched, or submitted. */

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


