import {Injectable} from '@angular/core';
import {Bet, BetEvent, Outcome, PredictionRequest} from "../../../models/bbn";
import {SnackBarMessageBetComponent} from "./snack-bar-message-bet.component";
import {MatDialogRef} from "@angular/material/dialog";
import {GamesService} from "../../../services/game/games.service";
import {UserService} from "../../../services/user/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CartService} from "../../../services/cart.service";
import {BetSummaryDialogComponent} from "./bet-summary-dialog.component";

@Injectable()
export class BetSummaryService {
  msg: string = '';
  durationInSeconds = 5;
  constructor(public dialogRef: MatDialogRef<BetSummaryDialogComponent>,
              private gameService: GamesService,
              public userService: UserService,
              private _snackBar: MatSnackBar,
              private cartService: CartService) { }

  validateBet(bets: Bet[]){
    const predictionRequest: PredictionRequest = {
      userId: this.userService.user.userId,
      ticketType: "ODDS",
      bets: bets
    };
    this.gameService.placeBet(predictionRequest).subscribe(
      {
        next: () => {
          this.msg = 'Bet Placed Successfully';
          this.cartService.clearCart();
          this.openSnackBar();
          this.userService.loadUserBalance(this.userService.user.userId);
          this.dialogRef.close();
        },
        error: () => {
          this.msg = "failed to save bet";
          this.openSnackBar();
        }
      }
    );
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackBarMessageBetComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  createBets(outcomes: Outcome[]): Bet[] {
    const groupedOutcomes = this.groupBy(outcomes, 'eventId');
    const combinations = this.generateCombinations(groupedOutcomes);

    return combinations.map((combination): Bet => {
      const events: BetEvent[] = combination.map((outcome): BetEvent => ({
        eventId: outcome.eventId,
        eventName: outcome.eventName,
        prediction: outcome.id, // Assuming prediction is the outcome id
        description: outcome.description, // Assuming description is the outcome description
        odds: outcome.odds,
      }));

      return {
        betType: events.length > 1 ? 'MULTIPLE' : 'SINGLE',
        amount: 200, // Default stake amount example
        events,
      };
    });
  }

  private groupBy<T>(array: T[], key: keyof T): { [key: string]: T[] } {
    return array.reduce((result, item) => {
      const groupKey = item[key] as unknown as string;
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(item);
      return result;
    }, {} as { [key: string]: T[] });
  }

  private generateCombinations(groups: { [key: string]: Outcome[] }): Outcome[][] {
    const keys = Object.keys(groups);
    if (keys.length === 0) {
      return [];
    }

    function helper(index: number): Outcome[][] {
      if (index === keys.length) {
        return [[]];
      }

      const combinations = helper(index + 1);
      const results: Outcome[][] = [];

      for (const outcome of groups[keys[index]]) {
        for (const combination of combinations) {
          results.push([outcome, ...combination]);
        }
      }

      return results;
    }

    return helper(0);
  }

}
