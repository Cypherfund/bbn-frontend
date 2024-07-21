import { Component } from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {TicketTransaction} from "../../../models/bbn";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  user: any;

  constructor(public userService: UserService) {
    // Fetch user data (this should come from a service in a real application)
    this.user = {
      name: 'Elizabeth Ngai',
      id: '0345DG9',
      email: 'elizabeth.ngai@example.com',
      balance: 10000,
      phoneNumber: '+237 650 076 456'
    };
    this.transactions = this.getTransactions(); // Fetch transactions from a service or a mock function
  }

  ngOnInit(): void {
  }

  accountBalance: number = 5000;
  transactions: TicketTransaction[] = [];
  expandedElement!: TicketTransaction | null;
  displayedColumns: string[] = ['id', 'type', 'totalAmount', 'totalOdds', 'status', 'createdAt', 'expand'];
  betDisplayedColumns: string[] = ['betId', 'betType', 'status', 'potentialWinnings', 'taxAmount', 'finalWinnings', 'amount'];

  getTransactions(): TicketTransaction[] {
    return [
      {
        id: 1,
        userId: '6ecd851f-3b2f-4b7d-b431-10826213b604',
        type: 'ODDS',
        totalAmount: 600.00,
        totalOdds: 25.31,
        status: 'PENDING',
        correctPredictions: 0,
        createdAt: '2024-07-21T16:09:06Z',
        updatedAt: null,
        bets: [
          {
            id: 1,
            betType: 'MULTIPLE',
            status: 'PENDING',
            createdAt: '2024-07-21T16:09:06Z',
            updatedAt: null,
            potentialWinnings: 450.00,
            taxAmount: 45.00,
            finalWinnings: 405.00,
            amount: 200.00
          },
          {
            id: 2,
            betType: 'MULTIPLE',
            status: 'PENDING',
            createdAt: '2024-07-21T16:09:06Z',
            updatedAt: null,
            potentialWinnings: 600.00,
            taxAmount: 60.00,
            finalWinnings: 540.00,
            amount: 200.00
          },
          {
            id: 3,
            betType: 'MULTIPLE',
            status: 'PENDING',
            createdAt: '2024-07-21T16:09:06Z',
            updatedAt: null,
            potentialWinnings: 750.00,
            taxAmount: 75.00,
            finalWinnings: 675.00,
            amount: 200.00
          }
        ]
      },
      // More transactions...
    ];
  }

  deposit(amount: number): void {
    this.accountBalance += amount;
  }

  withdraw(amount: number): void {
    if (amount <= this.accountBalance) {
      this.accountBalance -= amount;
    } else {
      alert('Insufficient balance');
    }
  }


  toggleRow(transaction: TicketTransaction): void {
    this.expandedElement = this.expandedElement === transaction ? null : transaction;
  }
}
