import { ExpenseItemInterface } from './../../interfaces/expense-item.interface';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // provisory response
  private expenseItemsResponse;

  public expenseItems: ExpenseItemInterface[];

  private subscriptionToData;

  isLoading: boolean = true;
  
  constructor(private dataService:DataService) { }

  getExpensesFromApi() {

    this.expenseItemsResponse = undefined;
    this.expenseItems = undefined;
    this.subscriptionToData !== undefined && this.subscriptionToData.unsubscribe();

    this.subscriptionToData = this.dataService.getExpenseItems().subscribe(
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

  // Event emmitted from form to update list
  updateExpenseListOnListChange($event) {
    this.getExpensesFromApi();
  }

  ngOnInit() {

    this.getExpensesFromApi();
  }

  ngOnDestroy() {
    this.subscriptionToData !== undefined && this.subscriptionToData.unsubscribe();
  }

}
