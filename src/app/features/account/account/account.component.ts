import { Component } from '@angular/core';
import {GamesService} from "../../../services/game/games.service";
import {UserService} from "../../../services/user/user.service";
import {Observable} from "rxjs";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {LoaderService} from "../../../services/loader.service";
import {provideNativeDateAdapter} from "@angular/material/core";
import {BetTransaction, TransactionSearch} from "../../../models/bbn";
import {PaymentSheetComponent} from "../components/payment-sheet/payment-sheet.component";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {Router} from "@angular/router";
import {APIResponse} from "../../../models/user";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  providers: [provideNativeDateAdapter()],
})
export class AccountComponent {
  transactions$: Observable<APIResponse<BetTransaction[]>> = this.gamesService.transactionHistory$;

  constructor(public gamesService: GamesService,
              public loaderService: LoaderService,
              public userService: UserService,
              private router: Router,
              private bottomSheet: MatBottomSheet) {
    this.transactions$ = this.loaderService.showLoaderUntilComplete(this.transactions$);
  }

  ngOnInit(): void {
    this.userService.login$.pipe().subscribe( loginVal => {
      if (loginVal === 1) {
        const today = new Date();
        const startDate = new Date(today.setHours(0, 0, 0, 0));
        const endDate = new Date(today.setHours(23, 59, 59, 999));
        const transactionSearch: Partial<TransactionSearch> = {
          userId: this.userService.user.userId,
          startDate: startDate,
          endDate: endDate
        }
        this.searchTransaction(transactionSearch);
      }
    })
  }

  public searchTransaction(search: Partial<TransactionSearch>) {
    let transactionSearch: TransactionSearch = {...search, userId: this.userService.user.userId}
    this.gamesService.loadTransactionHistory(transactionSearch);
  }

  openBottomSheet(action: string): void {
    this.bottomSheet.open(PaymentSheetComponent, {
      data: {action}
    });
  }

  reloadPage(): void {
    this.router.navigate([this.router.url])
      .then(() => {
        window.location.reload();
      });
  }
}

