import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Reveal } from '../shared/reveal';
import { STATS } from '../site.config';
import { StatCounter } from './stat-counter';

@Component({
  selector: 'app-stats',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [StatCounter, Reveal],
  template: `
    <section class="section section--paper" id="numeros" aria-labelledby="numeros-titulo">
      <div class="container">
        <h2 class="section-title section-title--center" id="numeros-titulo" appReveal>
          Luiza em <strong>números</strong>
        </h2>
        <div class="stat-grid">
          @for (s of stats; track s.label) {
            <app-stat-counter [value]="s.value" [prefix]="s.prefix ?? ''" [suffix]="s.suffix ?? ''" [label]="s.label" />
          }
        </div>
      </div>
    </section>
  `,
})
export class Stats {
  protected readonly stats = STATS;
}
