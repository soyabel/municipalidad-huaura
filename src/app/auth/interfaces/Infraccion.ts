export interface Infraccion {
  doid_pers: string;
  razo_soc:  RazoSoc;
  desc_tpin: DescTpin;
  nume_pape: string;
  codi_inte: string;
  desc_infr: string;
  fech_noti: Date;
  tota_pago: number;
  mont_pago: number;
  mont_dsct: number;
  sald_pago: number;
  placa:     string;
  estado:    Estado;
  resp_prop: boolean;
  ubicacion: Ubicacion;
  codi_inct: string;
  codi_cnta: string;
  anio_cnta: string;
}

export enum DescTpin {
  ActaDeControlDeTransporte = "ACTA DE CONTROL DE TRANSPORTE",
  PapeletaDeTransito = "PAPELETA DE TRANSITO",
}

export enum Estado {
  Cancelado = "CANCELADO",
  Debe = "DEBE",
  Fraccionado = "FRACCIONADO",
}

export enum RazoSoc {
  OlivaRiosJesusAnthony = "OLIVA RIOS JESUS ANTHONY",
}

export enum Ubicacion {
  Gccoi = "GCCOI",
  Oecnt = "OECNT",
  Sgf = "SGF",
}
