import { Component, OnInit, Renderer2 } from '@angular/core';
import { Fraccionamiento } from 'src/app/auth/interfaces/Fraccionamiento';
import { ConstMuniService } from '../../services/constMuni.service';
import { AuthService } from '../../services/auth.service';
import { NavigationStart, Router } from '@angular/router';
import { Contribuyente } from '../../interfaces/Contribuyente';
import { MetodosAuthService } from '../../services/metodos-auth.service';

@Component({
  selector: 'muni-fraccionamiento-page',
  templateUrl: './fraccionamiento-page.component.html',
  styles: [
  ]
})
export class FraccionamientoPageComponent implements OnInit {
  dataFracci: Fraccionamiento[] = [];
  contriUser: Contribuyente[] = [];
  searchTerm: string = '';
  filteredData: any;
  metodoAuth!: MetodosAuthService;
  debe: boolean = false;

  constructor(private router: Router,
    private authService: AuthService,
    metodoAuth: MetodosAuthService,
    private renderer: Renderer2) {
    this.metodoAuth = metodoAuth;
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.renderer.removeClass(document.body, 'modal-open');
        this.renderer.setStyle(document.body, 'overflow', 'auto');
        this.renderer.setStyle(document.body, 'padding-right', '0px');
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) {
          backdrop.parentNode?.removeChild(backdrop);
        }
      }
    });
  }
  ngOnInit(): void {
    this.dataFracci = this.authService.getDataFraccionmamiento();
    if (this.dataFracci.length>0) {
      this.debe=true;
    }
    this.contriUser = this.authService.getDataContribuyenteFraccionamiento();
    this.filterData();
  }

  totalInsoluto(): number {
    let total = this.dataFracci.reduce((acc: number, fraccionamiento: any) => acc + fraccionamiento.vdeuda, 0);
    return parseFloat(total.toFixed(2));
  }

  totalDEmision(): number {
    let total = this.dataFracci.reduce((acc: number, fraccionamiento: any) => acc + fraccionamiento.vderemi, 0);
    return parseFloat(total.toFixed(2));
  }

  totalIntereses(): number {
    let total = this.dataFracci.reduce((acc: number, fraccionamiento: any) => acc + fraccionamiento.vinte, 0);
    return parseFloat(total.toFixed(2));
  }

  totalDeuda(): number {
    let total = this.dataFracci.reduce((acc: number, fraccionamiento: any) => acc + fraccionamiento.votros, 0);
    return parseFloat(total.toFixed(2));
  }

  totalAmnistia(): number {
    let total = this.dataFracci.reduce((acc: number, fraccionamiento: any) => acc + fraccionamiento.vtotalamn, 0);
    return parseFloat(total.toFixed(2));
  }


  cerrarSession(): void {
    this.authService.clearLocalStorageData(ConstMuniService.FRACCIONAMIENTO_KEY);
    this.authService.clearLocalStorageData(ConstMuniService.FRACCIONAMIENTOUSER_KEY);
    this.router.navigate(['/servicios']);
  }

  itemsPerPage = 10;
  currentPage = 1;

  get pages(): number[] {
    const pageCount = Math.ceil(this.dataFracci.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  setCurrentPage(page: number): void {
    this.currentPage = page;
  }

  onInputClick() {
    this.currentPage = 1;
  }

  onInputFocus() {
    this.currentPage = 1;
  }


  filterData(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredData = this.dataFracci.slice();
    } else {
      this.filteredData = this.dataFracci.filter((infraccion: any) =>
        Object.values(infraccion).some(
          (value: any) =>
            value &&
            value.toString().toLowerCase().includes(this.searchTerm.toLowerCase().trim())
        )
      );
    }
  }

}
