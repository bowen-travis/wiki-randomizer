import { Component, ViewChild } from '@angular/core';
import { GetDataFromURLService } from './get-data-from-url.service';
import { AllLanguagesService } from './all-languages.service';
import { ActiveLanguagesService} from './active-languages.service';
import { ActiveSitesService} from './active-sites.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {

  rawLanguageDataUrl = "https://commons.wikimedia.org/w/api.php?action=sitematrix&smtype=language&origin=*&format=json";
  allLanguageArray = [];
  activeLanguagesArray = [];
  activeSitesArray = [];
  validSitesArray = [];
  currentPageURL = "";
  @ViewChild('articleBlock') child;

  sitesButtonText = "Choose Sites...";
  siteChooserDisplay = "none";

  languagesButtonText = "Choose Languages...";
  languageChooserDisplay = "none";

  constructor(
      private getDataService: GetDataFromURLService,
      private alService: AllLanguagesService,
      private activeLangService: ActiveLanguagesService,
      private activeSiteService: ActiveSitesService
  ) {};

  ngOnInit() {
    this.getDataService.getDataFromURL(this.rawLanguageDataUrl)
        .subscribe(data => {this.allLanguageArray = this.alService.buildAllLanguageArray(data);});
  }

  ngAfterViewInit() {
    window.setTimeout(() => {this.child.updateDisplayURL(this.getRandomURL())}, 1000);
  }


  getRandomURLFromFullSiteArray() {
    if (this.allLanguageArray.length == 0) {
      return("");
    }
    else {
      let randomLang = this.allLanguageArray[Math.floor(Math.random() * this.allLanguageArray.length)];
      let randomURL = randomLang.sites[Math.floor(Math.random() * randomLang.sites.length)]
          + "/wiki/Special:Random?dummyVar=" + (new Date()).getTime();

      return randomURL;
    }
  }

  getRandomURL() {

    //reset valid sites array
    this.validSitesArray = [];

    this.activeLanguagesArray = this.activeLangService.getActiveLanguagesArray();
    this.activeSitesArray = this.activeSiteService.getActiveSitesArray();

    let activeLanguagesEmpty = this.activeLanguagesArray.length == 0;
    let activeSitesEmpty = this.activeSitesArray.length == 0;

    let returnUrl = "";

    if (activeLanguagesEmpty && activeSitesEmpty) {
      returnUrl = this.getRandomURLFromFullSiteArray();
    }

    /*else if (this.activeLanguagesArray.length == 0) {
      alert("You need to choose some languages! \n\n Currently users have to configure both languages AND sites, or leave all unchecked (defaults to all combinations).  This will be fixed in a future version.")

      return;
    }

    else if (this.activeSitesArray.length == 0) {
      alert("You need to choose some sites! \n\n Currently users have to configure both languages AND sites, or leave all unchecked (defaults to all combinations).  This will be fixed in a future version.")

      return;
    }*/

    else {
      for(var i = 0; i < this.allLanguageArray.length; i++){
        let tempArray = [];

        if((this.activeLanguagesArray.indexOf(this.allLanguageArray[i].id) != -1) || (activeLanguagesEmpty))
        {
          if (activeSitesEmpty) {
            for (var j = 0; j < this.allLanguageArray[i].sites.length; j++) {
              tempArray.push(this.allLanguageArray[i].sites[j]);
            }
          }

          else{
            for (var j = 0; j < this.activeSitesArray.length; j++) {
              let testUrl = "https://" + this.allLanguageArray[i].id + "." + this.activeSitesArray[j] + ".org";
              if (this.allLanguageArray[i].sites.indexOf(testUrl) != -1) {
                tempArray.push(testUrl);
              }
            }
          }

          if (tempArray.length != 0) {
            this.validSitesArray.push(tempArray);
          }
        }

      }

      if (this.validSitesArray.length == 0) {
        alert("Your choices of language and site do not combine to form any valid sites.  Keep in mind that popular languages will have most of the wikis listed, whereas more obscure languages may only have a Wikipedia.");
        return("");
      }

      else{
        let randomOuterIndex = Math.floor(Math.random() * this.validSitesArray.length);
        let randomInnerIndex = Math.floor(Math.random() * this.validSitesArray[randomOuterIndex].length);
        let randomUrl = this.validSitesArray[randomOuterIndex][randomInnerIndex];
        randomUrl += "/wiki/Special:Random?dummyVar=" + (new Date()).getTime();
        returnUrl = randomUrl;
      }

    }

    this.updateURLInfo(returnUrl);
    return(returnUrl);

  }








  getLanguageNameFromCode(code): string {
    for (var i=0; i < this.allLanguageArray.length; i++) {
      if (this.allLanguageArray[i].id === code) {
        return this.allLanguageArray[i].name;
      }
    }
    return "Unknown";
  }

  updateURLInfo(url) {
    let originalString = url;
    let tempString = originalString.replace(/https\:\/\//, '')
    tempString = tempString.replace(/\.org\/wiki\/.*/, '');
    let periodPosition = tempString.indexOf(".");

    let languageName = this.getLanguageNameFromCode(tempString.slice(0, periodPosition));
    let sitename = tempString.slice(periodPosition + 1, periodPosition + 2).toUpperCase()
        + tempString.slice(periodPosition + 2);
    this.currentPageURL = (languageName + " - " + sitename);
  }

  toggleLanguageChooser() {
    this.languagesButtonText = (this.languagesButtonText == "Choose Languages..." ? "Hide Languages" : "Choose Languages...");
    this.languageChooserDisplay = (this.languageChooserDisplay == "none" ? "block" : "none");
  }

  toggleSiteChooser() {
    this.sitesButtonText = (this.sitesButtonText == "Choose Sites..." ? "Hide Sites" : "Choose Sites...");
    this.siteChooserDisplay = (this.siteChooserDisplay == "none" ? "block" : "none");
  }

  displayAppInfo() {
    let infostring = "This is a wrapper that extends Wikimedia's random article functionality by allowing the user "
        + "to choose a set of languages and wikisites to randomly choose from.  The app will first choose a random language, and then "
        + "a random site, and finally retrieve a random article from that language/site combo."
        + "\n\nIf you do not choose any languages and sites, your random articles will be chosen from all of the languages and sites.";

    alert(infostring);
  }

}
