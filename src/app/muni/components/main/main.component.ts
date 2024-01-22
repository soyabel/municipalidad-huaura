import { Component } from '@angular/core';

@Component({
  selector: 'hero-main',
  templateUrl: './main.component.html',
  styles: []
})
export class MainComponent {
  redireccionNoticias() {
    window.open('https://www.gob.pe/institucion/munihuaura/noticias', '_blank');
  }
  redireccionMesaDeParte() {
    window.open('https://facilita.gob.pe/t/1779', '_blank');
  }
  redireccionSisgedo() {
    window.open('http://sisgedo2.munihuacho.gob.pe/sisgedonew/app/main.php', '_blank');
  }
}

