import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ActiveSitesService {
  activeSitesArray = [];

  constructor() { }

  addOrDeleteSite(site){
    site = site.toLowerCase();
    if (this.activeSitesArray.indexOf(site) == -1){
      this.activeSitesArray.push(site);
    }
    else{
      this.activeSitesArray.splice(this.activeSitesArray.indexOf(site),1)
    }

  }

  getActiveSitesArray(): array{
    return this.activeSitesArray;
  }


  getActiveSitesCount(){
    return this.activeSitesArray.length;
  }

}
