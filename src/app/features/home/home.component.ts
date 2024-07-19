import { Component } from '@angular/core';
import {GamesService} from "../../services/game/games.service";
import {Tournament} from "../../models/bbn";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  otherGames: Tournament[] = [
    { name: 'Lottery', imgUrl: 'assets/lottery.jpg', link: '/lottery', categoryId: 1, endDate: '2021-12-31', id: 1, startDate: '2021-01-01' },
    { name: 'Micro Tasks', imgUrl: 'assets/micro-task.jpg', link: '/task', categoryId: 1, endDate: '2021-12-31', id: 1, startDate: '2021-01-01' },
    { name: 'Blog Writing', imgUrl: 'assets/blog.jpg', link: '/blog' , categoryId: 1, endDate: '2021-12-31', id: 1, startDate: '2021-01-01'},

  ]

  topTournaments$ = this.gamesService.topTournaments$;
  constructor(private gamesService: GamesService,
              private router: Router) {
  }

  selectTournament($event: Tournament) {
    this.gamesService.selectedTournament = $event.id;
    this.router.navigate([$event.link]);

  }
}
