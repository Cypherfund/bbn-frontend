import {Component, inject} from "@angular/core";
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBarAction, MatSnackBarActions, MatSnackBarLabel, MatSnackBarRef} from "@angular/material/snack-bar";

@Component({
  selector: 'snack-bar-message-bet',
  template: `
    <span class="example-pizza-party" matSnackBarLabel>
  Bet placed successfuly!!!
    </span>
    <span matSnackBarActions>
  <button mat-button matSnackBarAction (click)="snackBarRef.dismissWithAction()">🍕</button>
</span>


  `,
  styles: `
    :host {
      display: flex;
    }

    .example-pizza-party {
      color: hotpink;
    }
  `,
  standalone: true,
  imports: [MatButtonModule, MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction],
})
export class SnackBarMessageBetComponent {
  snackBarRef = inject(MatSnackBarRef);
}
