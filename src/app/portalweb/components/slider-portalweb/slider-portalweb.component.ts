import { Component } from '@angular/core';

@Component({
  selector: 'slider-portalweb',
  templateUrl: './slider-portalweb.component.html',
  styleUrls: ['./slider-portalweb.component.css']
})
export class SliderPortalwebComponent {
  imageObject: Array<object> = [
    {
      image: 'assets/img/obras1.jpg',
      thumbImage: 'assets/img/obras1.jpg',
      alt: 'Image 1',
      title: 'AV. BALTAZAR LA ROSA'
    },
    {
      image: 'assets/img/obras2.jpg',
      thumbImage: 'assets/img/obras2.jpg',
      alt: 'Image 2',
      title: 'AV. MARIA PARADO'
    },
    {
      image: 'assets/img/obras3.jpg',
      thumbImage: 'assets/img/obras3.jpg',
      alt: 'Image 2',
      title: 'AA.HH. ATALAYA'
    },
    {
      image: 'assets/img/obras4.jpg',
      thumbImage: 'assets/img/obras4.jpg',
      alt: 'Image 2',
      title: 'AV. MIGUEL GRAU'
    },
    {
      image: 'assets/img/obras5.jpg',
      thumbImage: 'assets/img/obras5.jpg',
      alt: 'Image 2',
      title: 'AV. SAN MARTIN'
    }
  ];

  sliderOptions = {
    animationSpeed: 1,  // Velocidad de la animación (segundos)
    animationType: 'slide',  // Tipo de animación: 'slide' o 'fade'
    infinite: true,  // Reproducción infinita
    imageSize: {
      width: '100%',  // Ajusta el ancho de la imagen
      height: '500px'  // Ajusta la altura de la imagen
    }
  };

}
