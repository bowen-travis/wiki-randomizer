import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ActiveSitesService {
  activeSitesArray = [];

  constructor() {
    this.activeSitesArray = window.localStorage.activeSitesArray ? JSON.parse(window.localStorage.activeSitesArray) : [];
  }

  addOrDeleteSite(site){
    site = site.toLowerCase();
    if (this.activeSitesArray.indexOf(site) == -1){
      this.activeSitesArray.push(site);
      window.localStorage.activeSitesArray = JSON.stringify(this.activeSitesArray);
    }
    else{
      this.activeSitesArray.splice(this.activeSitesArray.indexOf(site),1)
      window.localStorage.activeSitesArray = JSON.stringify(this.activeSitesArray);
    }

  }

  getActiveSitesArray() {
    return this.activeSitesArray;
  }


  getActiveSitesCount(){
    return this.activeSitesArray.length;
  }

}
