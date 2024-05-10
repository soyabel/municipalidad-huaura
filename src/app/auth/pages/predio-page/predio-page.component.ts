import { Component, OnInit, Renderer2 } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Predio } from 'src/app/auth/interfaces/Predio';
import { AuthService } from '../../services/auth.service';
import { ConstMuniService } from '../../services/constMuni.service';
import { Contribuyente } from '../../interfaces/Contribuyente';
import { MetodosAuthService } from '../../services/metodos-auth.service';

@Component({
  selector: 'app-predio-page',
  templateUrl: './predio-page.component.html',
  styles: [
  ]
})
export class PredioPageComponent implements OnInit{
  dataPredio: Predio[]=[];
  contriUser: Contribuyente[]=[];
  searchTerm: string = '';
  filteredData: any;
  metodoAuth!: MetodosAuthService;
  debe: boolean = false;
  constructor(
    private router: Router,
    private authService:AuthService,
    metodoAuth: MetodosAuthService,
    private renderer: Renderer2){
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
    this.dataPredio = this.authService.getDataPredio();
    if (this.dataPredio.length>0) {
      this.debe=true;
    }

    this.contriUser=this.authService.getDataContribuyentePredio();
    this.filterData();
  }

  totalInsoluto():number{
    let total= this.dataPredio.reduce((acc: number, predio: any) => acc + predio.vdeuda, 0);
    return parseFloat(total.toFixed(2));
  }

  totalDEmision():number{
    let total= this.dataPredio.reduce((acc: number, predio: any) => acc + predio.vderemi, 0);
    return parseFloat(total.toFixed(2));
  }

  totalIntereses():number{
    let total= this.dataPredio.reduce((acc: number, predio: any) => acc + predio.vinte, 0);
    return parseFloat(total.toFixed(2));
  }

  totalDeuda():number{
    let total= this.dataPredio.reduce((acc: number, predio: any) => acc + predio.votros, 0);
    return parseFloat(total.toFixed(2));
  }

  totalAmnistia():number{
    let total= this.dataPredio.reduce((acc: number, predio: any) => acc + predio.vtotalamn, 0);
    return parseFloat(total.toFixed(2));
  }

  cerrarSession():void{
    this.authService.clearLocalStorageData(ConstMuniService.PREDIOS_KEY);
    this.authService.clearLocalStorageData(ConstMuniService.PREDIOSUSER_KEY);
    this.router.navigate(['/servicios']);
  }

  itemsPerPage = 10;
  currentPage = 1;

  get pages(): number[] {
    const pageCount = Math.ceil(this.dataPredio.length / this.itemsPerPage);
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
      this.filteredData = this.dataPredio.slice();
    } else {
      this.filteredData = this.dataPredio.filter((infraccion: any) =>
        Object.values(infraccion).some(
          (value: any) =>
            value &&
            value.toString().toLowerCase().includes(this.searchTerm.toLowerCase().trim())
        )
      );
    }
  }

}
