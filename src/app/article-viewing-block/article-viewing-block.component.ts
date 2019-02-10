import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActiveLanguagesService} from '../active-languages.service'; 
import { ActiveSitesService} from '../active-sites.service'; 
import { GetDataFromURLService } from '../get-data-from-url.service';

@Component({
  selector: 'app-article-viewing-block',
  templateUrl: './article-viewing-block.component.html',
  styleUrls: ['./article-viewing-block.component.css']
})

export class ArticleViewingBlockComponent implements OnInit {

  allSitesArray = [];
  activeLanguagesArray = [];
  activeSitesArray = [];
  validSitesArray = [];
  langCode = "";
  url="https://commons.wikimedia.org/w/api.php?action=sitematrix&smtype=language&origin=*&format=json";
  displayUrl = "";

  @Output() changedURL = new EventEmitter<string>();

  constructor(
    private getDataService: GetDataFromURLService,
    private alService: ActiveLanguagesService, 
    private asService: ActiveSitesService) {}

  ngOnInit() {
    this.getDataService.getDataFromURL(this.url)
      .subscribe(data => {this.buildAllSitesArray(data)});
  }
 
  getRandomArticle() {

    this.activeLanguagesArray = this.alService.getActiveLanguagesArray();
    this.activeSitesArray = this.asService.getActiveSitesArray();

    if (this.activeLanguagesArray.length == 0 && this.activeSitesArray.length == 0) {
      this.displayUrl = this.getRandomArticleFromAllSites();    
    } 

    else if (this.activeLanguagesArray.length == 0) {
      alert("You need to choose some languages! \n\n Currently users have to configure both languages AND sites, or leave all unchecked (defaults to all combinations).  This will be fixed in a future version.")
    }

    else if (this.activeSitesArray.length == 0) {
      alert("You need to choose some sites! \n\n Currently users have to configure both languages AND sites, or leave all unchecked (defaults to all combinations).  This will be fixed in a future version.")
    }

    else {

      let tempArrayOuter = [];
      for (var i = 0; i < this.activeLanguagesArray.length; i++) {
        let tempArrayInner = [];
        for (var j = 0; j < this.activeSitesArray.length; j++) {
          let urlToTry = "https://" + this.activeLanguagesArray[i] + "." + this.activeSitesArray[j] + ".org"; 
          if (this.allSitesArray.indexOf(urlToTry) != -1){
            tempArrayInner.push(urlToTry);
          }
        }
        if (tempArrayInner.length > 0) {
          tempArrayOuter.push(tempArrayInner);
        }
      }

      if (tempArrayOuter.length == 0) {
        alert("Your choices of language and site do not combine to form any valid sites.  Keep in mind that popular languages will have most of the wikis listed, whereas more obscure languages may only have a Wikipedia.");
      }
      else{
        let randomOuterIndex = Math.floor(Math.random() * tempArrayOuter.length);
        let randomInnerIndex = Math.floor(Math.random() * tempArrayOuter[randomOuterIndex].length);
        let randomUrl = tempArrayOuter[randomOuterIndex][randomInnerIndex];
        this.displayUrl = randomUrl + "/wiki/Special:Random?dummyVar=" + (new Date()).getTime();
        this.changedURL.emit(this.displayUrl);
      }

    }

  }

  buildAllSitesArray(data){

    let newArray = [];

    for (var lang in data.sitematrix) {

      if (typeof(data.sitematrix[lang]) == "object") {

        if ("site" in data.sitematrix[lang]) {

          for(var innerSite in data.sitematrix[lang].site) {
            if(!("closed" in data.sitematrix[lang].site[innerSite])) {
              let sitename = data.sitematrix[lang].site[innerSite].url;
              newArray.push(sitename);
            }

          }
                   
        }
    
      }

    }

    newArray.sort(); 
    this.allSitesArray = newArray;

    this.displayUrl = this.getRandomArticleFromAllSites();
  
  }

  getRandomArticleFromAllSites() {
    if (this.allSitesArray.length == 0) {
      return("");
    }
    else {
      let openingURL = this.allSitesArray[Math.floor(Math.random() * this.allSitesArray.length)] + "/wiki/Special:Random?dummyVar=" + (new Date()).getTime(); 
      this.changedURL.emit(openingURL);
      return (openingURL);
    }
  }

}
