import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { RepairStatusModal } from './shared/components/repair-status-modal/repair-status-modal';
import { CallbackModal } from './shared/components/callback-modal/callback-modal';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer, RepairStatusModal, CallbackModal],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  title = 'Оптима Сервис';

}