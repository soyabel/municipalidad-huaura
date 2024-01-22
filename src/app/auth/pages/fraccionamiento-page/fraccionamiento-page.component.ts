import { Component, OnInit } from '@angular/core';
import { Fraccionamiento } from 'src/app/auth/interfaces/Fraccionamiento';
import { ConstMuniService } from '../../services/constMuni.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Contribuyente } from '../../interfaces/Contribuyente';

@Component({
  selector: 'muni-fraccionamiento-page',
  templateUrl: './fraccionamiento-page.component.html',
  styles: [
  ]
})
export class FraccionamientoPageComponent implements OnInit{
  dataFracci: Fraccionamiento[]=[];
  contriUser: Contribuyente[]=[];
  searchTerm: string = '';
  filteredData: any;
  constructor(private router: Router,private authService:AuthService){

  }
  ngOnInit(): void {
    this.dataFracci = this.authService.getDataFraccionmamiento();
    this.contriUser=this.authService.getDataContribuyenteFraccionamiento();
    this.filterData();
  }
  cerrarSession():void{
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
