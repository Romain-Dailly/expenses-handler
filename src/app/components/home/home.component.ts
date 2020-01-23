import { ExpenseItemInterface } from './../../interfaces/expense-item.interface';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private expensesItemResponse;
  public expenseItems: ExpenseItemInterface[];

  isLoading: boolean = true;
  
  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.dataService.getExpenseItems().subscribe(data => {
      this.isLoading = true;
      this.expensesItemResponse = data;
      this.expenseItems = this.expensesItemResponse.items;
      console.log(data);
      this.isLoading = false;
    },
    error => {
      console.log(error);
      }
    );
  }

}
