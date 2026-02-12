import { Component } from '@angular/core';
import { Hero } from './components/hero/hero';
import { BrandsCarousel } from './components/brands-carousel/brands-carousel';
import { ServicesTable } from './components/services-table/services-table';
import { RepairCategories } from './components/repair-categories/repair-categories';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Hero, BrandsCarousel, RepairCategories, ServicesTable],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}