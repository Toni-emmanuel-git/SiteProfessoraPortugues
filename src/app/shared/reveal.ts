import { afterNextRender, Directive, ElementRef, inject, input, numberAttribute } from '@angular/core';

/**
 * Faz o elemento "aparecer" suavemente ao entrar na tela.
 * - No servidor (SSR) e sem JavaScript o conteúdo fica visível normalmente.
 * - Respeita "reduzir movimento" do sistema.
 * - Elementos que já estão na primeira tela não são animados.
 */
@Directive({ selector: '[appReveal]' })
export class Reveal {
  /** Atraso em milissegundos, ex.: appReveal="120". */
  readonly delay = input(0, { alias: 'appReveal', transform: (v: unknown) => numberAttribute(v, 0) });

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  constructor() {
    afterNextRender(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced || !('IntersectionObserver' in window)) return;
      if (this.el.getBoundingClientRect().top < window.innerHeight * 0.9) return;

      this.el.classList.add('reveal-pending');
      const io = new IntersectionObserver(
        (entries) => {
          if (!entries.some((e) => e.isIntersecting)) return;
          io.disconnect();
          this.el.style.transitionDelay = `${this.delay()}ms`;
          this.el.classList.add('reveal-in');
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
      );
      io.observe(this.el);
    });
  }
}
