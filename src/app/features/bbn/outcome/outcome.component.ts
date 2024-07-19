import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {BetSummaryDialogComponent} from "../bet-summary-dialog/bet-summary-dialog.component";
import {ActivatedRoute} from "@angular/router";
import {GamesService} from "../../../services/game/games.service";
import {Observable, tap} from "rxjs";
import {CartService} from "../../../services/cart.service";
import {BBNEvent, Outcome} from "../../../models/bbn";

@Component({
  selector: 'app-outcome',
  templateUrl: './outcome.component.html',
  styleUrl: './outcome.component.scss'
})
export class OutcomeComponent implements OnInit {
  eventDetails: Partial<BBNEvent> = {};
  outcomes$: Observable<Outcome[]> = this.gamesService.outcomes$;

  constructor(public dialog: MatDialog,
              public gamesService: GamesService,
              public cartService: CartService,
              private cdr: ChangeDetectorRef,
              private activatedRoute: ActivatedRoute) {}

  openBetSummaryDialog() {
    this.dialog.open(BetSummaryDialogComponent, {
      width: '600px'
    });
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];

    if (!!id) {
      this.gamesService.loadOutcomes(parseInt(id));
    }

    this.outcomes$ = this.gamesService.outcomes$.pipe(
      tap(outcomes =>
      {
        this.eventDetails = this.gamesService.eventDetails;
        this.cdr.detectChanges();
      }

      )
    );
  }

  onCheckboxChange(event: any, participant: Outcome) {
    if (event.checked) {
      this.cartService.addToCart(participant);
    } else {
      this.cartService.removeFromCart(participant.id);
    }
  }
}
