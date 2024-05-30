import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'muni-nav',
  templateUrl: './nav.component.html',
  styles: [
  ]
})
export class NavComponent {

  constructor(private router: Router) {}

  navegarPortalWeb() {
    this.router.navigate(['/servicios/portalweb']);
  }


  redireccionTramites() {
    window.open('https://www.gob.pe/institucion/munihuaura/tramites-y-servicios', '_blank');
  }

  redireccionNoticias() {
    window.open('https://www.gob.pe/institucion/munihuaura/noticias', '_blank');
  }

}
