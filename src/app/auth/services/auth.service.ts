import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';

import { LocalStorageService } from 'angular-2-local-storage';
import { InfraccionPlaca } from 'src/app/auth/interfaces/InfraccionPlaca';
import { Propietario } from 'src/app/auth/interfaces/Propietario';
import { InfraccionDni } from '../interfaces/InfraccionDni';
import { ConstMuniService } from './constMuni.service';
import { Matrimonio } from '../interfaces/Matrimonio';
import { Arbitrio } from '../interfaces/Arbitrio';
import { Fraccionamiento } from '../interfaces/Fraccionamiento';
import { Predio } from '../interfaces/Predio';
import { Contribuyente } from '../interfaces/Contribuyente';
import { Nacimiento } from '../interfaces/Nacimiento';
import { Defuncion } from '../interfaces/Defuncion';
import { Transporte } from '../interfaces/Transporte';
import { Procedimiento } from '../interfaces/Procedimiento';


@Injectable({providedIn: 'root'})
export class AuthService {
//https://localhost:44387/api : local
//https://bwh09m18-44387.brs.devtunnels.ms/api : produccion

  private apiUrl: string = 'https://bwh09m18-44387.brs.devtunnels.ms/api';

  private infraccionDni: InfraccionDni[] = [];
  private infraccionePlaca: InfraccionPlaca[] = [];
  private transporte: Transporte[] = [];
  private matrimonio: Matrimonio[] = [];
  private nacimiento: Nacimiento[] = [];
  private defuncion: Defuncion[] = [];
  private predio: Predio[] = [];
  private arbitrio: Arbitrio[] = [];
  private fraccionamiento: Fraccionamiento[]=[];
  private contribuyentePredio: Contribuyente[] = [];
  private contribuyenteArbitrio: Contribuyente[] = [];
  private contribuyenteFraccinamiento: Contribuyente[] = [];
  private procedimiento: Procedimiento[] = [];

  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService)
   {
     this.infraccionDni               =   this.getStoredInfraccionesDni();
     this.infraccionePlaca            =   this.getStoredInfraccionesPlaca();
     this.matrimonio                  =   this.getStoredMatrimonio();
     this.nacimiento                  =   this.getStoredNacimiento();
     this.defuncion                   =   this.getStoredDefuncion();
     this.predio                      =   this.getStoredPredio();
     this.arbitrio                    =   this.getStoredArbitrio();
     this.fraccionamiento             =   this.getStoredFraccionmamiento();
     this.contribuyentePredio         =   this.getStoredContribuyentePredio();
     this.contribuyenteArbitrio       =   this.getStoredContribuyenteArbitrio();
     this.contribuyenteFraccinamiento =   this.getStoredContribuyenteFraccionamiento();
     this.transporte                  =   this.getStoredTransporte();
     this.procedimiento               =   this.getStoredProcedimiento();
   }

// ---------------------DNI-------------------
searchDni(term: string):Observable<InfraccionDni[]>{
  const url = `${this.apiUrl}/persona/GetInfractorTodo/${term}`;
  return this.httpClient.get<InfraccionDni[]>(url).pipe(
    tap((response) => {
      this.storeInfraccionesDni(response);
    }),
    catchError(() => {
      this.storeInfraccionesDni([]);
      return of([]);
    })
  );
}

private storeInfraccionesDni(infracciones: InfraccionDni[]): void {
  this.infraccionDni = infracciones;
  this.localStorageService.set(ConstMuniService.INFRACCIONDNI_KEY, infracciones);
}

private getStoredInfraccionesDni(): InfraccionDni[] {
  return this.localStorageService.get<InfraccionDni[]>(ConstMuniService.INFRACCIONDNI_KEY) || [];
}


getRecordsInfraccionesDni(): InfraccionDni[] {
  return this.infraccionDni;
}

