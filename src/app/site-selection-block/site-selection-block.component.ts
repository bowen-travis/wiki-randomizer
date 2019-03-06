import { Component, OnInit } from '@angular/core';
import { GetDataFromURLService } from '../get-data-from-url.service';
import { ActiveSitesService } from '../active-sites.service';

@Component({
  selector: 'app-site-selection-block',
  templateUrl: './site-selection-block.component.html',
  styleUrls: ['./site-selection-block.component.css']
})

export class SiteSelectionBlockComponent implements OnInit {

  //we will only load this to get initial choices that were saved in localStorage
  activeSitesArray = []

  url="https://commons.wikimedia.org/w/api.php?action=sitematrix&smtype=language&origin=*&format=json";
  fullSiteArray = [];

  constructor(
    private getDataService: GetDataFromURLService,
    private asService: ActiveSitesService 
  ) {}

  ngOnInit() {
    this.getDataService.getDataFromURL(this.url)
      .subscribe(data => {this.buildFullSiteArray(data)});

    this.activeSitesArray = this.asService.getActiveSitesArray();
  }

  processSiteSelect(site){
    this.asService.addOrDeleteSite(site);
  }

  buildFullSiteArray(data){

    let newArray = [];

    for (var lang in data.sitematrix) {

      if (typeof(data.sitematrix[lang]) == "object") {

        if(data.sitematrix[lang].localname == "English") { 
        //if ("site" in data.sitematrix[lang]) {

          for(var innerSite in data.sitematrix[lang].site) {
            if(!("closed" in data.sitematrix[lang].site[innerSite])) {
              let sitename = data.sitematrix[lang].site[innerSite].sitename;
              newArray.push(sitename);
            }

          }
                   
        }
    
      }

    }

    newArray.sort(); 
    this.fullSiteArray = newArray;
  
  }

}
