import { Component } from '@angular/core';
import { AllLanguagesService } from './all-languages.service';
import { GetDataFromURLService } from './get-data-from-url.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {

  rawLanguageDataUrl = "https://commons.wikimedia.org/w/api.php?action=sitematrix&smtype=language&origin=*&format=json";
  allLanguageArray = [];
  //alService = new(AllLanguagesService);
  //getDataService = new(GetDataFromURLService);

  sitesButtonText = "Choose Sites...";
  siteChooserDisplay = "none";

  languagesButtonText = "Choose Languages...";
  languageChooserDisplay = "none";

  currentPageURL = "";

  constructor(
    private getDataService: GetDataFromURLService, 
    private alService: AllLanguagesService
    ) {};

  ngOnInit() {
    this.getDataService.getDataFromURL(this.rawLanguageDataUrl)
      .subscribe(data => {this.allLanguageArray = this.alService.buildAllLanguageArray(data);});
  }

  getLanguageNameFromCode(code): string {
    for (var i=0; i < this.allLanguageArray.length; i++) {
      if (this.allLanguageArray[i].id === code) {
        return this.allLanguageArray[i].name;
      }
    }
    return "Unknown";
  }

  updateURLInfo($event) {
    let originalString = $event;
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
