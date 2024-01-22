import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InfraccionDni } from 'src/app/auth/interfaces/InfraccionDni';
import { Propietario } from 'src/app/auth/interfaces/Propietario';

import { AuthService } from '../../services/auth.service';
import { ConstMuniService } from '../../services/constMuni.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './papeletadni-page.component.html',
})
export class PapeletadniPageComponent implements OnInit {
  showSpinner: boolean = true;
  indexRowTable: number=0;
  data: InfraccionDni[]=[];
  searchTerm: string = '';
  filteredData: any;
  public propietario: Propietario[] = [];
  public propietarioData: any;
  totalSaldo: number = 0;
  constructor(
    private router: Router,
    private muniService: AuthService
    ) { }



  ngOnInit():void {
    this.data = this.muniService.getRecordsInfraccionesDni();
    this.filterData();
    this.calculateTotalSaldo();
    this.calcularSaldoCosta()
  }


  cerrarSessionDni():void{
    this.muniService.clearLocalStorageData(ConstMuniService.INFRACCIONDNI_KEY);
    this.router.navigate(['/servicios']);
  }

  calculateTotalSaldo():number {
    return this.data.reduce((acc: number, infraccion: any) => acc + infraccion.sald_pago, 0);
  }

  calcularSaldoCosta():number {
    return this.data.reduce((acc: number, infraccion: any) => acc + infraccion.sald_costas, 0);
  }


  searchPropietario(codi_inct: string, codi_cnta: string, anio_cnta: string, fech_noti: string, plac: string,index: number) {
    this.indexRowTable=index;
    this.muniService.searchPropietario(codi_inct,codi_cnta,anio_cnta,fech_noti, plac).subscribe((persona) => {
      this.propietarioData = persona;
      this.showSpinner=false;
      if (this.propietarioData.length>0) {

        return this.propietarioData;
      }else{
        this.propietarioData=[{
          "razo_soc": "No tiene reponsabilidad solidaria"
          }]
        return  this.propietarioData;
      }
    });

  }


  isPropietarioDataDefined(): boolean {
    return this.propietarioData && Object.keys(this.propietarioData).length > 0;
  }

  itemsPerPage = 10;
  currentPage = 1;

  get pages(): number[] {
    const pageCount = Math.ceil(this.data.length / this.itemsPerPage);
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

  getEstadoClass(estado: string): string {

    switch (estado.toLowerCase()) {
      case "debe":
        return 'badge rounded-pill bg-danger d-flex justify-content-center btn-sm';
        break;
      case "cancelado":
        return 'badge rounded-pill bg-success d-flex justify-content-center btn-sm';
        break;
      case "fraccionado":
        return 'badge rounded-pill bg-secondary d-flex justify-content-center btn-sm';
        break;
      case "anulado":
        return 'badge rounded-pill bg-primary d-flex justify-content-center btn-sm';
        break;
      case "prescrito":
        return 'badge rounded-pill bg-info d-flex justify-content-center btn-sm';
        break;
      case "a cuenta":
        return 'badge rounded-pill bg-light d-flex justify-content-center btn-sm';
        break;
      case "no pecunear":
        return 'badge rounded-pill bg-success d-flex justify-content-center btn-sm';
        break;
      case "caducado":
        return 'badge rounded-pill bg-warning d-flex justify-content-center btn-sm';
        break;
      default:
        return 'badge';
        break;
    }

  }

  filterData(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredData = this.data.slice();
    } else {
      this.filteredData = this.data.filter((infraccion: any) =>
        Object.values(infraccion).some(
          (value: any) =>
            value &&
            value.toString().toLowerCase().includes(this.searchTerm.toLowerCase().trim())
        )
      );
    }
  }
}
