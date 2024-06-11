import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortalwebRoutingModule } from './portalweb-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { MunicipalidadPageComponent } from './pages/municipalidad-page/municipalidad-page.component';
import { MuniinformacionPageComponent } from './pages/muniinformacion-page/muniinformacion-page.component';
import { MuniorganizacionPageComponent } from './pages/muniorganizacion-page/muniorganizacion-page.component';
import { MuninoticiasPageComponent } from './pages/muninoticias-page/muninoticias-page.component';
import { TituloImgComponent } from './components/titulo-img/titulo-img.component';
import { PortalWebFooterComponent } from './components/portal-web-footer/portal-web-footer.component';
import { NavPortalWebComponent } from './components/nav-portal-web/nav-portal-web.component';
import { MuniModule } from '../muni/muni.module';


@NgModule({
  declarations: [
    LayoutPageComponent,
    MunicipalidadPageComponent,
    MuniinformacionPageComponent,
    MuniorganizacionPageComponent,
    MuninoticiasPageComponent,
    TituloImgComponent,
    PortalWebFooterComponent,
    NavPortalWebComponent
  ],
  imports: [
    CommonModule,
    PortalwebRoutingModule,
    MuniModule
  ]
})
export class PortalwebModule { }
