import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectsPageComponent } from './pages/selects-page/selects-page.component';

const routes: Routes = [
  {
    path: '',
    children :[
      {
        path: 'selects', component: SelectsPageComponent
      },
      {
        path: '**', redirectTo: 'selects'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountrysRoutingModule { }
