import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { LayoutPortalWebPageComponent } from './pages/layout-portal-web-page/layout-portal-web-page.component';
import { PortalWebPageComponent } from './pages/portal-web-page/portal-web-page.component';




// localhost:4200/munihuaura
const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: '',
        component: LayoutPortalWebPageComponent, // Este es el componente que quieres mostrar por defecto en LayoutPageComponent
      },
      // otras rutas hijas si las tienes
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MuniRoutingModule { }
