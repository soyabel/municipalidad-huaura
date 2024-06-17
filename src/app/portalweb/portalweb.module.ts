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
import { PresupuestoPageComponent } from './pages/presupuesto-page/presupuesto-page.component';
import { DemunaPageComponent } from './pages/demuna-page/demuna-page.component';
import { OmapedPageComponent } from './pages/omaped-page/omaped-page.component';
import { UlePageComponent } from './pages/ule-page/ule-page.component';
import { CasaculturaPageComponent } from './pages/casacultura-page/casacultura-page.component';
import { VasolechePageComponent } from './pages/vasoleche-page/vasoleche-page.component';
import { ComplealimentariaPageComponent } from './pages/complealimentaria-page/complealimentaria-page.component';
import { EduculdeporteComponent } from './pages/educuldeporte/educuldeporte.component';
import { DesarrollourbanoPageComponent } from './pages/desarrollourbano-page/desarrollourbano-page.component';
import { SeguridadciudadanaPageComponent } from './pages/seguridadciudadana-page/seguridadciudadana-page.component';
import { GerenciaecoambPageComponent } from './pages/gerenciaecoamb-page/gerenciaecoamb-page.component';
import { OrganoinstitucionalPageComponent } from './pages/organoinstitucional-page/organoinstitucional-page.component';
import { AsesoriajuridicaPageComponent } from './pages/asesoriajuridica-page/asesoriajuridica-page.component';
import { AdministracionfinanzasPageComponent } from './pages/administracionfinanzas-page/administracionfinanzas-page.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { SliderPortalwebComponent } from './components/slider-portalweb/slider-portalweb.component';
import { SliderPwComponent } from './components/slider-pw/slider-pw.component';
import { IframePwComponent } from './components/iframe-pw/iframe-pw.component';




@NgModule({
  declarations: [
    LayoutPageComponent,
    MunicipalidadPageComponent,
    MuniinformacionPageComponent,
    MuniorganizacionPageComponent,
    MuninoticiasPageComponent,
    TituloImgComponent,
    PortalWebFooterComponent,
    NavPortalWebComponent,
    PresupuestoPageComponent,
    DemunaPageComponent,
    OmapedPageComponent,
    UlePageComponent,
    CasaculturaPageComponent,
    VasolechePageComponent,
    ComplealimentariaPageComponent,
    EduculdeporteComponent,
    DesarrollourbanoPageComponent,
    SeguridadciudadanaPageComponent,
    GerenciaecoambPageComponent,
    OrganoinstitucionalPageComponent,
    AsesoriajuridicaPageComponent,
    AdministracionfinanzasPageComponent,
    SliderPortalwebComponent,
    SliderPwComponent,
    IframePwComponent
  ],
  imports: [
    CommonModule,
    PortalwebRoutingModule,
    MuniModule,
    NgImageSliderModule,
  ]
})
export class PortalwebModule { }
