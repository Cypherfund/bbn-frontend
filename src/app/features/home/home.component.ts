import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  games = [
    { name: 'Lottery', image: 'assets/lottery.jpg', link: '/lottery' },
    { name: 'Reality TV Show', image: 'assets/bbn-image.jpg', link: '/bbn' },
    { name: 'Micro Tasks', image: 'assets/micro-task.jpg', link: '/task' },
    { name: 'Blog Writing', image: 'assets/blog.jpg', link: '/blog' },

  ]
}
