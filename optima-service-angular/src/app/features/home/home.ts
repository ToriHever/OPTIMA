import { Component } from '@angular/core';
import { Hero } from './components/hero/hero';
import { BrandsCarousel } from './components/brands-carousel/brands-carousel';
import { ServicesTable } from './components/services-table/services-table';
import { RepairCategories } from './components/repair-categories/repair-categories';
import { WorkProcess } from './components/work-process/work-process';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Hero, BrandsCarousel, RepairCategories, ServicesTable, WorkProcess],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}