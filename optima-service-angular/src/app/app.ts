import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { RepairStatusModal } from './shared/components/repair-status-modal/repair-status-modal';
import { CallbackModal } from './shared/components/callback-modal/callback-modal';
import { SocialBar } from './layout/social-bar/social-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer, RepairStatusModal, CallbackModal, SocialBar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  title = 'Оптима Сервис';

}