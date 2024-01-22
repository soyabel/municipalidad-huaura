// To parse this data:
//
//   import { Convert } from "./file";
//
//   const welcome = Convert.toWelcome(json);

export interface Propietario {
  codi_inct: string;
  codi_cnta: string;
  anio_cnta: string;
  doid_pers: string;
  razo_soc:  string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toWelcome(json: string): Propietario[] {
      return JSON.parse(json);
  }

  public static welcomeToJson(value: Propietario[]): string {
      return JSON.stringify(value);
  }
}
