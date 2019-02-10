import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ActiveLanguagesService {
  activeLanguagesArray = [];

  constructor() { }

  addOrDeleteLanguage(code){
    if (this.activeLanguagesArray.indexOf(code) == -1){
      this.activeLanguagesArray.push(code);
    }
    else{
      this.activeLanguagesArray.splice(this.activeLanguagesArray.indexOf(code),1)
    }

  }

  getRandomLanguage(): string{
    if (this.activeLanguagesArray.length == 0) {
      return("");
    }
    else {
      return (this.activeLanguagesArray[Math.floor(Math.random() * this.activeLanguagesArray.length)]);
    }
  }

  getActiveLanguagesArray(){
    return this.activeLanguagesArray;
  }

  getActiveLanguagesCount(){
    return this.activeLanguagesArray.length;
  }

}
