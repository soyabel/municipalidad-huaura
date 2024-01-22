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
  dataArbitrio: Arbitrio[]=[];
  contriArbitrio: Contribuyente[]=[];
  searchTerm: string = '';
  filteredData: any;
  constructor(private router: Router,private authService:AuthService){

  }
  ngOnInit(): void {
    this.dataArbitrio = this.authService.getDataArbitrio();
    this.contriArbitrio=this.authService.getDataContribuyenteArbitrio();
    this.filterData();
  }
  cerrarSession():void{
    this.authService.clearLocalStorageData(ConstMuniService.ARBITRIO_KEY);
    this.authService.clearLocalStorageData(ConstMuniService.ARBITRIOUSER_KEY);
    this.router.navigate(['/servicios']);
  }

  itemsPerPage = 10;
  currentPage = 1;

  get pages(): number[] {
    const pageCount = Math.ceil(this.dataArbitrio.length / this.itemsPerPage);
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
      this.filteredData = this.dataArbitrio.slice();
    } else {
      this.filteredData = this.dataArbitrio.filter((infraccion: any) =>
        Object.values(infraccion).some(
          (value: any) =>
            value &&
            value.toString().toLowerCase().includes(this.searchTerm.toLowerCase().trim())
        )
      );
    }
  }

}
