import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
import { Arbitrio } from 'src/app/auth/interfaces/Arbitrio';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Subject, catchError, forkJoin, of, takeUntil, tap } from 'rxjs';
import { Contribuyente } from 'src/app/auth/interfaces/Contribuyente';
import { DataGenerationService } from '../../services/data-generation.service';
import { ViewportScroller } from '@angular/common';


@Component({
  selector: 'muni-arbitrio',
  templateUrl: './arbitrio.component.html',
  styles: [
  ]
})
export class ArbitrioComponent {
  private destroy$ = new Subject<void>();
  arbitrioForm: FormGroup;
  public arbitrio: Arbitrio[] = [];
  public contribuyenteArbitrio: Contribuyente[] = [];
  showErrorAlert: boolean = false;
  showErrorAlertCaptcha: boolean = false;
  showErrorAlertCampos: boolean = false;
  loading: boolean = false;
  isSubmitted: boolean = false;

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
    private viewportScroller: ViewportScroller
  ) {
    this.arbitrioForm = this.fb.group({
      arbitrio: ['', Validators.required],
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
    this.loading=false;
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
    this.isSubmitted=true;
    if (this.userInput?.nativeElement.value.toUpperCase() === this.text) {
      this.arbitrioForm.updateValueAndValidity();
      const arbitrio = this.arbitrioForm.get('arbitrio')?.value;
      if (arbitrio) {
        this.loading = true;
        const arbitrioConCeros = this.completarConCeros(arbitrio);
        const searchArbitrio$ = this.authService.searchArbitrio(arbitrioConCeros).pipe(

          tap((arbitrioData) => {
            this.arbitrio = arbitrioData;
          }),
          catchError(() => {
            this.arbitrio = [];
            return of([]);
          })
        );

        const searchContribuyenteArbitrio$ = this.authService.searchContribuyenteArbitrio(arbitrioConCeros).pipe(
          tap((contribuyenteData) => {
            this.contribuyenteArbitrio = contribuyenteData;
          }),
          catchError(() => {
            this.contribuyenteArbitrio = [];
            return of([]);
          })
        );

        forkJoin([searchArbitrio$, searchContribuyenteArbitrio$])
        .pipe(
          takeUntil(this.destroy$)
        )
        .subscribe(
          ([arbitrioData, contribuyenteData]) => {
            if (arbitrioData.length > 0 || contribuyenteData.length > 0) {
              this.cleanupBootstrapStyles();
              this.router.navigate(['/auth/arbitrio']);
              this.scrollToTop();
            } else {
              this.loading = false;
              this.showErrorAlert = true;
              setTimeout(() => {
                this.showErrorAlert = false;
                this.triggerFunction();
                this.isSubmitted=false;
              }, 4000);
            }
          });


      } else {
        this.showErrorAlertCampos=true;
        setTimeout(() => {
          this.triggerFunction();
          this.showErrorAlertCampos = false;
          this.isSubmitted=false;
        }, 3000);
      }
    } else {
      this.showErrorAlertCaptcha = true;
      setTimeout(() => {
        this.showErrorAlertCaptcha = false;
        this.triggerFunction();
        this.isSubmitted=false;
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
