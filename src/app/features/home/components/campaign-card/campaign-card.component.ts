import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Tournament} from "../../../../models/bbn";

@Component({
  selector: 'app-campaign-card',
  templateUrl: './campaign-card.component.html',
  styleUrl: './campaign-card.component.scss'
})
export class CampaignCardComponent {
  @Input() tournament!: Tournament;
  @Output() selectedGame: EventEmitter<Tournament> = new EventEmitter();

  selectGame() {
    this.selectedGame.emit(this.tournament);
  }
}
