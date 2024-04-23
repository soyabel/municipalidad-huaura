import { Component } from '@angular/core';
import { Transporte } from '../../interfaces/Transporte';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ConstMuniService } from '../../services/constMuni.service';
import { Procedimiento } from '../../interfaces/Procedimiento';

@Component({
  selector: 'app-transporte-page',
  templateUrl: './transporte-page.component.html',
  styles: [
  ]
})
export class TransportePageComponent {
  dataTransporte: Transporte[]=[];
  dataProcedimiento: Procedimiento[]=[];
  constructor(
    private muniService: AuthService,
    private router: Router
    ){
  }

  ngOnInit(): void {
    this.dataTransporte=this.muniService.getDataTransporte();
    this.dataProcedimiento=this.muniService.getDataProcedimiento();
  }


  cerrarSession():void{
    this.muniService.clearLocalStorageData(ConstMuniService.TRANSPORTE_KEY);
    this.muniService.clearLocalStorageData(ConstMuniService.PROCEDIMIENTO_KEY);
    this.router.navigate(['/service']);
  }
}
