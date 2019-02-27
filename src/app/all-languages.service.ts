import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AllLanguagesService {

    allLanguagesArray = [];

    constructor(
    ) {}

    /*===============================================================================================

    buildAllLanguageArray() takes the JSON received from the MediaWiki API
      https://commons.wikimedia.org/w/api.php?action=sitematrix&smtype=language&origin=*
    and builds an array of objects that is easier to use in the wiki-randomizer.

    RETURNS: an array of objects having the following format:
    {
        id: string (the 2 or 3 digit code for the language)
        name: string (the standard English name for the language)
        sites: array of strings (an array of valid Wikimedia URLs in this language)
    }

    ===============================================================================================*/


    buildAllLanguageArray(data){

        let newArray = [];

        for (var lang in data.sitematrix) {
            if (typeof(data.sitematrix[lang]) == "object") {

                let localname = data.sitematrix[lang].localname;
                let identifier = data.sitematrix[lang].code;
                let innerSiteArray = [];

                for(var innerSite in data.sitematrix[lang].site) {
                    if(!("closed" in data.sitematrix[lang].site[innerSite])) {
                        innerSiteArray.push(data.sitematrix[lang].site[innerSite].url)
                    }
                }

                if (innerSiteArray.length) {
                    //remove the one long language name that is breaking flow of layout
                    let excludeRegexp1 = /Belarusian\s*\(/;
                    //also remove one of the 2 entries for Cantonese
                    let excludeRegexp2 = /^yue$/
                    if ((! excludeRegexp1.test(localname)) && (! excludeRegexp2.test(identifier))) {
                        newArray.push({id: identifier, name: localname, sites: innerSiteArray});
                    }
                }
            }
        }

        return newArray;
    }




}
