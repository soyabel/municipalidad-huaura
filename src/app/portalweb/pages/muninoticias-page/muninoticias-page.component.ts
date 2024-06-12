import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-muninoticias-page',
  templateUrl: './muninoticias-page.component.html',
  styles: [
  ]
})
export class MuninoticiasPageComponent {
  constructor(private toastr: ToastrService) {}
  ngOnInit(): void {
    this.mostrarNotificacion();
  }

  mostrarNotificacion() {
    this.toastr.info('Realiza tus consultas en línea', 'SIDECOM',{timeOut:6000});
  }
}
