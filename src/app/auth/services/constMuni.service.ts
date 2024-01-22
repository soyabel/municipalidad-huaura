import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ConstMuniService {
  public static readonly INFRACCIONDNI_KEY        = 'infraccionDniKey';
  public static readonly INFRACCIONPLACA_KEY      = 'infraccionPlacaKey';
  public static readonly MATRIMONIO_KEY           = 'matrimonioKey';
  public static readonly NACIMIENTO_KEY           = 'nacimientoKey';
  public static readonly DEFUNCION_KEY            = 'defuncionKey';
  public static readonly PREDIOS_KEY              = 'prediosKey';
  public static readonly PREDIOSUSER_KEY          = 'prediosUserKey'
  public static readonly ARBITRIO_KEY             = 'arbitrioKyey';
  public static readonly ARBITRIOUSER_KEY         = 'arbitrioUserKey';
  public static readonly FRACCIONAMIENTO_KEY      = 'fraccionamientoKey';
  public static readonly FRACCIONAMIENTOUSER_KEY  = 'fraccionamientoUserKey';
}
