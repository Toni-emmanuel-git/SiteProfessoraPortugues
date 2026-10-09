import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Reveal } from '../shared/reveal';
import { AgendarLink } from '../shared/agendar-link';
import { agendar, SITE } from '../site.config';

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Reveal, AgendarLink],
  template: `
    <section class="cta" id="contato" aria-labelledby="contato-titulo">
      <div class="container cta-inner" appReveal>
        <span class="eyebrow eyebrow--dark"><span class="dot" aria-hidden="true"></span>Vamos conversar</span>
        <h2 id="contato-titulo">Sua redação pode chegar aos <em>900+</em>.</h2>
        <p>Agende uma aula e comece pelo diagnóstico do seu texto. Prefere tirar dúvidas antes? Chame no Instagram.</p>

        <div class="cta-actions">
          @if (agendar.external) {
            <a class="btn btn--dark" appAgendar>Agendar minha aula <span aria-hidden="true">→</span></a>
          }
          <a
            class="btn"
            [class.btn--dark]="!agendar.external"
            [class.btn--outline-dark]="agendar.external"
            [href]="site.instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram &#64;luizaclaureprof
          </a>
          <a class="btn btn--outline-dark" [href]="site.linkedin" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
    </section>
  `,
})
export class Contact {
  protected readonly agendar = agendar;
  protected readonly site = SITE;
}
