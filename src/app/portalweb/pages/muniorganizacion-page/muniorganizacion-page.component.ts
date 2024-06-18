import { Component, Renderer2 } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';


declare var bootstrap: any;
@Component({
  selector: 'app-muniorganizacion-page',
  templateUrl: './muniorganizacion-page.component.html',
  styles: [
  ]
})
export class MuniorganizacionPageComponent {
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
    { src: 'assets/img/org1.jpg' },
    { src: 'assets/img/org2.jpg' },
    { src: 'assets/img/org3.jpg' },
    { src: 'assets/img/org4.jpg' },
    { src: 'assets/img/org5.jpg' }
    // Add more images as needed
  ];

  modalImageSrc: string = '';

  openModal(imageSrc: string): void {
    this.modalImageSrc = imageSrc;
    const modalElement = document.getElementById('gallery-modal');
    if (modalElement) {
      // Using jQuery (ensure you have included jQuery in your project)
      // $(modalElement).modal('show');

      // If using Bootstrap 5 without jQuery
      const bsModal = new bootstrap.Modal(modalElement);
      bsModal.show();
    }
  }

}
