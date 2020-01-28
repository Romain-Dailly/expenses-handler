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
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate('300ms ease-in', style({transform: 'translateY(0%)', opacity:1}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({transform: 'translateY(-100%)', opacity:1}))
      ])
    ]),
    trigger('opacityInOut', [
      transition(':enter', [
        style({opacity:0}),
        animate('200ms ease-in', style({opacity:1}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({opacity:0}))
      ])
    ]),
  ]
})
  
export class ExpensesListComponent implements OnInit {


  // Send event to home component when expense list has to be modified
  @Output() passUpdateExpenseListOnListChange = new EventEmitter();
  // Expense list computed in home component
  @Input() expenseItems;
  // The index got in the list on click
  selectedItem: number;
  // The item at this index
  shownExpenseItem:ExpenseItemInterface;

  // Handle creation or modification form visibility
  areShownDetails: boolean = false;
  isCreationFormOpened: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  // Toggle modification form and handle opened forms
  toggleDetails(index) {
    // Set the selected item to bind it to modification form
    this.shownExpenseItem = this.expenseItems[index];
    // If creation form opened, close it
    if (this.isCreationFormOpened) {
      this.areShownDetails = false;
      this.isCreationFormOpened = false;
      // if modification form opened, close it
    } else if (this.selectedItem !== index && this.areShownDetails === true) {
      this.areShownDetails = false;
      // else open modification form
    } else {
      this.selectedItem = index;
      this.areShownDetails = !this.areShownDetails;
    }
  }

  // Event emitted from Form on its closure without change in expense list
  handleFormClose($event) {
    this.areShownDetails = false;
    this.isCreationFormOpened = false;
  }

  // Event emmitted on form closure with change in expenses list
  updateExpenseListOnListChange() {
    this.passUpdateExpenseListOnListChange.emit();
    this.areShownDetails = false;
    this.isCreationFormOpened = false;
  }
  
  // Handle creation button click
  createNewExpense() {
    this.isCreationFormOpened = true;
  }
}
