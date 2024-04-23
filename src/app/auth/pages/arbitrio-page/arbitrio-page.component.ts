import { Component, OnInit } from '@angular/core';
import { Arbitrio } from 'src/app/auth/interfaces/Arbitrio';
import { Contribuyente } from '../../interfaces/Contribuyente';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ConstMuniService } from '../../services/constMuni.service';

@Component({
  selector: 'app-arbitrio-page',
  templateUrl: './arbitrio-page.component.html',
  styles: [
  ]
})
export class ArbitrioPageComponent implements  OnInit{
  dataArbitrio: any;
  contriArbitrio: Contribuyente[]=[];
  searchTerm: string = '';
  filteredData: any;
  nuevosDatos: any;
  detalles: any;
  tituloDetalles?: string;
  constructor(private router: Router,private authService:AuthService){

  }
  ngOnInit(): void {
    this.dataArbitrio = this.authService.getDataArbitrio();
    this.contriArbitrio=this.authService.getDataContribuyenteArbitrio();
    this.datosconvertidos();
    this.filterData();

  }


  masDetalles(index:number):void{
    this.detalles= this.nuevosDatos[index].datos;
   this.tituloDetalles= `${this.detalles[0].tran}: ${this.detalles[0].aini} Predio ${this.detalles[0].secid}` ;
   }

datosconvertidos(): void{
  const agrupado: any = this.dataArbitrio.reduce((acc: any, curr: any) => {
    const key = `${curr.tran}-${curr.aini}-${curr.secid}`;
    if (!acc[key]) {
        acc[key] = {
            tran: curr.tran,
            aini: curr.aini,
            secid: curr.secid,
            datos: []
        };
    }
    acc[key].datos.push(curr);
    return acc;
}, {});
this.nuevosDatos = Object.values(agrupado);
}

totalInsoluto():number{
  let total= this.dataArbitrio.reduce((acc: number, arbitrio: any) => acc + arbitrio.vdeuda, 0);
  return parseFloat(total.toFixed(2));
}

totalDEmision():number{
  let total= this.dataArbitrio.reduce((acc: number, arbitrio: any) => acc + arbitrio.vderemi, 0);
  return parseFloat(total.toFixed(2));
}

totalIntereses():number{
  let total= this.dataArbitrio.reduce((acc: number, arbitrio: any) => acc + arbitrio.vinte, 0);
  return parseFloat(total.toFixed(2));
}

totalDeuda():number{
  let total= this.dataArbitrio.reduce((acc: number, arbitrio: any) => acc + arbitrio.votros, 0);
  return parseFloat(total.toFixed(2));
}

totalAmnistia():number{
  let total= this.dataArbitrio.reduce((acc: number, arbitrio: any) => acc + arbitrio.vtotalamn, 0);
  return parseFloat(total.toFixed(2));
}


  cerrarSession():void{
    this.authService.clearLocalStorageData(ConstMuniService.ARBITRIO_KEY);
    this.authService.clearLocalStorageData(ConstMuniService.ARBITRIOUSER_KEY);
    this.router.navigate(['/servicios']);
  }

  itemsPerPage = 10;
  currentPage = 1;

  get pages(): number[] {
    const pageCount = Math.ceil(this.nuevosDatos.length / this.itemsPerPage);
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
      this.filteredData = this.nuevosDatos.slice();
    } else {
      this.filteredData = this.nuevosDatos.filter((infraccion: any) =>
        Object.values(infraccion).some(
          (value: any) =>
            value &&
            value.toString().toLowerCase().includes(this.searchTerm.toLowerCase().trim())
        )
      );
    }
  }


}
