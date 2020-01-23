import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.css']
})
export class ExpensesListComponent implements OnInit {

  @Input() expenseItems;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log(this.expenseItems);
  }

}
