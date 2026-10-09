import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AgendarLink } from '../shared/agendar-link';

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AgendarLink],
  template: `
    <section class="hero" id="inicio">
      <div class="hero-glow hero-glow--purple" aria-hidden="true"></div>
      <div class="hero-glow hero-glow--gold" aria-hidden="true"></div>

      <div class="container container--wide hero-grid">
        <div class="hero-copy">
          <span class="eyebrow"><span class="dot" aria-hidden="true"></span>Aulas online · Redação e linguagens</span>
          <h1>Redação não é dom.<br /><em>É técnica.</em></h1>
          <p class="lead">
            Aulas particulares online de redação e linguagens, com foco no ENEM. Plano sob medida,
            correção detalhada e a experiência de quem tirou 980 e corrige redações profissionalmente.
          </p>
          <div class="hero-actions">
            <a class="btn btn--primary" appAgendar>Agendar aula <span aria-hidden="true">→</span></a>
            <a class="btn btn--ghost" href="#metodo">Conhecer o método</a>
          </div>
        </div>

        <div class="hero-visual">
          <div class="portrait">
            <img
              src="img/luiza-retrato.jpg"
              width="675"
              height="808"
              fetchpriority="high"
              alt="Retrato de Luiza Claure, professora de redação e linguagens"
            />
          </div>
          <div class="float-tag">
            <span class="float-tag__num">980</span>
            <span class="float-tag__txt">nota na redação<br />do ENEM</span>
          </div>
        </div>
      </div>

      <div class="container container--wide">
        <ul class="spec-strip">
          <li>Aulas online</li>
          <li>Foco no ENEM</li>
          <li>Do Ensino Médio a adultos</li>
          <li>Ensinando desde 2018</li>
        </ul>
      </div>
    </section>
  `,
})
export class Hero {}
