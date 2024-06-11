import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Predio } from '../../../auth/interfaces/Predio';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Contribuyente } from 'src/app/auth/interfaces/Contribuyente';
import { Subject, catchError, forkJoin, of, takeUntil, tap } from 'rxjs';
import { DataGenerationService } from '../../services/data-generation.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'muni-predio',
  templateUrl: './predio.component.html',
  styles: [
  ]
})
export class PredioComponent {
  predioForm: FormGroup;
  public predio: Predio[] = [];
  public contribuyente: Contribuyente[] = [];
  showErrorAlert: boolean = false;
  showErrorAlertCaptcha: boolean = false;
  showErrorAlertCampos: boolean = false;
  loading: boolean = false;
  private destroy$ = new Subject<void>();

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
    this.predioForm = this.fb.group({
      predio: ['', Validators.required],
    });

    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.renderer.removeClass(document.body, 'modal-open');
        this.renderer.setStyle(document.body, 'overflow', 'auto');
        this.renderer.setStyle(document.body, 'padding-right', '0px');
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) {
          backdrop.parentNode?.removeChild(backdrop);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  reloadCaptcha(): void {
    this.triggerFunction();
  }

  drawStringOnCanvas(string: string): void {
    let ctx: CanvasRenderingContext2D = this.canvas?.nativeElement.getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const textColor = 'white';
    const fontFamily = 'Franklin Gothic Medium';
    const fontSize = 20;

    ctx.fillStyle = textColor;
    ctx.font = `${fontSize}px ${fontFamily}`;

    const totalWidth = ctx.measureText(string).width;
    const xInitialSpace = (115 - totalWidth) / 2;

    for (let i = 0; i < string.length; i++) {
      const xPosition = xInitialSpace + ctx.measureText(string.substring(0, i)).width;
      const yPosition = 25;
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
      return numeroString;
    } else {
      const cerosFaltantes = '0'.repeat(10 - longitudActual);
      return cerosFaltantes + numeroString;
    }
  }



  onSubmit() {
    if (this.userInput?.nativeElement.value.toUpperCase() === this.text) {

      this.predioForm.updateValueAndValidity();
      const predio = this.predioForm.get('predio')?.value;
      if (predio) {
        this.loading = true;
        const predioConCeros = this.completarConCeros(predio);
        const searchPredio$ = this.authService.searchPredio(predioConCeros).pipe(

          tap((predioData) => {
            this.predio = predioData;
          }),
          catchError(() => {
            this.predio = [];
            return of([]);
          })
        );

        const searchContribuyente$ = this.authService.searchContribuyentePredio(predioConCeros).pipe(
          tap((contribuyenteData) => {
            this.contribuyente = contribuyenteData;
          }),
          catchError(() => {
            this.contribuyente = [];
            return of([]);
          })
        );

        forkJoin([searchPredio$, searchContribuyente$])
        .pipe(
          takeUntil(this.destroy$)
        ).subscribe(
          ([predioData, contribuyenteData]) => {
            if (predioData.length > 0 || contribuyenteData.length > 0) {
              this.cleanupBootstrapStyles();
              this.router.navigate(['/auth/predio']);
              this.scrollToTop();
            } else {
              this.loading = false;
              this.showErrorAlert = true;
              setTimeout(() => {
                this.showErrorAlert = false;
                this.triggerFunction();
              }, 4000);
            }
          }
        );



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

  closeModal(): void {
    this.destroy$.next();
    this.cleanupBootstrapStyles();
    this.loading = false;
  }

  private cleanupBootstrapStyles() {
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
