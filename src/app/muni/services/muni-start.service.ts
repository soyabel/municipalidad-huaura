import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MuniStartService {
  private apiUrl: string = 'https://localhost:44387/api/Ctacte/GetClimaHuacho';

  constructor(private httpClient: HttpClient) { }

  getClimaHuacho():Observable<any[]>{
    const url = this.apiUrl;
    return this.httpClient.get<any[]>(url).pipe(
      catchError(() => of([]))
    );
  }
}
