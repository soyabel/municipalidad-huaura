import { Component, Input } from '@angular/core';

declare var bootstrap: any;
@Component({
  selector: 'gallery-pw',
  templateUrl: './gallery-pw.component.html',
  styleUrls: ['./gallery-pw.component.css']
})
export class GalleryPwComponent {
  @Input() imagenes: any;
  modalImageSrc: string = '';

  openModal(imageSrc: string): void {
    this.modalImageSrc = imageSrc;
    const modalElement = document.getElementById('gallery-modal');
    if (modalElement) {
      const bsModal = new bootstrap.Modal(modalElement);
      bsModal.show();
    }
  }


}
