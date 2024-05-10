import { Component, OnInit, Renderer2 } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
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
  private router: Router,
  private renderer: Renderer2
  ){
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.renderer.removeClass(document.body, 'modal-open');
        this.renderer.setStyle(document.body, 'overflow', 'auto');
        this.renderer.setStyle(document.body, 'padding-right', '0px');
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) {
          backdrop.parentNode?.removeChild(backdrop);
        }
      }
    });
}

ngOnInit(): void {

  this.dataRegistroCivil=this.muniService.getDataMatrimonio();
  console.log(this.dataRegistroCivil);
}


cerrarSession():void{
  this.muniService.clearLocalStorageData(ConstMuniService.MATRIMONIO_KEY);
  this.router.navigate(['/service']);
}
}
