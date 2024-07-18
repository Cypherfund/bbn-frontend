import { Component } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-home-carousel',
  templateUrl: './home-carousel.component.html',
  styleUrl: './home-carousel.component.scss',
  standalone: true,
  imports: [
    MatButtonModule
  ]
})
export class HomeCarouselComponent {

}
