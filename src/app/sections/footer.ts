import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE } from '../site.config';
import { PetScene } from './pet-scene';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PetScene],
  template: `
    <footer class="site-footer">
      <div class="container container--wide">
        <app-pet-scene />
      </div>
      <div class="container container--wide footer-inner">
        <a class="brand" href="#inicio">
          <span class="brand-mark" aria-hidden="true">L</span>
          {{ site.nome }}
        </a>
        <p class="footer-note">Aulas online de redação e linguagens · Foco no ENEM</p>
        <nav class="footer-links" aria-label="Redes">
          <a [href]="site.instagram" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a [href]="site.linkedin" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </nav>
        <p class="footer-copy">© {{ year }} {{ site.nome }}. Todos os direitos reservados.</p>
      </div>
    </footer>
  `,
})
export class Footer {
  protected readonly site = SITE;
  protected readonly year = new Date().getFullYear();
}
