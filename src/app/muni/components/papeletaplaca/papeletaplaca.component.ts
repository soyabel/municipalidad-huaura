import { Component, ElementRef, Inject, OnInit, Renderer2, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { InfraccionPlaca } from 'src/app/auth/interfaces/InfraccionPlaca';
import { DataGenerationService } from '../../services/data-generation.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'muni-papeletaplaca',
  templateUrl: './papeletaplaca.component.html',
  styles: [
  ]
})
export class PapeletaplacaComponent implements OnInit{
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

    }
  ngOnInit(): void {
    this.triggerFunction();
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

    onSubmit() {
      if (this.userInput?.nativeElement.value === this.text) {

      this.papeletaplacaForm.updateValueAndValidity();
      const dni = this.papeletaplacaForm.get('placa')?.value;
        if (dni) {
          this.loading=true;
          this.muniService.searchPlaca(dni).subscribe((persona) => {
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
