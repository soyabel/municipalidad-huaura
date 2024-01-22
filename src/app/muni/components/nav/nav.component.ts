import { Component } from '@angular/core';

@Component({
  selector: 'muni-nav',
  templateUrl: './nav.component.html',
  styles: [
  ]
})
export class NavComponent {

  redireccionTransparencia() {
    window.open('https://www.transparencia.gob.pe/enlaces/pte_transparencia_enlaces.aspx?id_entidad=12122#.YaD89tBBw3s', '_blank');
  }

  redireccionTramites() {
    window.open('https://www.gob.pe/institucion/munihuaura/tramites-y-servicios', '_blank');
  }

  redireccionNoticias() {
    window.open('https://www.gob.pe/institucion/munihuaura/noticias', '_blank');
  }

}
