export interface Procedimiento {
  id_vehiculo_autorizacion: number;
  tarjeta:                  string;
  nro_tarjeta:              string;
  fecha_inicio:             Date;
  fecha_caducidad:          Date;
  tramite:                  string;
  expediente_nro:           string;
  empresa:                  string;
  servicio:                 string;
  estado:                   string;
  dias_vencidos:            string;
}
