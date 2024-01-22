import { Component, ElementRef, Inject, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Fraccionamiento } from '../../../auth/interfaces/Fraccionamiento';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { catchError, forkJoin, of, tap } from 'rxjs';
import { Contribuyente } from 'src/app/auth/interfaces/Contribuyente';
import { DataGenerationService } from '../../services/data-generation.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'muni-fraccionamiento',
  templateUrl: './fraccionamiento.component.html',
  styles: [
  ]
})
export class FraccionamientoComponent {
  fraccionamientoForm: FormGroup;
  public fraccionamiento: Fraccionamiento[] = [];
  public contribuyenteFracc: Contribuyente[] = [];
  showErrorAlert: boolean = false;
  showErrorAlertCaptcha: boolean = false;
  showErrorAlertCampos: boolean = false;
  loading: boolean = false;

  private text: string = '';

  @ViewChild('canvas', { static: true }) canvas?: ElementRef;
  @ViewChild('userInput', { static: true }) userInput?: ElementRef;

  ngOnInit(): void {
    this.triggerFunction();
  }

  constructor(
    private authService: AuthService,
    private dataGeneration: DataGenerationService,
    private router: Router,
    private renderer: Renderer2,
    private fb: FormBuilder,
    private viewportScroller: ViewportScroller,

  ) {
    this.fraccionamientoForm = this.fb.group({
      fraccionamiento: ['', Validators.required],
    });
  }

  reloadCaptcha(): void {
    this.triggerFunction();
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
    this.text = this.dataGeneration.textGenerator();
    this.text = [...this.text].sort(() => Math.random() - 0.5).join('');
    this.drawStringOnCanvas(this.text);
  }


  completarConCeros(numero: number): string {
    const numeroString = numero.toString();
    const longitudActual = numeroString.length;

    if (longitudActual >= 10) {
      return numeroString; // El número ya tiene al menos 10 dígitos
    } else {
      const cerosFaltantes = '0'.repeat(10 - longitudActual);
      return cerosFaltantes + numeroString;
    }
  }


  onSubmit() {
    if (this.userInput?.nativeElement.value === this.text) {
      this.fraccionamientoForm.updateValueAndValidity();
      const fraccionamiento = this.fraccionamientoForm.get('fraccionamiento')?.value;

      if (fraccionamiento) {
        this.loading = true;
        const fraccConCeros = this.completarConCeros(fraccionamiento);
        const searchFraccionamiento$ = this.authService.searchFraccionamiento(fraccConCeros).pipe(

          tap((fraccionamientoData) => {
            this.fraccionamiento = fraccionamientoData;
          }),
          catchError(() => {
            this.fraccionamiento = []; // Almacenar un array vacío en caso de error
            return of([]);
          })
        );

        const searchContribuyenteFraccionamiento$ = this.authService.searchContribuyenteFraccionamiento(fraccConCeros).pipe(
          tap((contribuyenteFraccData) => {
            this.contribuyenteFracc = contribuyenteFraccData;
          }),
          catchError(() => {
            this.contribuyenteFracc = []; // Almacenar un array vacío en caso de error
            return of([]);
          })
        );

        forkJoin([searchFraccionamiento$, searchContribuyenteFraccionamiento$]).subscribe(
          ([fraccionamientoData, contribuyenteFraccData]) => {
            // Verifica si ambos conjuntos de datos tienen información
            if (fraccionamientoData.length > 0 && contribuyenteFraccData.length > 0) {
              // Realiza la redirección sin agregar información a la URL
              this.cleanupBootstrapStyles();
              this.router.navigate(['/auth/fraccionamiento']);
              this.scrollToTop();
            } else {
              this.loading = false;
              this.showErrorAlert = true;
              setTimeout(() => {
                this.showErrorAlert = false;
                this.triggerFunction();
              }, 4000);
            }
          });


      } else {
        this.showErrorAlertCampos=true;
        setTimeout(() => {
          this.triggerFunction();
          this.showErrorAlertCampos = false;
        }, 3000);
      }
    } else {
      this.showErrorAlertCaptcha = true;
      setTimeout(() => {
        this.showErrorAlertCaptcha = false;
        this.triggerFunction();
      }, 3000);

    }


  }


  private cleanupBootstrapStyles() {
    // Elimina las clases y estilos de Bootstrap del body
    this.renderer.removeClass(document.body, 'modal-open');
    this.renderer.setStyle(document.body, 'overflow', 'auto');
    this.renderer.setStyle(document.body, 'padding-right', '0px');
    this.removeBackdrop();
  }

  private removeBackdrop() {
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.parentNode?.removeChild(backdrop);
    }
  }

  private scrollToTop(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

}
