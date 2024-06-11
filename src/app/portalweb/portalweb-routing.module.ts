import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { MunicipalidadPageComponent } from './pages/municipalidad-page/municipalidad-page.component';
import { MuniinformacionPageComponent } from './pages/muniinformacion-page/muniinformacion-page.component';
import { MuniorganizacionPageComponent } from './pages/muniorganizacion-page/muniorganizacion-page.component';
import { MuninoticiasPageComponent } from './pages/muninoticias-page/muninoticias-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: '', redirectTo: 'noticias', pathMatch: 'full' },
      { path: 'noticias', component: MuninoticiasPageComponent },
      { path: 'municipalidad', component: MunicipalidadPageComponent },
      { path: 'informacion', component: MuniinformacionPageComponent },
      { path: 'organizacion', component: MuniorganizacionPageComponent },
    ]
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalwebRoutingModule { }
