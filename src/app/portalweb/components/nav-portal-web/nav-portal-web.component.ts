import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'nav-portal-web',
  templateUrl: './nav-portal-web.component.html',
  styles: [
  ]
})
export class NavPortalWebComponent {

  constructor(
    private router: Router,
    ){

    }
  muniNoticias():void{
    this.router.navigate(['portalweb/noticias']);
  }
  muniInformacion():void{
    this.router.navigate(['portalweb/informacion']);
  }
  muniOrganizacion():void{
    this.router.navigate(['portalweb/organizacion']);
  }
  serviciosSidecom():void{
    this.router.navigate(['/servicios']);
  }
}
