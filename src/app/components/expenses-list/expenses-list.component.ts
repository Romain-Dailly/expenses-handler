import { ExpenseItemInterface } from './../../interfaces/expense-item.interface';
import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(-100%)'}),
        animate('300ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({transform: 'translateY(-100%)'}))
      ])
    ])
  ]
})
export class ExpensesListComponent implements OnInit {

  @Output() passUpdateExpenseListOnListChange = new EventEmitter();
  @Input() expenseItems;
  shownExpenseItem:ExpenseItemInterface;

  selectedItem: number;
  areShownDetails: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  // Toggle details in view and bind it to the form in shownExpenseItem
  toggleDetails(index) {

    this.shownExpenseItem = this.expenseItems[index];
    this.selectedItem !== index ? this.areShownDetails = true : this.areShownDetails = !this.areShownDetails;
    this.selectedItem = index;
  }

  updateExpenseListOnListChange() {
    this.passUpdateExpenseListOnListChange.emit();
    this.areShownDetails = false;
  }
  // ngOnChanges() {
  //   console.log(this.expenseItems);
  // }

}
