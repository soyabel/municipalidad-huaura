import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'muni-nav',
  templateUrl: './nav.component.html',
  styles: [
  ]
})
export class NavComponent {

  constructor(private router: Router) {}

  navegarA(route: string, event: Event): void {
    event.preventDefault();
    this.router.navigate([route]);
  }

}
