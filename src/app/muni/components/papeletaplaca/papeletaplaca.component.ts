import { Component, ElementRef, Inject, OnInit, Renderer2, ViewChild} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { InfraccionPlaca } from 'src/app/auth/interfaces/InfraccionPlaca';
import { DataGenerationService } from '../../services/data-generation.service';
import { ViewportScroller } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'muni-papeletaplaca',
  templateUrl: './papeletaplaca.component.html',
  styles: [
  ]
})
export class PapeletaplacaComponent implements OnInit{
  private destroy$ = new Subject<void>();
  papeletaplacaForm: FormGroup;
  public infraccionPlaca: InfraccionPlaca[] = [];
  showErrorAlert: boolean = false;
  showErrorAlertCampos: boolean = false;
  showErrorAlertCaptcha: boolean = false;
  loading: boolean = false;
  private text: string = '';


  @ViewChild('canvas', { static: true }) canvas?: ElementRef;
  @ViewChild('userInput', { static: true }) userInput?: ElementRef;

    constructor(
      private muniService: AuthService,
      private dataGeneration: DataGenerationService,
      private router: Router,
      private renderer: Renderer2,
      private fb: FormBuilder,
      private viewportScroller: ViewportScroller
    ) {
      this.papeletaplacaForm = this.fb.group({
        placa: ['', Validators.required],
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
      if (this.userInput?.nativeElement.value.toUpperCase() === this.text) {

      this.papeletaplacaForm.updateValueAndValidity();
      const dni = this.papeletaplacaForm.get('placa')?.value;
        if (dni) {
          this.loading=true;
          this.muniService.searchPlaca(dni)
          .pipe(takeUntil(this.destroy$))
          .subscribe((persona) => {
            this.infraccionPlaca = persona;

            if (this.infraccionPlaca.length > 0) {
              this.cleanupBootstrapStyles();
              this.router.navigate(['/auth/papeletaplaca']);
              this.scrollToTop();

            }else{
              this.loading = false;
              this.showErrorAlert = true;
              setTimeout(() => {
                this.triggerFunction();
                this.showErrorAlert = false;
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


      }else{
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
