import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ActiveLanguagesService {
  activeLanguagesArray = [];

  constructor() {
    this.activeLanguagesArray = window.localStorage.activeLanguagesArray ? JSON.parse(window.localStorage.activeLanguagesArray) : [];
  }

  addOrDeleteLanguage(code) {

    if (this.activeLanguagesArray.indexOf(code) == -1){
      this.activeLanguagesArray.push(code);
      window.localStorage.activeLanguagesArray = JSON.stringify(this.activeLanguagesArray);
    }
    else{
      this.activeLanguagesArray.splice(this.activeLanguagesArray.indexOf(code),1)
      window.localStorage.activeLanguagesArray = JSON.stringify(this.activeLanguagesArray);
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
