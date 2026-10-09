import { ChangeDetectionStrategy, Component } from '@angular/core';
import { About } from './sections/about';
import { Contact } from './sections/contact';
import { Footer } from './sections/footer';
import { Header } from './sections/header';
import { Hero } from './sections/hero';
import { MeetCard } from './sections/meet-card';
import { Method } from './sections/method';
import { Results } from './sections/results';
import { Services } from './sections/services';
import { Stats } from './sections/stats';
import { Testimonials } from './sections/testimonials';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Header, Hero, Stats, About, Services, Method, Results, Testimonials, MeetCard, Contact, Footer],
  templateUrl: './app.html',
})
export class App {}
