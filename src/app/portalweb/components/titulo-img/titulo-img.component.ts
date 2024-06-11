import { Component, Input } from '@angular/core';

@Component({
  selector: 'portalweb-titulo-img',
  templateUrl: './titulo-img.component.html',
  styles: [
  ]
})
export class TituloImgComponent {
  @Input() titulo: string = '';
}
