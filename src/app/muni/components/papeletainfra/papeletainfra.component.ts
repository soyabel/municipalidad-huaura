//import { Component } from '@angular/core';

import { Component, Renderer2} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';


@Component({
  selector: 'muni-papeletainfra',
  templateUrl: './papeletainfra.component.html',
  styles: [
  ]
})
export class PapeletainfraComponent {
  constructor(
    private router: Router,
    private renderer: Renderer2){
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
}
