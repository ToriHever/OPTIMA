import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutHero } from './components/about-hero/about-hero';
import { AboutValues } from './components/about-values/about-values';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, AboutHero, AboutValues],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About {}