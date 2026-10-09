import { ChangeDetectionStrategy, Component, computed, DOCUMENT, inject, signal } from '@angular/core';
import { AgendarLink } from '../shared/agendar-link';
import { DEPOIMENTOS } from '../site.config';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AgendarLink],
  host: {
    '(window:scroll)': 'onScroll()',
    '(document:keydown.escape)': 'close()',
  },
  template: `
    <header class="site-header" [class.is-scrolled]="scrolled()">
      <div class="container container--wide">
        <nav class="nav" aria-label="Principal">
          <a class="brand" href="#inicio" (click)="close()">
            <span class="brand-mark" aria-hidden="true">L</span>
            Luiza Claure
          </a>

          <div class="nav-links">
            @for (l of links(); track l.href) {
              <a [href]="l.href">{{ l.label }}</a>
            }
          </div>

          <a class="btn btn--primary btn--sm nav-cta" appAgendar>Agendar aula</a>

          <button
            class="nav-toggle"
            type="button"
            [attr.aria-expanded]="open()"
            aria-controls="mobile-drawer"
            [attr.aria-label]="open() ? 'Fechar menu' : 'Abrir menu'"
            (click)="toggle()"
          >
            <span></span><span></span>
          </button>
        </nav>
      </div>

      <div class="drawer" id="mobile-drawer" [class.open]="open()" [attr.aria-hidden]="!open()">
        <div class="container">
          @for (l of links(); track l.href) {
            <a [href]="l.href" (click)="close()" [attr.tabindex]="open() ? 0 : -1">{{ l.label }}</a>
          }
          <a class="btn btn--primary" appAgendar (click)="close()" [attr.tabindex]="open() ? 0 : -1">
            Agendar aula
          </a>
        </div>
      </div>
    </header>
  `,
})
export class Header {
  private readonly doc = inject(DOCUMENT);

  protected readonly open = signal(false);
  protected readonly scrolled = signal(false);

  protected readonly links = computed(() => {
    const all = [
      { href: '#sobre', label: 'Sobre' },
      { href: '#aulas', label: 'Aulas' },
      { href: '#metodo', label: 'Método' },
      { href: '#resultados', label: 'Resultados' },
      { href: '#depoimentos', label: 'Depoimentos' },
      { href: '#conheca', label: 'Conheça' },
    ];
    return DEPOIMENTOS.length ? all : all.filter((l) => l.href !== '#depoimentos');
  });

  protected toggle(): void {
    this.setOpen(!this.open());
  }

  protected close(): void {
    if (this.open()) this.setOpen(false);
  }

  protected onScroll(): void {
    this.scrolled.set((this.doc.defaultView?.scrollY ?? 0) > 8);
  }

  private setOpen(value: boolean): void {
    this.open.set(value);
    this.doc.body.classList.toggle('no-scroll', value);
  }
}
