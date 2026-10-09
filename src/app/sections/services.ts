import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Reveal } from '../shared/reveal';
import { AgendarLink } from '../shared/agendar-link';
import { SERVICOS } from '../site.config';

@Component({
  selector: 'app-services',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Reveal, AgendarLink],
  template: `
    <section class="section section--alt" id="aulas" aria-labelledby="aulas-titulo">
      <div class="container container--wide">
        <div class="section-head" appReveal>
          <div>
            <span class="eyebrow"><span class="dot" aria-hidden="true"></span>Aulas e serviços</span>
            <h2 class="section-title" id="aulas-titulo">Tudo o que você precisa para <strong>escrever melhor</strong>.</h2>
          </div>
          <a class="btn btn--ghost" appAgendar>Agendar aula <span aria-hidden="true">→</span></a>
        </div>

        <div class="bento">
          @for (s of servicos; track s.titulo; let i = $index) {
            <article class="bento-card" [class.bento-card--feature]="s.destaque" [appReveal]="i * 80">
              <span class="tag">{{ s.tag }}</span>
              <h3>{{ s.titulo }}</h3>
              <p>{{ s.texto }}</p>
            </article>
          }
        </div>
      </div>
    </section>
  `,
})
export class Services {
  protected readonly servicos = SERVICOS;
}
