import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'countrys',
    loadChildren: () => import( './countrys/countrys.module' ).then( m => m.CountrysModule )
  },
  {
    path: '**',
    redirectTo: 'countrys'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
