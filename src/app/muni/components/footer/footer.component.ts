import { Component } from '@angular/core';

@Component({
  selector: 'muni-footer',
  templateUrl: './footer.component.html',
  styles: [
  ]
})
export class FooterComponent {

  getCurrentYear(): number {
    return new Date().getFullYear();
  }
}
