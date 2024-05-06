import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MuniRoutingModule } from './muni-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavComponent } from './components/nav/nav.component';
import { SliderComponent } from './components/slider/slider.component';
import { MainComponent } from './components/main/main.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { TributomuniComponent } from './components/tributomuni/tributomuni.component';
import { PapeletainfraComponent } from './components/papeletainfra/papeletainfra.component';
import { RegistrocivilComponent } from './components/registrocivil/registrocivil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArbitrioComponent } from './components/arbitrio/arbitrio.component';
import { PredioComponent } from './components/predio/predio.component';
import { FraccionamientoComponent } from './components/fraccionamiento/fraccionamiento.component';
import { PapeletadniComponent } from './components/papeletadni/papeletadni.component';
import { PapeletaplacaComponent } from './components/papeletaplaca/papeletaplaca.component';
import { MatrimonioComponent } from './components/matrimonio/matrimonio.component';
import { NacimientoComponent } from './components/nacimineto/nacimiento.component';
import { DefuncionComponent } from './components/defuncion/defuncion.component';
import { TransporteComponent } from './components/transporte/transporte.component';
import { SidecomComponent } from './components/sidecom/sidecom.component';
import { ClimaComponent } from './components/clima/clima.component';






@NgModule({
  declarations: [
    LayoutPageComponent,
    FooterComponent,
    NavComponent,
    SliderComponent,
    MainComponent,
    TributomuniComponent,
    PapeletainfraComponent,
    RegistrocivilComponent,
    ArbitrioComponent,
    PredioComponent,
    FraccionamientoComponent,
    PapeletadniComponent,
    PapeletaplacaComponent,
    MatrimonioComponent,
    NacimientoComponent,
    DefuncionComponent,
    TransporteComponent,
    SidecomComponent,
    ClimaComponent,
  ],
  imports: [
    CommonModule,
    MuniRoutingModule,
    HttpClientModule,
    RecaptchaModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    NavComponent,
    FooterComponent,
    SidecomComponent,
  ],

})
export class MuniModule { }
