import { Component, HostListener, Renderer2, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'muni-main',
  templateUrl: './main.component.html',
  styles: []
})
export class MainComponent {


  constructor(
    private router: Router,
    private renderer: Renderer2,
    private toastr: ToastrService
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

  ngOnInit(): void {
    this.mostrarNotificacion();
  }

  mostrarNotificacion() {
    this.toastr.info('El futuro de Huacho depende de tus tributos','Municipalidad Provincial de Huaura', { timeOut: 5000 });
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

}

