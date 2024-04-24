import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataGenerationService {

  constructor() { }
  textGenerator(): string {
    let generatedText = '';
    for (let i = 0; i < 2; i++) {
      generatedText += String.fromCharCode(this.randomNumber(65, 90));
      generatedText += String.fromCharCode(this.randomNumber(48, 57));
    }
    return generatedText;
  }

  randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
