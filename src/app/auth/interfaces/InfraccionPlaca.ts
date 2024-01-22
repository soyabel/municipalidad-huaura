// To parse this data:
//
//   import { Convert } from "./file";
//
//   const infraccionPlaca = Convert.toInfraccionPlaca(json);

export interface InfraccionPlaca {
  doid_pers:      string;
  razo_soc:       string;
  desc_tpin:      string;
  nume_pape:      string;
  codi_inte:      string;
  desc_infr:      string;
  fech_noti:      Date;
  tota_pago:      number;
  mont_pago:      number;
  mont_dsct:      number;
  sald_pago:      number;
  placa:          string;
  estado:         string;
  resp_prop:      boolean;
  ubicacion:      string;
  codi_inct:      string;
  codi_cnta:      string;
  anio_cnta:      string;
  sald_costas:    number;
  nomb_ubicacion: string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toInfraccionPlaca(json: string): InfraccionPlaca[] {
      return JSON.parse(json);
  }

  public static infraccionPlacaToJson(value: InfraccionPlaca[]): string {
      return JSON.stringify(value);
  }
}
