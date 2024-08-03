import {Component, Inject, inject} from "@angular/core";
import {MatButtonModule} from "@angular/material/button";
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef
} from "@angular/material/snack-bar";
import {MAT_BOTTOM_SHEET_DATA} from "@angular/material/bottom-sheet";

@Component({
  selector: 'snack-bar-message-bet',
  template: `
    <span class="example-pizza-party" matSnackBarLabel>
  {{data.msg}}
    </span>
    <span matSnackBarActions>
</span>


  `,
  styles: `
    :host {
      display: flex;
    }
  `,
  standalone: true,
  imports: [MatButtonModule, MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction],
})
export class SnackBarMessageBetComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: {msg: string},) {
  }
}
