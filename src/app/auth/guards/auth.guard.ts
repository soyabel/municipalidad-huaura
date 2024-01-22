import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({providedIn: 'root'})
export class AuthGuard{

  constructor(private muniService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const localStorageKey = route.data['localStorageKey'];

    if (localStorageKey && this.muniService.hasLocalStorageData(localStorageKey)) {
      this.muniService.getDataInfraccionesPlaca();
      return true;
    }

    this.router.navigate(['/servicios']);
    return false;
  }

}
