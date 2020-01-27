import { ExpenseItemInterface } from './../../interfaces/expense-item.interface';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // provisory response from api
  private expenseItemsResponse;

  // Items got from provisory response
  public expenseItems: ExpenseItemInterface[];

  // Filters for data
  filters = {
    numberPerPage: 50
  };
  
  // Subscription to the data service
  private subscriptionToData;

  isLoading: boolean = true;
  
  constructor(private dataService:DataService) { }

  // Handle emitters from nav sort-header
  handleNumberPerPageChange($event) {
    this.filters.numberPerPage = $event;
    this.getExpensesFromApi(this.filters);
  }
  handleOrderByChange($event) {
    // Order depending of applyied filter
    if ($event === 'desc-date') {
      this.expenseItems = this.expenseItems.sort(
        (a, b) => Number(new Date(a.purchasedOn)) - Number(new Date((b.purchasedOn)))).reverse();
    } else if ($event === 'desc-amount') {
      this.expenseItems = this.expenseItems.sort(
        (a, b) => a.convertedAmount.amount - b.convertedAmount.amount).reverse();
    } else if ($event === 'asc-date') {
      this.expenseItems = this.expenseItems.sort(
        (a, b) => Number(new Date(a.purchasedOn)) - Number(new Date((b.purchasedOn))));
    } else if ($event === 'asc-amount') {
      this.expenseItems = this.expenseItems.sort(
        (a, b) => a.convertedAmount.amount - b.convertedAmount.amount);
    } 
  }

  // Api call through data service
  getExpensesFromApi(filters) {

    // reset values before calling api
    this.expenseItemsResponse = undefined;
    this.expenseItems = undefined;
    this.subscriptionToData !== undefined && this.subscriptionToData.unsubscribe();

    // Send filters to the service for request url
    this.subscriptionToData = this.dataService.getExpenseItems(filters).subscribe(
      data => {
        this.isLoading = true;
        this.expenseItemsResponse = data;
        
      // Set expenseItems and orderBy filters
      this.expenseItems = this.expenseItemsResponse.items.sort(
        (a, b) => Number(new Date(a.purchasedOn)) - Number(new Date((b.purchasedOn)))).reverse();
      this.isLoading = false;
      },
      error => {

        console.log(error);
      }
    ); 
  }

  // Event emmitted from form to update list
  updateExpenseListOnListChange($event) {
    this.getExpensesFromApi(this.filters);
  }

  ngOnInit() {

      this.getExpensesFromApi(this.filters);
  }

  ngOnDestroy() {
    this.subscriptionToData !== undefined && this.subscriptionToData.unsubscribe();
  }

}
