import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var bootstrap: any;
@Component({
  selector: 'nav-portal-web',
  templateUrl: './nav-portal-web.component.html',
  styles: [
  ]
})
export class NavPortalWebComponent {
  selectedItem: string | null = null;
  private timeout: boolean=true;
  private delay = 5000;
  constructor(
    private router: Router,
    private toastr: ToastrService
    ){

    }



    seleccionarItem(item: string) {
      this.selectedItem = item;
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

    onHover() {

      if (this.timeout) {
        this.mostrarNotificacion();
        this.timeout=false;
      }

      setTimeout(() => {
        this.timeout=true;
      }, this.delay);
    }

    mostrarNotificacion() {
      this.toastr.info('Sistema de consultas municipales', 'SIDECOM', { timeOut: 5000 });
    }

}
