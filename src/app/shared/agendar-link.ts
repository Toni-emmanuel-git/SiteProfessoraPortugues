import { Directive } from '@angular/core';
import { agendar } from '../site.config';

/**
 * Aponta um <a> para o agendamento (Google Forms).
 * Se o link ainda não foi configurado em site.config.ts, leva à seção de contato.
 */
@Directive({
  selector: 'a[appAgendar]',
  host: {
    '[attr.href]': 'href',
    '[attr.target]': 'target',
    '[attr.rel]': 'rel',
  },
})
export class AgendarLink {
  protected readonly href = agendar.href;
  protected readonly target = agendar.external ? '_blank' : null;
  protected readonly rel = agendar.external ? 'noopener noreferrer' : null;
}
