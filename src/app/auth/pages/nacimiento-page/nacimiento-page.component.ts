import { Component } from '@angular/core';
import { Nacimiento } from '../../interfaces/Nacimiento';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ConstMuniService } from '../../services/constMuni.service';

@Component({
  selector: 'app-nacimiento-page',
  templateUrl: './nacimiento-page.component.html',
  styles: [
  ]
})
export class NacimientoPageComponent {
  dataNacimiento: Nacimiento[]=[];
constructor(
  private muniService: AuthService,
  private router: Router
  ){
}

ngOnInit(): void {
  this.dataNacimiento=this.muniService.getDataNacimiento();
}


cerrarSession():void{
  this.muniService.clearLocalStorageData(ConstMuniService.NACIMIENTO_KEY);
  this.router.navigate(['/service']);
}
}