// ----------------------DNI END---------------------


  // ----------------------PLACA---------------------

  searchPlaca(term: string):Observable<InfraccionPlaca[]>{
    const url = `${this.apiUrl}/persona/GetPlacaTodo/${term}`;
    return this.httpClient.get<InfraccionPlaca[]>(url).pipe(
      tap((response) => {
        this.storeInfraccionesPlaca(response);

      }),
      catchError(() => {
        this.storeInfraccionesPlaca([]);
        return of([]);
      })
    );
  }

  private storeInfraccionesPlaca(infracciones: InfraccionPlaca[]): void {
    this.infraccionePlaca = infracciones;
    this.localStorageService.set(ConstMuniService.INFRACCIONPLACA_KEY, infracciones);
  }

  private getStoredInfraccionesPlaca(): InfraccionPlaca[] {
    return this.localStorageService.get<InfraccionPlaca[]>(ConstMuniService.INFRACCIONPLACA_KEY) || [];
  }


  getDataInfraccionesPlaca(): InfraccionPlaca[] {
    return this.infraccionePlaca;
  }

  // ----------------------PLACA END---------------------

  // ----------------------TRANSPORTE---------------------

  searchTransporte(term: string):Observable<Transporte[]>{
    const url = `${this.apiUrl}/Sigave/GetAllPadron/${term}`;
    return this.httpClient.get<Transporte[]>(url).pipe(
      tap((response) => {
        this.storeTransporte(response);

      }),
      catchError(() => {
        this.storeTransporte([]);
        return of([]);
      })
    );
  }

  private storeTransporte(transporte: Transporte[]): void {
    this.transporte = transporte;
    this.localStorageService.set(ConstMuniService.TRANSPORTE_KEY, transporte);
  }

  private getStoredTransporte(): Transporte[] {
    return this.localStorageService.get<Transporte[]>(ConstMuniService.TRANSPORTE_KEY) || [];
  }


  getDataTransporte(): Transporte[] {
    return this.transporte;
  }

  searchProcedimiento(term: string):Observable<Procedimiento[]>{
    const url = `${this.apiUrl}/Sigave/GetAllProcedimiento/${term}`;
    return this.httpClient.get<Procedimiento[]>(url).pipe(
      tap((response) => {
        this.storeProcedimiento(response);

      }),
      catchError(() => {
        this.storeProcedimiento([]);
        return of([]);
      })
    );
  }

  private storeProcedimiento(procedimiento: Procedimiento[]): void {
    this.procedimiento = procedimiento;
    this.localStorageService.set(ConstMuniService.PROCEDIMIENTO_KEY, procedimiento);
  }

  private getStoredProcedimiento(): Procedimiento[] {
    return this.localStorageService.get<Procedimiento[]>(ConstMuniService.PROCEDIMIENTO_KEY) || [];
  }


  getDataProcedimiento(): Procedimiento[] {
    return this.procedimiento;
  }

  // ----------------------TRANSPORTE END---------------------

    // --------------------REGISTRO CIVIL-----------------
    searchMatrimonio(nomb: string,apep:string,apem:string,tesp:string):Observable<Matrimonio[]>{
      const url = `${this.apiUrl}/Matrimonio/GetMatrimonio?nomb=${nomb}&apep=${apep}&apem=${apem}&tesp=${tesp}`;
      return this.httpClient.get<Matrimonio[]>(url).pipe(
        tap((response) => {
          this.storeMatrimonio(response);
        }),
        catchError(() => {
          this.storeMatrimonio([]);
          return of([]);
        })
      );
    }

    private storeMatrimonio(matrimonio: Matrimonio[]): void {
      this.matrimonio = matrimonio;
      this.localStorageService.set(ConstMuniService.MATRIMONIO_KEY, matrimonio);
    }

    private getStoredMatrimonio(): Matrimonio[] {
      return this.localStorageService.get<Matrimonio[]>(ConstMuniService.MATRIMONIO_KEY) || [];
    }

    getDataMatrimonio(): Matrimonio[] {
      return this.matrimonio;
    }


    searchNacimiento(nomb: string,apep:string,apem:string):Observable<Nacimiento[]>{
      const url = `${this.apiUrl}/Nacimiento/GetNacimiento?nomb=${nomb}&apep=${apep}&apem=${apem}`;
      return this.httpClient.get<Nacimiento[]>(url).pipe(
        tap((response) => {
          this.storeNacimiento(response);
        }),
        catchError(() => {
          this.storeNacimiento([]);
          return of([]);
        })
      );
    }

    private storeNacimiento(nacimiento: Nacimiento[]): void {
      this.nacimiento = nacimiento;
      this.localStorageService.set(ConstMuniService.NACIMIENTO_KEY, nacimiento);
    }

    private getStoredNacimiento(): Nacimiento[] {
      return this.localStorageService.get<Nacimiento[]>(ConstMuniService.NACIMIENTO_KEY) || [];
    }

    getDataNacimiento(): Nacimiento[] {
      return this.nacimiento;
    }



    searchDefuncion(nomb: string,apep:string,apem:string):Observable<Defuncion[]>{
      const url = `${this.apiUrl}/Defuncion/GetDefuncion?nomb=${nomb}&apep=${apep}&apem=${apem}`;
      return this.httpClient.get<Defuncion[]>(url).pipe(
        tap((response) => {
          this.storeDefuncion(response);
        }),
        catchError(() => {
          this.storeDefuncion([]);
          return of([]);
        })
      );
    }

    private storeDefuncion(defuncion: Defuncion[]): void {
      this.defuncion = defuncion;
      this.localStorageService.set(ConstMuniService.DEFUNCION_KEY, defuncion);
    }

    private getStoredDefuncion(): Defuncion[] {
      return this.localStorageService.get<Defuncion[]>(ConstMuniService.DEFUNCION_KEY) || [];
    }

    getDataDefuncion(): Defuncion[] {
      return this.defuncion;
    }

    // --------------------REGISTRO CIVIL END-----------------

    //---------------PREDIO---------------
    searchPredio(term: string):Observable<Predio[]>{
      const url = `${this.apiUrl}/Ctacte/GetPredioCtacte/${term}`;
      return this.httpClient.get<Predio[]>(url).pipe(
        tap((response) => {
          this.storePredio(response);

        }),
        catchError(() => {
          this.storePredio([]);
          return of([]);
        })
      );
    }

    private storePredio(predio: Predio[]): void {
      this.predio = predio;
      this.localStorageService.set(ConstMuniService.PREDIOS_KEY, predio);
    }

    private getStoredPredio(): Predio[] {
      return this.localStorageService.get<Predio[]>(ConstMuniService.PREDIOS_KEY) || [];
    }

    getDataPredio(): Predio[] {
      return this.predio;
    }

    searchContribuyentePredio(codi_contri: string):Observable<Contribuyente[]>{
      const url = `${this.apiUrl}/Ctacte/GetAllContrib/${codi_contri}`;
      return this.httpClient.get<Contribuyente[]>(url).pipe(
        tap((response) => {
          this.storeContribuyentePredio(response);

        }),
        catchError(() => {
          this.storeContribuyentePredio([]);
          return of([]);
        })
      );
    }

    private storeContribuyentePredio(predio: Contribuyente[]): void {
      this.contribuyentePredio = predio;
      this.localStorageService.set(ConstMuniService.PREDIOSUSER_KEY, predio);
    }

    private getStoredContribuyentePredio(): Contribuyente[] {
      return this.localStorageService.get<Contribuyente[]>(ConstMuniService.PREDIOSUSER_KEY) || [];
    }

    getDataContribuyentePredio(): Contribuyente[] {
      return this.contribuyentePredio;
    }



    //-------------PREDIO END--------------------

    //-------------Arbitrio--------------------
    searchArbitrio(term: string):Observable<Arbitrio[]>{
      const url = `${this.apiUrl}/Ctacte/GetArbitriosCtacte/${term}`;
      return this.httpClient.get<Arbitrio[]>(url).pipe(
        tap((response) => {
          this.storeArbitrio(response);
        }),
        catchError(() => {
          this.storeArbitrio([]);
          return of([]);
        })
      );
    }

    private storeArbitrio(arbitrio: Arbitrio[]): void {
      this.arbitrio = arbitrio;
      this.localStorageService.set(ConstMuniService.ARBITRIO_KEY, arbitrio);
    }

    private getStoredArbitrio(): Arbitrio[] {
      return this.localStorageService.get<Arbitrio[]>(ConstMuniService.ARBITRIO_KEY) || [];
    }

    getDataArbitrio(): Arbitrio[] {
      return this.arbitrio;
    }

    searchContribuyenteArbitrio(codi_contri: string):Observable<Contribuyente[]>{
      const url = `${this.apiUrl}/Ctacte/GetAllContrib/${codi_contri}`;
      return this.httpClient.get<Contribuyente[]>(url).pipe(
        tap((response) => {
          this.storeContribuyenteArbitrio(response);

        }),
        catchError(() => {
          this.storeContribuyenteArbitrio([]);
          return of([]);
        })
      );
    }

    private storeContribuyenteArbitrio(contri: Contribuyente[]): void {
      this.contribuyenteArbitrio = contri;
      this.localStorageService.set(ConstMuniService.ARBITRIOUSER_KEY, contri);
    }

    private getStoredContribuyenteArbitrio(): Contribuyente[] {
      return this.localStorageService.get<Contribuyente[]>(ConstMuniService.ARBITRIOUSER_KEY) || [];
    }

    getDataContribuyenteArbitrio(): Contribuyente[] {
      return this.contribuyenteArbitrio;
    }

     //-------------Arbitrio END--------------------

     //------------Fraccionamiento----------------

    searchFraccionamiento(term: string):Observable<Fraccionamiento[]>{
      const url = `${this.apiUrl}/Ctacte/GetFracTribCtacte/${term}`;
      return this.httpClient.get<Fraccionamiento[]>(url).pipe(
        tap((response) => {
          this.storeFraccionmamiento(response);
        }),
        catchError(() => {
          this.storeFraccionmamiento([]);
          return of([]);
        })
      );
    }

    private storeFraccionmamiento(fraccionamiento: Fraccionamiento[]): void {
      this.fraccionamiento = fraccionamiento;
      this.localStorageService.set(ConstMuniService.FRACCIONAMIENTO_KEY, fraccionamiento);
    }

    private getStoredFraccionmamiento(): Fraccionamiento[] {
      return this.localStorageService.get<Fraccionamiento[]>(ConstMuniService.FRACCIONAMIENTO_KEY) || [];
    }

    getDataFraccionmamiento(): Fraccionamiento[] {
      return this.fraccionamiento;
    }

    searchContribuyenteFraccionamiento(codi_contri: string):Observable<Contribuyente[]>{
      const url = `${this.apiUrl}/Ctacte/GetAllContrib/${codi_contri}`;
      return this.httpClient.get<Contribuyente[]>(url).pipe(
        tap((response) => {
          this.storeContribuyenteFraccionamiento(response);

        }),
        catchError(() => {
          this.storeContribuyenteFraccionamiento([]);
          return of([]);
        })
      );
    }

    private storeContribuyenteFraccionamiento(contri: Contribuyente[]): void {
      this.contribuyenteFraccinamiento = contri;
      this.localStorageService.set(ConstMuniService.FRACCIONAMIENTOUSER_KEY, contri);
    }

    private getStoredContribuyenteFraccionamiento(): Contribuyente[] {
      return this.localStorageService.get<Contribuyente[]>(ConstMuniService.FRACCIONAMIENTOUSER_KEY) || [];
    }

    getDataContribuyenteFraccionamiento(): Contribuyente[] {
      return this.contribuyenteFraccinamiento;
    }

      //------------Fraccionamiento END----------------

  hasLocalStorageData(localStorageKey: string): boolean {
    const data = this.localStorageService.get(localStorageKey);
    return Array.isArray(data) && data.length > 0;
  }

  clearLocalStorageData(localStorageKey: string): void {
    this.localStorageService.remove(localStorageKey);
    this.infraccionePlaca=this.getStoredInfraccionesPlaca();
  }

  searchPropietario(codi_inct: string, codi_cnta: string, anio_cnta: string, fech_noti: string, plac: string):Observable<Propietario[]>{
    const url = `${this.apiUrl}/PropietarioVehiculo/GetPropietarioVehiculo?codi_inct=${codi_inct}&codi_cnta=${codi_cnta}&anio_cnta=${anio_cnta}&fech_noti=${fech_noti}&plac=${plac}`;
    return this.httpClient.get<Propietario[]>(url).pipe(

      catchError(() => of([]))
    );
  }


}
