import { Component } from '@angular/core';
import {GamesService} from "../../../services/game/games.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BBNEvent} from "../../../models/bbn";
import {relative} from "@angular/compiler-cli";

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
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    if (!this.gameService.selectedTournament) this.router.navigate(['/']);
    this.gameService.loadEvents();
  }

  selectEvent(event: BBNEvent) {
    this.gameService.eventDetails = event;
    this.router.navigate([event.id], {relativeTo: this.activatedRoute});
  }

}
