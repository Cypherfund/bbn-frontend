import { Component } from '@angular/core';
import {GamesService} from "../../services/game/games.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  otherGames = [
    { name: 'Lottery', imgUrl: 'assets/lottery.jpg', link: '/lottery' },
    { name: 'Micro Tasks', imgUrl: 'assets/micro-task.jpg', link: '/task' },
    { name: 'Blog Writing', imgUrl: 'assets/blog.jpg', link: '/blog' },

  ]

  topTournaments$ = this.gamesService.topTournaments$;
  constructor(private gamesService: GamesService) {
  }
}
