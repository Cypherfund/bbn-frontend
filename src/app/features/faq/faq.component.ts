import { Component } from '@angular/core';
import {Faq} from "../../models/site";

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {
  categories = ['General', 'Pricing', 'Dashboard', 'API'];
  selectedCategory = 'General';

  faqs: Faq[] = [
    {
      category: 'General',
      question: 'Is there a free trial available?',
      answer: 'Yes, you can try us for free for 30 days...'
    },
    {
      category: 'Pricing',
      question: 'Can I change my plan later?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time...'
    },
    // Add more FAQ items here
  ];

  filteredFaqs: Faq[] = [];

  ngOnInit(): void {
    this.filterFaqs();
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.filterFaqs();
  }

  filterFaqs(): void {
    this.filteredFaqs = this.faqs.filter(faq => faq.category === this.selectedCategory);
  }
}
