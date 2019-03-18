

export class Blog {
  article_title: string;
  article_content: string;
  uploadData: string;

  constructor( obj?: any , ) {
          this.article_title = obj.article_title ;
          this.article_content = obj.article_content ;
          this.uploadData = obj.uploadData ;

  }

}




