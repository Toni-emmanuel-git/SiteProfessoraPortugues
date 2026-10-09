import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  signal,
} from '@angular/core';

/**
 * Card de número com contador animado.
 * Quando o card entra na tela, o número sobe de 0 até o valor final (uma única vez).
 * - No servidor / sem JavaScript / "reduzir movimento": mostra o valor final direto.
 * - Leitores de tela leem apenas o valor final (o número animado fica oculto para eles).
 */
@Component({
  selector: 'app-stat-counter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="stat-card">
      <p class="stat-num">
        <span class="sr-only">{{ finalText() }}</span>
        <span aria-hidden="true">{{ shownText() }}</span>
      </p>
      <p class="stat-label">{{ label() }}</p>
    </div>
  `,
})
export class StatCounter {
  readonly value = input.required<number>();
  readonly label = input.required<string>();
  readonly prefix = input('');
  readonly suffix = input('');
  /** Duração da contagem em milissegundos. */
  readonly duration = input(1800);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly destroyRef = inject(DestroyRef);
  private readonly formatter = new Intl.NumberFormat('pt-BR');

  /** null = ainda não animou (mostra o valor final). */
  private readonly current = signal<number | null>(null);
  private frame = 0;

  protected readonly finalText = computed(
    () => `${this.prefix()}${this.formatter.format(this.value())}${this.suffix()}`,
  );

  protected readonly shownText = computed(() => {
    const c = this.current();
    const n = c === null ? this.value() : Math.round(c);
    return `${this.prefix()}${this.formatter.format(n)}${this.suffix()}`;
  });

  constructor() {
    afterNextRender(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced || !('IntersectionObserver' in window)) return;

      this.current.set(0);
      const io = new IntersectionObserver(
        (entries) => {
          if (!entries.some((e) => e.isIntersecting)) return;
          io.disconnect();
          this.animate();
        },
        { threshold: 0.5 },
      );
      io.observe(this.host);

      this.destroyRef.onDestroy(() => {
        io.disconnect();
        cancelAnimationFrame(this.frame);
      });
    });
  }

  private animate(): void {
    const target = this.value();
    const duration = this.duration();
    const start = performance.now();

    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t); // easeOutExpo
      this.current.set(target * eased);
      if (t < 1) this.frame = requestAnimationFrame(step);
    };
    this.frame = requestAnimationFrame(step);
  }
}
