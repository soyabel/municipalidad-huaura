import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { PapeletadniPageComponent } from './pages/papeletadni-page/papeletadni-page.component';
import { PapeletaplacaPageComponent } from './pages/papeletaplaca-page/papeletaplaca-page.component';
import { MuniModule } from '../muni/muni.module';
import { MainAuthComponent } from './components/main-auth/main-auth.component';
import { FormsModule } from '@angular/forms';
import { MatrimonioPageComponent } from './pages/matrimonio-page/matrimonio-page.component';
import { PredioPageComponent } from './pages/predio-page/predio-page.component';
import { ArbitrioPageComponent } from './pages/arbitrio-page/arbitrio-page.component';
import { FraccionamientoPageComponent } from './pages/fraccionamiento-page/fraccionamiento-page.component';
import { ConstMuniService } from './services/constMuni.service';
import { DefuncionPageComponent } from './pages/defuncion-page/defuncion-page.component';
import { NacimientoPageComponent } from './pages/nacimiento-page/nacimiento-page.component';



@NgModule({
  declarations: [
    LayoutPageComponent,
    PapeletadniPageComponent,
    PapeletaplacaPageComponent,
    MainAuthComponent,
    MatrimonioPageComponent,
    PredioPageComponent,
    ArbitrioPageComponent,
    FraccionamientoPageComponent,
    DefuncionPageComponent,
    NacimientoPageComponent,

  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MuniModule,
    FormsModule
  ],
  providers: [ConstMuniService]
})
export class AuthModule { }
