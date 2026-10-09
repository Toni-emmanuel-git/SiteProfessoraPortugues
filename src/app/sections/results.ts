import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Reveal } from '../shared/reveal';
import { COMPETENCIAS } from '../site.config';

@Component({
  selector: 'app-results',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Reveal],
  template: `
    <section class="section section--alt" id="resultados" aria-labelledby="resultados-titulo">
      <div class="container">
        <div class="section-head section-head--stack" appReveal>
          <span class="eyebrow"><span class="dot" aria-hidden="true"></span>Resultados</span>
          <h2 class="section-title" id="resultados-titulo">A régua do ENEM: <strong>980 de 1000</strong>.</h2>
          <p class="section-sub">
            A redação vale até 1000 pontos, divididos em 5 competências de 200 pontos. Luiza chegou a 980 e ensina o
            caminho para você chegar aos 900+.
          </p>
        </div>

        <figure
          class="ruler"
          appReveal
          role="img"
          aria-label="Gráfico: nota de 980 em 1000 pontos possíveis na redação do ENEM, dividida em cinco competências de 200 pontos."
        >
          <div class="ruler-track">
            <div class="ruler-fill"></div>
            <div class="ruler-cuts" aria-hidden="true"><span></span><span></span><span></span><span></span></div>
          </div>
          <div class="ruler-scale" aria-hidden="true">
            @for (c of competencias; track c.codigo) {
              <span>{{ c.codigo }} · 200</span>
            }
          </div>
          <figcaption class="ruler-caption">
            <strong>980</strong> / 1000 pontos · nota de Luiza na redação do ENEM
          </figcaption>
        </figure>

        <ul class="comp-grid">
          @for (c of competencias; track c.codigo; let i = $index) {
            <li class="comp" [appReveal]="i * 70">
              <span class="comp-code">{{ c.codigo }}</span>
              <h3>{{ c.nome }}</h3>
              <p>{{ c.texto }}</p>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
})
export class Results {
  protected readonly competencias = COMPETENCIAS;
}
