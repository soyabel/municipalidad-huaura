import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent {
  constructor(
    private router: Router,
    ){

    }
  ngAfterViewInit() {
    this.initializeHamburgerMenu();
  }


  initializeHamburgerMenu() {
    const hamBurger = document.querySelector(".toggle-btn");
    const sidebar = document.querySelector("#sidebar");
    if (hamBurger && sidebar ) {
      hamBurger.addEventListener("click", () => {
        sidebar.classList.toggle("expand");
      });
    }
  }



  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (window.pageYOffset > 300) { // Mostrar el botón después de desplazarse 300px
      scrollToTopBtn?.classList.add('show');
    } else {
      scrollToTopBtn?.classList.remove('show');
    }
  }
}
