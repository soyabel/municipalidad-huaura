import { Component} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-muninoticias-page',
  templateUrl: './muninoticias-page.component.html',
  styles: [
  ]
})
export class MuninoticiasPageComponent  {

  constructor(private toastr: ToastrService,private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.toastr.clear();
      }
    });
   }
  ngOnInit(): void {
    this.mostrarNotificacion();
  }

  mostrarNotificacion() {
    this.toastr.info('Realiza tus consultas en línea', 'SIDECOM', { timeOut: 5000 });
  }

}
