import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { PapeletadniPageComponent } from './pages/papeletadni-page/papeletadni-page.component';
import { PapeletaplacaPageComponent } from './pages/papeletaplaca-page/papeletaplaca-page.component';
import { MatrimonioPageComponent } from './pages/matrimonio-page/matrimonio-page.component';
import { PredioPageComponent } from './pages/predio-page/predio-page.component';
import { ArbitrioPageComponent } from './pages/arbitrio-page/arbitrio-page.component';
import { FraccionamientoPageComponent } from './pages/fraccionamiento-page/fraccionamiento-page.component';
import { AuthGuard } from './guards/auth.guard';
import { ConstMuniService } from './services/constMuni.service';
import { NacimientoPageComponent } from './pages/nacimiento-page/nacimiento-page.component';
import { DefuncionPageComponent } from './pages/defuncion-page/defuncion-page.component';
import { TransportePageComponent } from './pages/transporte-page/transporte-page.component';



// localhost:4200/auth/
const routes: Routes = [
  { path: '', redirectTo: '/servicios', pathMatch: 'full' },
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'papeletadni', component: PapeletadniPageComponent ,canActivate: [AuthGuard], data: { 'localStorageKey': ConstMuniService.INFRACCIONDNI_KEY }},
      { path: 'papeletaplaca', component: PapeletaplacaPageComponent ,canActivate: [AuthGuard], data: { 'localStorageKey': ConstMuniService.INFRACCIONPLACA_KEY } },
      { path: 'matrimonio', component: MatrimonioPageComponent ,canActivate: [AuthGuard], data: { 'localStorageKey': ConstMuniService.MATRIMONIO_KEY } },
      { path: 'nacimiento', component: NacimientoPageComponent ,canActivate: [AuthGuard], data: { 'localStorageKey': ConstMuniService.NACIMIENTO_KEY } },
      { path: 'defuncion', component: DefuncionPageComponent ,canActivate: [AuthGuard], data: { 'localStorageKey': ConstMuniService.DEFUNCION_KEY } },
      { path: 'predio', component: PredioPageComponent ,canActivate: [AuthGuard], data: { 'localStorageKey': ConstMuniService.PREDIOSUSER_KEY} },
      { path: 'arbitrio', component: ArbitrioPageComponent ,canActivate: [AuthGuard], data: { 'localStorageKey': ConstMuniService.ARBITRIOUSER_KEY}},
      { path: 'fraccionamiento', component: FraccionamientoPageComponent ,canActivate: [AuthGuard], data: { 'localStorageKey': ConstMuniService.FRACCIONAMIENTOUSER_KEY}},
      { path: 'transporte', component: TransportePageComponent ,canActivate: [AuthGuard], data: { 'localStorageKey': ConstMuniService.TRANSPORTE_KEY}},
    ]
  },
  { path: '**', redirectTo: '/servicios' },
];




@NgModule({
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule],
})
export class AuthRoutingModule { }
