import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Matrimonio } from 'src/app/auth/interfaces/Matrimonio';
import { ConstMuniService } from 'src/app/auth/services/constMuni.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-matrimonio-page',
  templateUrl: './matrimonio-page.component.html',
  styles: [
  ]
})
export class MatrimonioPageComponent implements OnInit{
dataRegistroCivil: Matrimonio[]=[];
constructor(
  private muniService: AuthService,
  private router: Router
  ){
}

ngOnInit(): void {

  this.dataRegistroCivil=this.muniService.getDataMatrimonio();

}


cerrarSession():void{
  this.muniService.clearLocalStorageData(ConstMuniService.MATRIMONIO_KEY);
  this.router.navigate(['/service']);
}
}
