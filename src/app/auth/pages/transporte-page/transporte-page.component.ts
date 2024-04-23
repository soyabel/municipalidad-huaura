import { Component, Renderer2 } from '@angular/core';
import { Transporte } from '../../interfaces/Transporte';
import { AuthService } from '../../services/auth.service';
import { NavigationStart, Router } from '@angular/router';
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
    this.dataTransporte=this.muniService.getDataTransporte();
    this.dataProcedimiento=this.muniService.getDataProcedimiento();
  }


  cerrarSession():void{
    this.muniService.clearLocalStorageData(ConstMuniService.TRANSPORTE_KEY);
    this.muniService.clearLocalStorageData(ConstMuniService.PROCEDIMIENTO_KEY);
    this.router.navigate(['/service']);
  }
}
