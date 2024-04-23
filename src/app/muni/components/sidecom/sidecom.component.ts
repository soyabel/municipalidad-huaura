import { Component } from '@angular/core';

@Component({
  selector: 'muni-sidecom',
  templateUrl: './sidecom.component.html',
  styles: [
  ]
})
export class SidecomComponent {
  redireccionSidecom() {
    window.open('http://www.google.com', '_blank');
  }
}
