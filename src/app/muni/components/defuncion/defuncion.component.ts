import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
import { Defuncion } from 'src/app/auth/interfaces/Defuncion';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DataGenerationService } from '../../services/data-generation.service';
import { ViewportScroller } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'muni-defuncion',
  templateUrl: './defuncion.component.html',
  styles: [
  ]
})
export class DefuncionComponent {
  private destroy$ = new Subject<void>();
  public defuncion: Defuncion[] = [];
  defuncionForm: FormGroup;
  isSelectClicked = false;
  showErrorAlert: boolean = false;
  showErrorAlertCaptcha: boolean = false;
  showErrorAlertCampos: boolean = false;
  loading: boolean = false;
  isSubmitted: boolean = false;
  private text: string = '';

  @ViewChild('canvas', { static: true }) canvas?: ElementRef;
  @ViewChild('userInput', { static: true }) userInput?: ElementRef;

  constructor(
    private muniService: AuthService,
    private dataGeneration: DataGenerationService,
    private fb: FormBuilder,
    private router: Router,
    private renderer: Renderer2,
    private viewportScroller: ViewportScroller
  ) {
    this.defuncionForm = this.fb.group({
      nombre: ['', [Validators.required,Validators.minLength(2)]],
      apellidopaterno: ['', [Validators.required,Validators.minLength(2)]],
      apellidomaterno: ['', [Validators.required,Validators.minLength(2)]]
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



  onSubmit() {
    this.isSubmitted = true;
    if (this.userInput?.nativeElement.value.toUpperCase() === this.text) {
      this.defuncionForm.updateValueAndValidity();
      const nombre = this.defuncionForm.get('nombre')?.value;
      const apellidopaterno = this.defuncionForm.get('apellidopaterno')?.value;
      const apellidomaterno = this.defuncionForm.get('apellidomaterno')?.value;

      if (nombre && apellidopaterno && apellidomaterno) {
        this.loading = true;

        this.muniService.searchDefuncion(nombre, apellidopaterno, apellidomaterno)
        .pipe(takeUntil(this.destroy$))
        .subscribe((persona) => {
          this.defuncion = persona;

          if (this.defuncion.length > 0) {
            this.cleanupBootstrapStyles()
            this.router.navigate(['/auth/defuncion']);
            this.scrollToTop();
          } else {
            this.loading = false;
            this.showErrorAlert = true;
            setTimeout(() => {
              this.triggerFunction();
              this.showErrorAlert = false;
              this.isSubmitted = false;
            }, 4000);
          }
        });


      } else {
        this.showErrorAlertCampos=true;
        setTimeout(() => {
          this.triggerFunction();
          this.showErrorAlertCampos = false;
          this.isSubmitted = false;
        }, 3000);
      }
    } else {
      this.showErrorAlertCaptcha = true;
      setTimeout(() => {
        this.showErrorAlertCaptcha = false;
        this.triggerFunction();
        this.isSubmitted = false;
      }, 3000);

    }

  }

  closeModal(): void {
    this.destroy$.next();
    this.cleanupBootstrapStyles();
    this.loading=false;
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
