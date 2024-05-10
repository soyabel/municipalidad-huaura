import { Component, Renderer2 } from '@angular/core';
import { Defuncion } from '../../interfaces/Defuncion';
import { AuthService } from '../../services/auth.service';
import { NavigationStart, Router } from '@angular/router';
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
    private router: Router,
    private renderer: Renderer2,
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
    this.dataDefuncion=this.muniService.getDataDefuncion();
    console.log(this.dataDefuncion);
  }


  cerrarSession():void{
    this.muniService.clearLocalStorageData(ConstMuniService.DEFUNCION_KEY);
    this.router.navigate(['/service']);
  }
}
