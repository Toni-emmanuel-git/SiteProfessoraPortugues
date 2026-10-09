import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Reveal } from '../shared/reveal';
import { PASSOS } from '../site.config';

@Component({
  selector: 'app-method',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Reveal],
  template: `
    <section class="section" id="metodo" aria-labelledby="metodo-titulo">
      <div class="container method-grid">
        <div class="method-intro" appReveal>
          <span class="eyebrow"><span class="dot" aria-hidden="true"></span>Metodologia</span>
          <h2 class="section-title" id="metodo-titulo">Do diagnóstico à <strong>nota que você quer</strong>.</h2>
          <p>
            Um caminho claro, em etapas, em que cada aula tem um objetivo e cada texto escrito volta com orientação
            para você melhorar.
          </p>
        </div>

        <ol class="steps">
          @for (p of passos; track p.titulo; let i = $index) {
            <li class="step" [appReveal]="i * 70">
              <span class="step-num" aria-hidden="true">{{ i + 1 < 10 ? '0' + (i + 1) : i + 1 }}</span>
              <div>
                <h3>{{ p.titulo }}</h3>
                <p>{{ p.texto }}</p>
              </div>
            </li>
          }
        </ol>
      </div>
    </section>
  `,
})
export class Method {
  protected readonly passos = PASSOS;
}
