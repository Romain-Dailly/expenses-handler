import { ExpenseItemInterface } from './../../interfaces/expense-item.interface';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private expenseItemsResponse;
  public expenseItems: ExpenseItemInterface[];

  isLoading: boolean = true;
  
  constructor(private dataService:DataService) { }

  getExpensesFromApi() {

    this.dataService.getExpenseItems().subscribe(
      data => {

      this.isLoading = true;
      this.expenseItemsResponse = data;
        
      // Set expenseItems and orderBy purchasedOn date from recent to old
      this.expenseItems = this.expenseItemsResponse.items.sort((a, b) => Number(new Date(a.purchasedOn)) - Number(new Date((b.purchasedOn)))).reverse();
      console.log(this.expenseItems);
      this.isLoading = false;
      },
      error => {

        console.log(error);
      }
    );
  }
  ngOnInit() {

    this.getExpensesFromApi();
  }

}
