import { Component } from '@angular/core';
import {GamesService} from "../../../services/game/games.service";
import {UserService} from "../../../services/user/user.service";
import {Observable} from "rxjs";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {LoaderService} from "../../../services/loader.service";
import {provideNativeDateAdapter} from "@angular/material/core";
import {BetTransaction, TransactionSearch} from "../../../models/bbn";
import {PaymentSheetComponent} from "../payment-sheet/payment-sheet.component";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";
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
  selectedBetType = 'all';
  selectedPeriod = 'lastTwoWeeks';
  startDate!: Date;
  endDate!: Date;

  transactions$: Observable<APIResponse<BetTransaction[]>> = this.gamesService.transactionHistory$;
  displayedColumns: string[] = ['expand', 'createdAt', 'status', 'finalWinnings'];
  columnsToDisplay: string[] = ['createdAt', 'status', 'finalWinnings'];
  showFirstLastButtons = true;
  length = 50;
  pageSize = 5;
  pageIndex = 0;

  expandedElement!: BetTransaction | null;

  pageEvent!: PageEvent;

  constructor(public gamesService: GamesService,
              public loaderService: LoaderService,
              public userService: UserService,
              private router: Router,
              private bottomSheet: MatBottomSheet) {
    this.transactions$ = this.loaderService.showLoaderUntilComplete(this.transactions$);
    const today = new Date();
    this.startDate = new Date(today.setHours(0, 0, 0, 0));
    this.endDate = new Date(today.setHours(23, 59, 59, 999));
  }

  ngOnInit(): void {
    this.userService.login$.pipe().subscribe( loginVal => {
      if (loginVal === 1) {
        this.searchTransaction();
      }
    })
  }

  public searchTransaction() {
    this.startDate = new Date(this.startDate.setHours(0, 0, 0, 0));
    this.endDate = new Date(this.endDate.setHours(23, 59, 59, 999));
    let transactionSearch: TransactionSearch = {
      userId: this.userService.user.userId,
      startDate: this.startDate,
      endDate: this.endDate,
      page: this.pageIndex,
      size: this.pageSize,
    }
    this.gamesService.loadTransactionHistory(transactionSearch);
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.searchTransaction();
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

