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

  @Output() passUpdateExpenseListOnListChange = new EventEmitter();
  @Input() expenseItems;
  shownExpenseItem:ExpenseItemInterface;

  selectedItem: number;
  areShownDetails: boolean = false;
  isCreationFormOpened: boolean = false;

  creationButtonText: string = '+';

  constructor() { }

  ngOnInit() {
  }

  // Toggle details in view and bind it to the form in shownExpenseItem
  toggleDetails(index) {

    this.shownExpenseItem = this.expenseItems[index];
    if (this.isCreationFormOpened) {
      this.areShownDetails = false;
      this.isCreationFormOpened = false;
    } else if (this.selectedItem !== index && this.areShownDetails === true) {
      this.areShownDetails = false;
    } else {
      this.selectedItem = index;
      this.areShownDetails = !this.areShownDetails;
    }
  }

  // Event emitted on form
  updateExpenseListOnListChange() {
    this.passUpdateExpenseListOnListChange.emit();
    this.areShownDetails = false;
    this.isCreationFormOpened = false;
  }

  // Event emitted to close Form 
  handleFormClose($event) {
    console.log('recu dans list');
    this.areShownDetails = false;
    this.isCreationFormOpened = false;
  }
  
  // Handle creation button click
  createNewExpense() {
    this.isCreationFormOpened = true;
  }
  // ngOnChanges() {
  //   console.log(this.expenseItems);
  // }

}
