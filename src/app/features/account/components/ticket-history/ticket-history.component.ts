import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BetTransaction, TransactionSearch} from "../../../../models/bbn";
import {APIResponse} from "../../../../models/user";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {FormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";
import {CurrencyPipe, DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {provideNativeDateAdapter} from "@angular/material/core";

@Component({
  selector: 'app-ticket-history',
  templateUrl: './ticket-history.component.html',
  styleUrl: './ticket-history.component.scss',
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatInputModule,
    MatPaginatorModule,
    FormsModule,
    MatTableModule,
    DatePipe,
    NgClass,
    CurrencyPipe,
    NgForOf,
    NgIf,
    MatIconModule
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  providers: [provideNativeDateAdapter()],
})
export class TicketHistoryComponent {
  @Input() transactions: APIResponse<BetTransaction[]> | null = null;
  @Output() search: EventEmitter<Partial<TransactionSearch>> = new EventEmitter<Partial<TransactionSearch>>();

  selectedBetType = 'all';
  selectedPeriod = 'lastTwoWeeks';
  startDate!: Date;
  endDate!: Date;

  displayedColumns: string[] = ['expand', 'createdAt', 'status', 'finalWinnings'];
  columnsToDisplay: string[] = ['createdAt', 'status', 'finalWinnings'];
  showFirstLastButtons = true;
  length = 50;
  pageSize = 5;
  pageIndex = 0;

  expandedElement!: BetTransaction | null;

  pageEvent!: PageEvent;

  constructor() {
    const today = new Date();
    this.startDate = new Date(today.setHours(0, 0, 0, 0));
    this.endDate = new Date(today.setHours(23, 59, 59, 999));
  }

  public searchTransaction() {
    this.startDate = new Date(this.startDate.setHours(0, 0, 0, 0));
    this.endDate = new Date(this.endDate.setHours(23, 59, 59, 999));
    let transactionSearch: Partial<TransactionSearch> = {
      startDate: this.startDate,
      endDate: this.endDate,
      page: this.pageIndex,
      size: this.pageSize,
    }
    this.search.emit(transactionSearch);
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.searchTransaction();
  }

}
