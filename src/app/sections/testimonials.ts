import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Reveal } from '../shared/reveal';
import { DEPOIMENTOS } from '../site.config';

@Component({
  selector: 'app-testimonials',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Reveal],
  template: `
    @if (depoimentos.length) {
      <section class="section" id="depoimentos" aria-labelledby="depoimentos-titulo">
        <div class="container">
          <div class="section-head section-head--stack" appReveal>
            <span class="eyebrow"><span class="dot" aria-hidden="true"></span>Depoimentos</span>
            <h2 class="section-title" id="depoimentos-titulo">Quem estudou <strong>com a Luiza</strong>.</h2>
          </div>
          <div class="quote-grid">
            @for (d of depoimentos; track d.nome; let i = $index) {
              <figure class="quote" [appReveal]="i * 80">
                <blockquote>“{{ d.texto }}”</blockquote>
                <figcaption>
                  <strong>{{ d.nome }}</strong>
                  @if (d.contexto) {
                    <span>{{ d.contexto }}</span>
                  }
                </figcaption>
              </figure>
            }
          </div>
        </div>
      </section>
    }
  `,
})
export class Testimonials {
  protected readonly depoimentos = DEPOIMENTOS;
}
