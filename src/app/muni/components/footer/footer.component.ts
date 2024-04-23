import { Component } from '@angular/core';

@Component({
  selector: 'muni-footer',
  templateUrl: './footer.component.html',
  styles: [
  ]
})
export class FooterComponent {
  redireccionReclamo() {
    window.open('https://reclamos.servicios.gob.pe/?institution_id=2103', '_blank');
  }

  redireccionFacebook() {
    window.open('https://www.facebook.com/MuniProvHuaura', '_blank');
  }

  redireccionInstagram() {
    window.open('https://www.instagram.com/muni_huacho/', '_blank');
  }

  redireccionYoutube() {
    window.open('https://www.youtube.com/channel/UCMgzp1c8PPfRjG5PB6lXUjA/featured', '_blank');
  }

  getCurrentYear(): number {
    return new Date().getFullYear();
  }
}
