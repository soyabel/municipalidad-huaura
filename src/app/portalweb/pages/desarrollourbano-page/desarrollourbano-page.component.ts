import { Component, Renderer2 } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-desarrollourbano-page',
  templateUrl: './desarrollourbano-page.component.html',
  styles: [
  ]
})
export class DesarrollourbanoPageComponent {
  constructor(
    private router: Router,
    private renderer: Renderer2,

  ) {

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


  images = [
    { src: 'assets/img/gdur/gdur1.jpg' },
    { src: 'assets/img/gdur/gdur2.jpg' },
    { src: 'assets/img/gdur/gdur3.jpg' },
    { src: 'assets/img/gdur/gdur4.jpg' },
    { src: 'assets/img/gdur/gdur5.jpg' },
    { src: 'assets/img/gdur/gdur6.jpg' },
  ];
}
