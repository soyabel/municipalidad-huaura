import { Component, HostListener, Renderer2 } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'muni-main',
  templateUrl: './main.component.html',
  styles: []
})
export class MainComponent {

  constructor(
    private router: Router,
    private renderer: Renderer2) {
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


  redireccionNoticias() {
    window.open('https://www.gob.pe/institucion/munihuaura/noticias', '_blank');
  }
  redireccionMesaDeParte() {
    window.open('https://facilita.gob.pe/t/1779', '_blank');
  }
  redireccionSisgedo() {
    window.open('http://sisgedo2.munihuacho.gob.pe/sisgedonew/app/main.php', '_blank');
  }
  redireccionSidecom() {
    window.open('http://www.google.com', '_blank');
  }
}

