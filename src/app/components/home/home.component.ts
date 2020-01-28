import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ExpenseItemInterface } from './../../interfaces/expense-item.interface';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Provisory response from api to be computed 
  private expenseItemsResponse;

  // Items got from provisory response
  public expenseItems: ExpenseItemInterface[];

  // Filters for data requests, defaults in environment file
  filters = {
    numberPerPage: environment.DEFAULT_NUMBER_EXPENSES_PER_PAGE,
    offset: environment.DEFAULT_OFFSET
  };
  
  // Subscription to the data service
  private subscriptionToData;

  // Handle display of toggled sort-expenses-header and loading on requests
  hideSortExpensesHeader: boolean = false;
  isLoading: boolean = true;
  
  constructor(private dataService:DataService) { }

  // Handle emitters from nav sort-expenses-header and recall api
  handleNumberPerPageChange($event) {
    this.filters.numberPerPage = $event;
    this.getExpensesFromApi(this.filters);
  }
  handleOrderByChange($event) {
    // Order list depending on applyied filter
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

    // Reset values before calling api
    this.expenseItemsResponse = undefined;
    this.expenseItems = undefined;
    this.subscriptionToData !== undefined && this.subscriptionToData.unsubscribe();
    this.isLoading = true;
    // Send filters to the service to set request url
    this.subscriptionToData = this.dataService.getExpenseItems(filters).subscribe(
      data => {
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

    this.hideSortExpensesHeader = true;
    this.getExpensesFromApi(this.filters);
    // Wait to set hideSortHeader value to false to make the change work next time
    setTimeout(() => { this.hideSortExpensesHeader = false }, 2000);
  }

  ngOnInit() {

      this.getExpensesFromApi(this.filters);
  }

  ngOnDestroy() {
    
    this.subscriptionToData !== undefined && this.subscriptionToData.unsubscribe();
  }

}
