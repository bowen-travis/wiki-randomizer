import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Language } from './Language'

@Injectable({
  providedIn: 'root'
})

export class AllLanguagesService {

  allLanguagesArray = [];

  constructor(
  ) {}

  buildAllLanguageArray(data){

    let newArray = [];
    
    for (var lang in data.sitematrix) {
      if (typeof(data.sitematrix[lang]) == "object") {

          let localname = data.sitematrix[lang].localname;

          let validLocalname = false;
          let identifier = "";
          for(var innerSite in data.sitematrix[lang].site) { 
            if(!("closed" in data.sitematrix[lang].site[innerSite])) {
              validLocalname = true;
              identifier = data.sitematrix[lang].code;
              break;
            }
          }

          if (validLocalname === true) {
            //remove the one long language name that is breaking flow of layout
            let excludeRegexp = /Belarusian\s*\(/;
            if (! excludeRegexp.test(localname)) {
              newArray.push({id: identifier, name: localname});
            }
          }
    
      }
    }

    return newArray;
  
  }

 }