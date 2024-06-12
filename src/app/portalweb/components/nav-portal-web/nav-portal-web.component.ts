import { Component } from '@angular/core';
import { Router } from '@angular/router';
declare var bootstrap: any;
@Component({
  selector: 'nav-portal-web',
  templateUrl: './nav-portal-web.component.html',
  styles: [
  ]
})
export class NavPortalWebComponent {

  constructor(
    private router: Router,
    ){

    }

    navegarA(route: string, event: Event): void {
      event.preventDefault();
      this.router.navigate([route]);
    }

    abriWebExterna(url: string): void {
      window.open(url, '_blank');
    }

    closeOffcanvas() {
      const offcanvasElement = document.getElementById('menuLateral');
      if (offcanvasElement) {
        const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);
        if (offcanvasInstance) {
          offcanvasInstance.hide();
        }
      }
    }

}
