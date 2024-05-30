import { Component } from '@angular/core';

@Component({
  selector: 'muni-sidecom',
  templateUrl: './sidecom.component.html',
  styles: [
  ]
})
export class SidecomComponent {
  redireccionSidecom() {
    window.open('https://play.google.com/store/apps/details?id=com.munihuacho.mphh', '_blank');
  }
}
