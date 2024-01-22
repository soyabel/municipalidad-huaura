import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Predio } from 'src/app/auth/interfaces/Predio';
import { AuthService } from '../../services/auth.service';
import { ConstMuniService } from '../../services/constMuni.service';
import { Contribuyente } from '../../interfaces/Contribuyente';

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
  constructor(private router: Router,private authService:AuthService){

  }
  ngOnInit(): void {
    this.dataPredio = this.authService.getDataPredio();
    this.contriUser=this.authService.getDataContribuyentePredio();
    this.filterData();
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
