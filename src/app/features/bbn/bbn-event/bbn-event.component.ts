import { Component } from '@angular/core';
import {GamesService} from "../../../services/game/games.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-bbn-event',
  templateUrl: './bbn-event.component.html',
  styleUrl: './bbn-event.component.scss'
})
export class BbnEventComponent {
  categories = [
    'WEEKLY EVICTION',
    'WEEKLY EVICTION',
    'WEEKLY EVICTION',
    'WEEKLY EVICTION',
    'WEEKLY EVICTION'
  ];

  events$ = this.gameService.events$;

  constructor(private gameService: GamesService,
              private router: Router) {
    if (!this.gameService.selectedTournament) this.router.navigate(['/']);
    this.gameService.loadEvents();
  }


}
