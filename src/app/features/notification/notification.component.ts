import { Component } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {
  notifications = [
    {
      icon: 'home_repair_service',
      title: 'Maintenance request update',
      description: 'The maintenance request for <strong>John Doe</strong> in <strong>Apartment 301</strong> has been <span class="status-completed">Completed</span>. The issue was a <strong>leaking faucet in the kitchen</strong>.',
      time: '5h ago',
      highlight: false
    },
    {
      icon: 'attach_money',
      title: 'Rent Payment Confirmation',
      description: 'We have received the rent payment of <strong>$1,200</strong> for <strong>Jane Smith</strong> in <strong>Apartment 102</strong>. The payment was processed <span class="status-success">successfully</span>.',
      time: '7h ago',
      highlight: true
    },
    {
      icon: 'schedule',
      title: 'Lease Renewal Reminder',
      description: 'The lease for <strong>Esther Howard</strong> in <strong>Apartment 308</strong> is set to <span class="status-expire">expire on October 15, 2023</span>. Please take appropriate action to initiate lease renewal discussions.',
      time: '7h ago',
      highlight: false
    }
  ];
}
