
export interface Fraccionamiento {
  id:      string;
  contrib: string;
  tributo: string;
  tran:    string;
  aini:    string;
  peini:   string;
  recibo:  string;
  vdeuda:  number;
  vderemi: number;
  vmora:   number;
  vrecgo:  number;
  vinte:   number;
  votros:  number;
  vabon:   number;
  vdesc:   number;
  tpago:   string;
  pgctct:  number;
  fpago:   null;
  ccaj:    string;
  wsc:     string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toFraccionamiento(json: string): Fraccionamiento[] {
      return JSON.parse(json);
  }

  public static fraccionamientoToJson(value: Fraccionamiento[]): string {
      return JSON.stringify(value);
  }
}
