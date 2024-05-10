import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MetodosAuthService {

  constructor() { }

  formatoMoneda(amount: number): string {
    const formattedAmount = amount.toFixed(2);
    const parts = formattedAmount.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }
}
