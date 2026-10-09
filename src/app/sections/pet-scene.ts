import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { birdAt, dogAt, DURATION } from './pet-timeline';

/**
 * Easter egg do rodapé: a cachorrinha da Luiza corre atrás de um passarinho.
 * - Toca uma vez, quando o rodapé aparece; clicar na cena repete.
 * - Decorativa: fica oculta para leitores de tela (o botão de repetir tem rótulo).
 * - Com "reduzir movimento", mostra só a cachorrinha parada.
 * Os desenhos são SVG e a animação usa apenas transform (leve).
 */
@Component({
  selector: 'app-pet-scene',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="pet-stage" #stage>
      <div class="bird" #bird aria-hidden="true">
        <svg class="bird-svg" viewBox="0 -6 44 38" width="40" height="35" focusable="false">
          <g class="bird-bob">
            <g class="b-legs">
              <line x1="18" y1="22" x2="17" y2="29" />
              <line x1="23" y1="22" x2="24" y2="29" />
            </g>
            <path class="b-tail" d="M10 16 L1 11 L3 20 Z" />
            <ellipse class="b-body" cx="21" cy="17" rx="11.5" ry="7" />
            <g class="b-wing">
              <path d="M26 13.5 C 24 5, 13 4, 4.5 11.5 C 11 12.5 14 16.5 20 17.5 C 23 17.8 25.5 16.5 26 13.5 Z" />
            </g>
            <g class="b-head">
              <circle class="b-body" cx="32" cy="12" r="5.8" />
              <path class="b-beak" d="M37 10.6 L43.5 13 L37 15.2 Z" />
              <circle class="b-eye" cx="33.8" cy="10.8" r="1.2" />
            </g>
          </g>
        </svg>
      </div>

      <div class="dog" #dog aria-hidden="true">
        <svg class="dog-svg" viewBox="0 0 120 84" width="92" height="64" focusable="false">
          <g class="dog-bob">
            <!-- pernas do lado de lá -->
            <g class="leg leg--bf">
              <line x1="40" y1="56" x2="40" y2="76" />
              <circle class="paw" cx="40" cy="77" r="3.7" />
            </g>
            <g class="leg leg--ff">
              <line x1="75" y1="56" x2="75" y2="76" />
              <circle class="paw" cx="75" cy="77" r="3.7" />
            </g>
            <!-- rabinho -->
            <g class="tail"><path d="M29 47 C 19 45 12 37 15 26" /></g>
            <!-- corpo -->
            <ellipse class="fur" cx="52" cy="48" rx="28" ry="14.5" />
            <ellipse class="fur-light" cx="55" cy="57" rx="20" ry="5.5" />
            <!-- pernas do lado de cá -->
            <g class="leg leg--bn">
              <line x1="33" y1="56" x2="33" y2="76" />
              <circle class="paw" cx="33" cy="77" r="3.7" />
            </g>
            <g class="leg leg--fn">
              <line x1="68" y1="56" x2="68" y2="76" />
              <circle class="paw" cx="68" cy="77" r="3.7" />
            </g>
            <!-- cabeça -->
            <g class="head">
              <ellipse class="fur-dark" cx="93" cy="21" rx="4.8" ry="8" transform="rotate(24 93 21)" />
              <ellipse class="fur" cx="75" cy="44" rx="11" ry="12" />
              <circle class="fur" cx="86" cy="32" r="13.5" />
              <ellipse class="fur-light" cx="97.5" cy="37.5" rx="9" ry="6.6" />
              <ellipse class="nose" cx="104.5" cy="35.2" rx="3.4" ry="2.7" />
              <path class="mouth" d="M99 41.5 Q103 44 107 41" />
              <path class="brow" d="M87 25.5 Q91 23.5 94.5 25.5" />
              <g class="eye">
                <ellipse cx="91" cy="29.5" rx="2.4" ry="2.7" />
                <circle class="glint" cx="91.9" cy="28.5" r="0.8" />
              </g>
              <path class="beads beads--light" d="M67 40 Q72 56 88 47" />
              <path class="beads beads--dark" d="M67 40 Q72 56 88 47" />
              <g class="ear">
                <ellipse class="fur-dark" cx="79" cy="33" rx="6.5" ry="11.5" transform="rotate(14 79 33)" />
              </g>
            </g>
          </g>
        </svg>
      </div>

      <button type="button" class="pet-replay" aria-label="Repetir a animação da cachorrinha" (click)="replay()"></button>
    </div>
  `,
})
export class PetScene {
  private readonly stage = viewChild.required<ElementRef<HTMLElement>>('stage');
  private readonly dog = viewChild.required<ElementRef<HTMLElement>>('dog');
  private readonly bird = viewChild.required<ElementRef<HTMLElement>>('bird');
  private readonly destroyRef = inject(DestroyRef);

  private frame = 0;
  private timer = 0;
  private played = false;
  private reduced = false;
  private lastDog = '';
  private lastBird = '';

  constructor() {
    afterNextRender(() => {
      this.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.render(0);

      if (!this.reduced && 'IntersectionObserver' in window) {
        const io = new IntersectionObserver(
          (entries) => {
            if (!this.played && entries.some((e) => e.isIntersecting)) {
              this.played = true;
              this.play();
            }
          },
          { threshold: 0.7 },
        );
        io.observe(this.stage().nativeElement);
        this.destroyRef.onDestroy(() => io.disconnect());
      }

      this.destroyRef.onDestroy(() => {
        cancelAnimationFrame(this.frame);
        clearTimeout(this.timer);
      });
    });
  }

  protected replay(): void {
    if (this.reduced) return;
    const stage = this.stage().nativeElement;
    cancelAnimationFrame(this.frame);
    clearTimeout(this.timer);
    stage.classList.add('is-resetting');
    this.timer = window.setTimeout(() => {
      this.render(0);
      stage.classList.remove('is-resetting');
      this.play();
    }, 280);
  }

  private play(): void {
    cancelAnimationFrame(this.frame);
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(DURATION, (now - start) / 1000);
      this.render(t);
      if (t < DURATION) this.frame = requestAnimationFrame(tick);
    };
    this.frame = requestAnimationFrame(tick);
  }

  private render(t: number): void {
    const width = this.stage().nativeElement.clientWidth;
    const dog = this.dog().nativeElement;
    const bird = this.bird().nativeElement;

    const d = dogAt(t, width);
    dog.style.transform = `translate3d(${d.x.toFixed(1)}px,0,0)`;
    if (d.state !== this.lastDog) {
      this.lastDog = d.state;
      dog.classList.toggle('is-run', d.state === 'run');
      dog.classList.toggle('is-look', d.state === 'look');
    }

    const b = birdAt(t, width);
    bird.style.transform = `translate3d(${b.x.toFixed(1)}px,${(-b.y).toFixed(1)}px,0) scaleX(${b.facing})`;
    bird.style.opacity = b.visible ? '1' : '0';
    const birdKey = b.state;
    if (birdKey !== this.lastBird) {
      this.lastBird = birdKey;
      bird.classList.toggle('is-fly', b.state === 'fly');
      bird.classList.toggle('is-peck', b.state === 'peck');
    }
  }
}
