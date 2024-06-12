import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { MunicipalidadPageComponent } from './pages/municipalidad-page/municipalidad-page.component';
import { MuniinformacionPageComponent } from './pages/muniinformacion-page/muniinformacion-page.component';
import { MuniorganizacionPageComponent } from './pages/muniorganizacion-page/muniorganizacion-page.component';
import { MuninoticiasPageComponent } from './pages/muninoticias-page/muninoticias-page.component';
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

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      { path: 'inicio', component: MuninoticiasPageComponent },
      { path: 'municipalidad', component: MunicipalidadPageComponent },
      { path: 'informacion', component: MuniinformacionPageComponent },
      { path: 'organizacion', component: MuniorganizacionPageComponent },
      { path: 'presupuesto', component: PresupuestoPageComponent },
      { path: 'demuna', component: DemunaPageComponent },
      { path: 'omaped', component: OmapedPageComponent },
      { path: 'ule', component: UlePageComponent },
      { path: 'casa-de-la-cultura', component: CasaculturaPageComponent},
      { path: 'vaso-de-leche', component: VasolechePageComponent },
      { path: 'complementacion-alimentaria', component: ComplealimentariaPageComponent },
      { path: 'educacion-cultura-deporte', component: EduculdeporteComponent },
      { path: 'gerencia-de-desarrollo-urbano-y-rural-riesgos-de-desastres-y-defensa-civil', component: DesarrollourbanoPageComponent },
      { path: 'subgerencia-de-seguridad-ciudadana', component: SeguridadciudadanaPageComponent },
      { path: 'gerencia-de-desarrollo-economico-y-gestion-ambiental', component: GerenciaecoambPageComponent },
      { path: 'organo-de-control-institucional', component: OrganoinstitucionalPageComponent },
      { path: 'oficina-general-de-asesoria-juridica', component: AsesoriajuridicaPageComponent },
      { path: 'oficina-general-de-administracion-y-finanzas', component: AdministracionfinanzasPageComponent },
    ]
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalwebRoutingModule { }
