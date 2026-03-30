import { Component } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { AboutHero } from './components/about-hero/about-hero';
import { AboutValues } from './components/about-values/about-values';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, AboutHero, AboutValues],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About {

constructor(private scroller: ViewportScroller) {}

ngOnInit() {
  this.scroller.scrollToPosition([0, 0]);}

}