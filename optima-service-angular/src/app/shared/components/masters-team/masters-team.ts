import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MasterCard } from '../master-card/master-card';
import { MASTERS_DATA } from '../../../features/masters/masters-data';

@Component({
  selector: 'app-masters-team',
  standalone: true,
  imports: [CommonModule, RouterModule, MasterCard],
  templateUrl: './masters-team.html',
  styleUrl: './masters-team.scss'
})
export class MastersTeam {
  @Input() title = 'Люди, которые';
  @Input() titleAccent = 'ремонтируют';
  @Input() subtitle = 'Опытные мастера с многолетней практикой — каждый специализируется на своей технике';
  @Input() limit?: number;
  @Input() dark = false;

  readonly allMasters = MASTERS_DATA;

  get masters() {
    return this.limit ? this.allMasters.slice(0, this.limit) : this.allMasters;
  }

  get showMoreLink(): boolean {
    return !!this.limit && this.allMasters.length > this.limit;
  }
}
