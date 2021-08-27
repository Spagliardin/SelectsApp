import { CountryForAlpha } from './../interfaces/countryForAlpha.interface';
import { CountrySmall } from './../interfaces/countries.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryServicesService {
  private _baseUrl: string = 'https://restcountries.eu/rest/v2';
  private _regiones: string[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
  ];

  get regiones(): string[] {
    return [...this._regiones];
  }

  constructor(private http: HttpClient) {}

  getCountrysForRegion(region: string): Observable<CountrySmall[]> {
    const url: string = `${this._baseUrl}/region/${region}?fields=alpha3Code;name`;
    return this.http.get<CountrySmall[]>(url);
  }

  getCountryForAlphaCode(code: string): Observable<CountryForAlpha | null> {

    if (!code) {
      return of( null )
    }

    const url: string = `${this._baseUrl}/alpha/${code}`;
    return this.http.get<CountryForAlpha>(url);
  }

  getCountryForAlphaCodeSmall(code: string): Observable<CountrySmall> {

    const url: string = `${this._baseUrl}/alpha/${code}?fields=name;alpha3Code`;
    return this.http.get<CountrySmall>(url);

  }

  getCountriesForBorders ( borders: string[] ) :Observable<CountrySmall[]> {

    if (!borders) {
      return of( [] )
    }

    const requests: Observable<CountrySmall>[] = []

    borders.forEach( code => {
      const request = this.getCountryForAlphaCodeSmall( code );
      requests.push( request ) 
    } )
    
    return combineLatest( requests )

  }
}
