import { Component, OnInit } from '@angular/core';
import { GetDataFromURLService } from '../get-data-from-url.service';
import { ActiveLanguagesService } from '../active-languages.service';

@Component({
  selector: 'app-language-selection-block',
  templateUrl: './language-selection-block.component.html',
  styleUrls: ['./language-selection-block.component.css']
})

export class LanguageSelectionBlockComponent implements OnInit {

  //we will only load this to get initial choices that were saved in localStorage
  activeLanguagesArray = []

  fullLanguageArray = [];
  url = "https://commons.wikimedia.org/w/api.php?action=sitematrix&smtype=language&origin=*&format=json";

  constructor(
    private getDataService: GetDataFromURLService,
    private alService: ActiveLanguagesService
  ) {}

  ngOnInit() {
    this.getDataService.getDataFromURL(this.url)
      .subscribe(data => {this.buildFullLanguageArray(data)});

    this.activeLanguagesArray = this.alService.getActiveLanguagesArray();
  }

  processLanguageSelect(code){
    this.alService.addOrDeleteLanguage(code);
  }

  compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    let comparison = 0;
    if (nameA > nameB) {
      comparison = 1;
    } else if (nameA < nameB) {
      comparison = -1;
    }
    return comparison;
  }

  buildFullLanguageArray(theJSON){

    let newArray = [];

    for (var lang in theJSON.sitematrix) {

      if (typeof(theJSON.sitematrix[lang]) == "object") {

        //2021-01-28 I discovered Language Choice block not appearing.
        //  Problem was a weird piece of data from the API.
        //  One of the entries was missing "localname" and that was causing
        //    the alphabetical sort of the final array to fail.
        if (!("localname" in theJSON.sitematrix[lang])) {
          continue;
        }

        let localname = theJSON.sitematrix[lang].localname;

        let validLocalname = false;
        let identifier = "";
        for(var innerSite in theJSON.sitematrix[lang].site) {
          if(!("closed" in theJSON.sitematrix[lang].site[innerSite])) {
            validLocalname = true;
            identifier = theJSON.sitematrix[lang].code;
            break;
          }
        }

        if (validLocalname === true) {
          // remove the one long language name that is breaking flow of layout
          const excludeRegexp1 = /Belarusian\s*\(/;
          // also remove one of the 2 entries for Cantonese
          const excludeRegexp2 = /^yue$/
          if ((! excludeRegexp1.test(localname)) && (! excludeRegexp2.test(identifier))) {
            newArray.push({id: identifier, name: localname});
          }
        }

      }

    }

    newArray.sort(this.compare);
    this.fullLanguageArray = newArray;
  }

}
