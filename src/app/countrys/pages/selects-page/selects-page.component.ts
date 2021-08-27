import { CountryForAlpha } from './../../interfaces/countryForAlpha.interface';
import { CountrySmall } from './../../interfaces/countries.interface';
import { CountryServicesService } from './../../services/country-services.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-selects-page',
  templateUrl: './selects-page.component.html',
  styleUrls: ['./selects-page.component.css'],
})
export class SelectsPageComponent implements OnInit {
  miForm: FormGroup = this.fb.group({
    region: ['', [Validators.required]],
    pais: ['', [Validators.required]],
    frontera: ['', [Validators.required]],
  });
  countries: CountrySmall[] = [];
  // LimitCountries: string[] = [];
  LimitCountries: CountrySmall[] = [];
  regiones: string[] = [];
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private countrysServices: CountryServicesService
  ) {}

  ngOnInit(): void {
    this.regiones = this.countrysServices.regiones;

    // change region in select
    this.miForm
      .get('region')
      ?.valueChanges.pipe(
        tap((_) => {
          this.miForm.get('pais')?.reset('');
          this.loading = true;
        }),
        switchMap((region) =>
          this.countrysServices.getCountrysForRegion(region)
        )
      )
      .subscribe((countries) => {
        this.countries = countries;
        this.loading = false;
      });

    // this.miForm.get( 'region' )?.valueChanges
    //   .subscribe( region => {
    //     console.log(region);

    //     this.countrysServices.getCountrysForRegion( region )
    //       .subscribe( countries => {
    //         console.log(countries);
    //         this.countries = countries
    //       })
    //   })

    this.miForm
      .get('pais')
      ?.valueChanges.pipe(
        tap((_) => {
          this.miForm.get('frontera')?.reset('');
          this.loading = true;
        }),
        switchMap((codeCountry) =>
          this.countrysServices.getCountryForAlphaCode(codeCountry)
        ),
        switchMap((country) =>
          this.countrysServices.getCountriesForBorders(country?.borders!)
        )
      )
      .subscribe((countries) => {
        // this.LimitCountries = country?.borders || []
        this.LimitCountries = countries;
        this.loading = false;
      });
  }

  save() {}
}
