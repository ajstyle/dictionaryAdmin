

export class Dictionary {
  word: string;
  wordMeaning: string;
  imageName: string;
  audioName: string ;

  constructor( obj?: any , ) {
          this.word = obj.word ;
          this.wordMeaning = obj.wordMeaning ;
          this.imageName = obj.imageName ;
          this.audioName = obj.audioName ;

  }

}

export class UpdateDictionary {
  word: string;
  wordMeaning: string;
  imageName: string;
  audioName: string ;
  id : string ; 
  constructor( obj?: any , ) {
          this.word = obj.word ;
          this.wordMeaning = obj.wordMeaning ;
          this.imageName = obj.imageName ;
          this.audioName = obj.audioName ;
          this.id = obj._id  ; 

  }

}




