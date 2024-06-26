import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DataGenerationService } from '../../services/data-generation.service';
import { NavigationStart, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { Transporte } from 'src/app/auth/interfaces/Transporte';
import { Subject, Subscription, catchError, forkJoin, of, takeUntil, tap } from 'rxjs';
import { Procedimiento } from 'src/app/auth/interfaces/Procedimiento';

@Component({
  selector: 'muni-transporte',
  templateUrl: './transporte.component.html',
  styles: [
  ]
})
export class TransporteComponent implements OnInit{
  transporteForm: FormGroup;
  public transporte: Transporte[] = [];
  public procedimiento: Procedimiento[] = [];
  showErrorAlert: boolean = false;
  showErrorAlertCaptcha: boolean = false;
  showErrorAlertCampos: boolean = false;
  loading: boolean = false;
  private text: string = '';
  private destroy$ = new Subject<void>();

  @ViewChild('canvas', { static: true }) canvas?: ElementRef;
  @ViewChild('userInput', { static: true }) userInput?: ElementRef;



  constructor(
    private authService: AuthService,
    private dataGeneration: DataGenerationService,
    private router: Router,
    private renderer: Renderer2,
    private fb: FormBuilder,
    private viewportScroller: ViewportScroller,
  ) {
    this.transporteForm = this.fb.group({
      transporte: ['', Validators.required],
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

  ngOnInit(): void {
    this.triggerFunction();
  }
  ngOnDestroy(): void {
    this.destroy$.next(); // Emite un valor para finalizar todas las suscripciones
    this.destroy$.complete(); // Completar el Subject
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


  onSubmit() {
    if (this.userInput?.nativeElement.value.toUpperCase() === this.text) {
      this.transporteForm.updateValueAndValidity();
      const transporte = this.transporteForm.get('transporte')?.value;
      if (transporte) {
        this.loading = true;
        const searchTransporte$ = this.authService.searchTransporte(transporte).pipe(

          tap((transporteData) => {
            this.transporte = transporteData;
          }),
          catchError(() => {
            this.transporte = [];
            return of([]);
          })
        );

        const searchProcedimiento$ = this.authService.searchProcedimiento(transporte).pipe(
          tap((procedimientoData) => {
            this.procedimiento = procedimientoData;
          }),
          catchError(() => {
            this.procedimiento = [];
            return of([]);
          })
        );

       forkJoin([searchTransporte$, searchProcedimiento$])
        .pipe(
          takeUntil(this.destroy$) // Cancela la suscripción cuando se emite un valor en el destroy$
        ).subscribe(
          ([transporteData, procedimientoData]) => {
            if (transporteData.length > 0 && procedimientoData.length > 0) {
              this.cleanupBootstrapStyles();
              this.router.navigate(['/auth/transporte']);
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

// Método para limpiar el componente y cancelar la suscripción
closeModal(): void {
  this.destroy$.next(); // Emitir un valor para cancelar la suscripción
  this.cleanupBootstrapStyles(); // Limpiar estilos
  this.loading = false; // Restablecer el estado de carga
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
