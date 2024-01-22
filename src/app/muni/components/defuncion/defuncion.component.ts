import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Defuncion } from 'src/app/auth/interfaces/Defuncion';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DataGenerationService } from '../../services/data-generation.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'muni-defuncion',
  templateUrl: './defuncion.component.html',
  styles: [
  ]
})
export class DefuncionComponent {
  public defuncion: Defuncion[] = [];
  defuncionForm: FormGroup;
  isSelectClicked = false;
  showErrorAlert: boolean = false;
  showErrorAlertCaptcha: boolean = false;
  showErrorAlertCampos: boolean = false;
  loading: boolean = false;
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
      nombre: ['', Validators.required],
      apellidopaterno: ['', Validators.required],
      apellidomaterno: ['', Validators.required]
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
      this.defuncionForm.updateValueAndValidity();
      const nombre = this.defuncionForm.get('nombre')?.value;
      const apellidopaterno = this.defuncionForm.get('apellidopaterno')?.value;
      const apellidomaterno = this.defuncionForm.get('apellidomaterno')?.value;

      if (nombre && apellidopaterno && apellidomaterno) {
        this.loading = true;

        this.muniService.searchDefuncion(nombre, apellidopaterno, apellidomaterno).subscribe((persona) => {
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
