import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Reveal } from '../shared/reveal';
import { CARTAO } from '../site.config';

/**
 * Cartão dividido "Conheça a Luiza".
 * Foto de um lado, painel de texto do outro. Ao passar o mouse (ou tocar / usar o teclado),
 * foto e painel deslizam e trocam de lado, e o texto muda.
 */
@Component({
  selector: 'app-meet-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Reveal],
  template: `
    <section class="section section--alt" id="conheca" aria-labelledby="conheca-titulo">
      <div class="container container--wide">
        <div class="section-head section-head--stack" appReveal>
          <span class="eyebrow"><span class="dot" aria-hidden="true"></span>Conheça a Luiza</span>
          <h2 class="section-title" id="conheca-titulo">Por trás das <strong>correções</strong>.</h2>
        </div>

        <div
          class="meet-card"
          appReveal="100"
          role="group"
          tabindex="0"
          aria-label="Conheça a Luiza: passe o mouse, toque ou pressione Enter para alternar entre trajetória e filosofia"
          [class.is-flipped]="flipped()"
          (pointerdown)="pointerType = $event.pointerType"
          (pointerenter)="onEnter($event)"
          (pointerleave)="onLeave($event)"
          (click)="onClick()"
          (keydown.enter)="flipped.set(!flipped())"
          (keydown.space)="$event.preventDefault(); flipped.set(!flipped())"
        >
          <div class="meet-photo">
            <img
              src="img/luiza-retrato.jpg"
              width="675"
              height="808"
              loading="lazy"
              alt="Luiza Claure, professora de redação e linguagens"
            />
          </div>

          <div class="meet-panel">
            <div class="meet-stack">
              <div class="meet-text meet-text--a" [attr.aria-hidden]="flipped()">
                <span class="meet-label">{{ a.rotulo }}</span>
                <h3>{{ a.titulo }}</h3>
                <p>{{ a.texto }}</p>
                <ul class="meet-facts">
                  @for (f of a.fatos; track f) {
                    <li>{{ f }}</li>
                  }
                </ul>
              </div>
              <div class="meet-text meet-text--b" [attr.aria-hidden]="!flipped()">
                <span class="meet-label">{{ b.rotulo }}</span>
                <h3>{{ b.titulo }}</h3>
                <p>{{ b.texto }}</p>
                <ul class="meet-facts">
                  @for (f of b.fatos; track f) {
                    <li>{{ f }}</li>
                  }
                </ul>
              </div>
            </div>
            <p class="meet-hint" aria-hidden="true">
              <span class="hint-hover">Passe o mouse →</span>
              <span class="hint-touch">Toque para virar →</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class MeetCard {
  protected readonly a = CARTAO.a;
  protected readonly b = CARTAO.b;
  protected readonly flipped = signal(false);
  protected pointerType = 'mouse';

  protected onEnter(e: PointerEvent): void {
    if (e.pointerType === 'mouse') this.flipped.set(true);
  }

  protected onLeave(e: PointerEvent): void {
    if (e.pointerType === 'mouse') this.flipped.set(false);
  }

  protected onClick(): void {
    // No mouse o efeito já acontece no hover; em toque (ou caneta) o clique alterna.
    if (this.pointerType !== 'mouse') this.flipped.update((v) => !v);
  }
}
