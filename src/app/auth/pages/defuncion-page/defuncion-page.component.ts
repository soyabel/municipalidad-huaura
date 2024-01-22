import { Component } from '@angular/core';
import { Defuncion } from '../../interfaces/Defuncion';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ConstMuniService } from '../../services/constMuni.service';

@Component({
  selector: 'app-defuncion-page',
  templateUrl: './defuncion-page.component.html',
  styles: [
  ]
})
export class DefuncionPageComponent {
  dataDefuncion: Defuncion[]=[];
  constructor(
    private muniService: AuthService,
    private router: Router
    ){
  }

  ngOnInit(): void {
    this.dataDefuncion=this.muniService.getDataDefuncion();
  }


  cerrarSession():void{
    this.muniService.clearLocalStorageData(ConstMuniService.DEFUNCION_KEY);
    this.router.navigate(['/service']);
  }
}
