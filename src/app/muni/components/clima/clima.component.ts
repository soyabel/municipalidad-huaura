import { Component } from '@angular/core';
import { MuniStartService } from '../../services/muni-start.service';
import { Map, tileLayer } from 'leaflet';

@Component({
  selector: 'muni-clima',
  templateUrl: './clima.component.html',
  styles: [
  ]
})
export class ClimaComponent {
  climaHuacho: any;
  fechaActual: string;
  temp?: number;
  descripcion?: string;
  icono?: string;
  humedad?: string;
  presionAtmosferica?: string;

  constructor(private muniStart: MuniStartService) {
    const fechaActual = new Date();
    const dia = fechaActual.getDate();
    const mes = fechaActual.toLocaleString('default', { month: 'long' });
    const año = fechaActual.getFullYear();
    this.fechaActual = `${dia} de ${mes} del ${año}`;
    console.log(this.fechaActual);
  }
  ngOnInit(): void {
    this.getClima();
  }

  ngAfterViewInit(): void {
    const map = new Map('map').setView([-11.1090,-77.6100], 13);
    tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
      maxZoom: 20,
      attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);;

  }

  getClima() {

    this.muniStart.getClimaHuacho().subscribe((persona) => {
      this.climaHuacho = persona;
      this.temp = Math.round(this.climaHuacho["main"]["temp"] - 273.15);
      this.humedad = this.climaHuacho["main"]["humidity"];
      this.presionAtmosferica = this.climaHuacho["main"]["pressure"];
      const texto = this.climaHuacho["weather"][0]["description"];
      this.descripcion = texto.charAt(0).toUpperCase() + texto.slice(1);
      this.icono = this.climaHuacho["weather"][0]["icon"];
    });

  }
}
