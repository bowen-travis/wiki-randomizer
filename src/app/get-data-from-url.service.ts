import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GetDataFromURLService {

  constructor(
    private http: HttpClient
  ){};

  getDataFromURL(url): Observable<{}> { 
      return this.http.get<{}>(url);
    }

 }
