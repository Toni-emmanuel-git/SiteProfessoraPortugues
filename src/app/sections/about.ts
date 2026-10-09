import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Reveal } from '../shared/reveal';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Reveal],
  template: `
    <section class="section" id="sobre" aria-labelledby="sobre-titulo">
      <div class="container about-simple" appReveal>
        <span class="eyebrow"><span class="dot" aria-hidden="true"></span>Sobre a professora</span>
        <h2 class="section-title" id="sobre-titulo">
          Escrever bem é uma <strong>habilidade</strong>. E habilidade se treina.
        </h2>
        <p class="about-lead">
          Professora de redação e linguagens, Luiza ajuda alunos de diferentes perfis a escrever com clareza, coesão e
          domínio da norma padrão, da prova do ENEM ao dia a dia.
        </p>
        <blockquote class="pull-quote">
          “Qualquer aluno pode tirar +900 na redação. Tudo é questão de dominar as técnicas.”
        </blockquote>
      </div>
    </section>
  `,
})
export class About {}
