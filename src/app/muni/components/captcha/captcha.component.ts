import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.css']
})
export class CaptchaComponent implements OnInit{
  @ViewChild('canvas', { static: true }) canvas?: ElementRef;
  @ViewChild('userInput', { static: true }) userInput?: ElementRef;

  private text: string = '';

  ngOnInit() {
    this.triggerFunction();
  }

  reloadCaptcha(): void {
    this.triggerFunction();
  }

  textGenerator(): string {
    let generatedText = '';
    for (let i = 0; i < 3; i++) {
      generatedText += String.fromCharCode(this.randomNumber(65, 90));
      generatedText += String.fromCharCode(this.randomNumber(97, 122));
      generatedText += String.fromCharCode(this.randomNumber(48, 57));
    }
    return generatedText;
  }

  randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  drawStringOnCanvas(string: string): void {
    //accedemos al elemento del DOM asociado a la referencia de plantilla #canvas
    let ctx: CanvasRenderingContext2D = this.canvas?.nativeElement.getContext('2d');
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  const textColor = 'white'; // Cambiar a color blanco o el color deseado
  const fontFamily = 'Franklin Gothic Medium'; // Cambiar a la fuente deseada
  const fontSize = 20; // Cambiar al tamaño de fuente deseado

  ctx.fillStyle = textColor;
  ctx.font = `${fontSize}px ${fontFamily}`;

  const totalWidth = ctx.measureText(string).width;
  const xInitialSpace = (115 - totalWidth) / 2; // Centra el texto en el canvas

  for (let i = 0; i < string.length; i++) {
    const xPosition = xInitialSpace + ctx.measureText(string.substring(0, i)).width;
    const yPosition = 25; // Ajusta la posición vertical según tu preferencia
    ctx.fillText(string[i], xPosition, yPosition);
  }
  }

  triggerFunction(): void {
    this.userInput!.nativeElement.value = '';
    this.text = this.textGenerator();
    console.log(this.text);
    this.text = [...this.text].sort(() => Math.random() - 0.5).join('');
    this.drawStringOnCanvas(this.text);
  }

  onSubmit(): void {
    if (this.userInput?.nativeElement.value === this.text) {
      alert('Success');
    } else {
      alert('Incorrect');
      this.triggerFunction();
    }
  }
}
