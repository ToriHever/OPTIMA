import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MasterData } from '../../../features/masters/masters-data';

@Component({
  selector: 'app-master-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './master-card.html',
  styleUrl: './master-card.scss'
})
export class MasterCard {
  @Input({ required: true }) master!: MasterData;
}
