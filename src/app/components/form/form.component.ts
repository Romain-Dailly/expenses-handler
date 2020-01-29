import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { CurrencyConversionService } from './../../services/currency-conversion.service';
import { DataService } from './../../services/data.service';

import { ExpenseItemInterface } from './../../interfaces/expense-item.interface';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
  
  
export class FormComponent implements OnInit {


  @Input() itemToBeModified:ExpenseItemInterface;
  // Emit event when expense list has to be updated
  @Output() expensesListModified = new EventEmitter();
  // Emit an event to close the form
  @Output() formHasToClose = new EventEmitter();
  
  // handling form type (creation, modification)
  private formType:string;
  public formTitle:string;
  public showDeleteButton:boolean;

  // Button disabled if form not filled or values of itemToBeModified not modified
  public isButtonDisabled:boolean = true;

  // store the input item to verify itemToBeModified modifications
  itemOnFormOpening:ExpenseItemInterface;


  // Values for inputs
  expenseDate:Date;
  expenseNature:string;
  expenseComment:string;
  expenseOriginalAmount:number;
  expenseOriginalAmountCurrency:string;
  expenseConvertedAmount:number;
  expenseConvertedAmountCurrency:string = 'EUR';

  // Coefficient to convert to euros got by fetching conversion Api
  private coefficientToEuros:any;

  // Handle load times for conversion request
  isConversionLoading:boolean = false;
  isConversionDone: boolean = false;
  spinnerWidth: string = '20px';
  spinnerHeight: string = '20px';
  spinnerMargin: string ='2px auto'
  
  // Handle post, put and delete requests
  isExpenseSent:boolean = false;
  isExpenseSending:boolean = false;

  // Handle error
  error: boolean = false;
  isConversionError: boolean = false;


  constructor(private dataService: DataService,
              private currencyConversionService: CurrencyConversionService
              ) { }


  onInputChange(): void {
  this.setIsButtonDisabled();
  }

  // Handle  amount inputs change, if amount and currency are filled, launch euros conversion
  onAmountInputChange(): void {
    if (this.expenseOriginalAmountCurrency && this.expenseOriginalAmount) {
      this.convertToEuros();      
    } this.setIsButtonDisabled();
  }

  setIsButtonDisabled(): void {

    // Conditions for creation form to be sendable
    if (this.formType === 'create') {

      if (this.expenseDate && this.expenseNature && this.expenseComment && this.expenseOriginalAmount && this.expenseOriginalAmountCurrency && this.isConversionDone) {
        this.isButtonDisabled = false;
      } else {
        this.isButtonDisabled = true;
      }
    // Conditions for modification form to be sendable
    } else if (this.formType === 'modify') { 

      if (this.expenseDate !== this.itemOnFormOpening.purchasedOn ||
        this.expenseNature !== this.itemOnFormOpening.nature ||
        this.expenseOriginalAmountCurrency !== this.itemOnFormOpening.originalAmount.currency ||
        this.expenseOriginalAmount !== this.itemOnFormOpening.originalAmount.amount ||
        this.expenseComment !== this.itemOnFormOpening.comment) {  
        this.isButtonDisabled = false;
      } else {
        this.isButtonDisabled = true;
      }
    }
  }

  // convert if necessary
  convertToEuros(): void {

    this.isConversionError = false;
    if (this.expenseOriginalAmountCurrency === 'EUR') { 
      this.expenseConvertedAmount = this.expenseOriginalAmount;
      this.isConversionLoading = false;
      this.isConversionDone = true;
    } else {
      this.isConversionLoading = true;
      this.isConversionDone = false;
      this.currencyConversionService.getCoefficientToEuros(this.expenseOriginalAmountCurrency).subscribe(
        data => {
          this.coefficientToEuros = data;
          this.expenseConvertedAmount = Number((this.expenseOriginalAmount * this.coefficientToEuros[`${this.expenseOriginalAmountCurrency}_EUR`]).toFixed(2));
          this.isConversionLoading = false;
          this.isConversionDone = true;
          this.setIsButtonDisabled();
        },
        error => {
          this.isConversionLoading = false;
          this.isConversionDone = false;
          this.isConversionError = true;
          console.log(error);
        }
      );
    }
  }

  // Emit event to close form
  closeForm(): void {

    this.formHasToClose.emit();
  }

  // Handle form submission
  onSubmit(): void {

    if (this.formType === 'create') {
      this.postOnExpenseCreation();
    } else if (this.formType === 'modify') {
      this.putOnExpenseModification();
    }
  } 

  // Compute inputs in an object to send
  computeExpenseToSend():Object {

    return {
      purchasedOn: this.expenseDate,
      nature: this.expenseNature,
      originalAmount: {
        amount: this.expenseOriginalAmount,
        currency: this.expenseOriginalAmountCurrency
      },
      convertedAmount: {
        amount: this.expenseConvertedAmount,
        currency: this.expenseConvertedAmountCurrency
      },
      comment: this.expenseComment
   };
  }

  // Post a new expense
  postOnExpenseCreation():void {

    // Get computed expense
    const expenseToSend = this.computeExpenseToSend();
    // Send it
    this.dataService.postNewExpenseItem(expenseToSend).subscribe(
      data => {
        this.isExpenseSending = true;
        if (data) {
          this.expensesListModified.emit();
          this.isExpenseSent = true;
          this.isExpenseSending = false;
          this.resetValuesAfterPost();
        }    
      },
      error => {
        this.error = true;
        console.log(error);
      }
    )
  }

  // Modify an expense
  putOnExpenseModification():void {
    
    // Get computed expense
    const expenseToSend = this.computeExpenseToSend();
    // Send it
    this.dataService.putExpenseItem(this.itemToBeModified.id, expenseToSend).subscribe(
      data => {
        this.isExpenseSending = true;
        if (data) {
          this.expensesListModified.emit();
          this.isExpenseSent = true;
          this.isExpenseSending = false;
          this.resetValuesAfterPost();
        }    
      },
      error => {
        this.error = true;
        console.log(error);
      }
    )
  }

  // Handle delete expense
  handleDelete(): void {

    this.dataService.deleteExpenseItem(this.itemToBeModified.id).subscribe(
      data => {
        this.isExpenseSending = true;
        this.expensesListModified.emit();
        this.isExpenseSent = true;
        this.isExpenseSending = false;
        this.resetValuesAfterPost();
      },
      error => {
        this.error = true;
        console.log(error);
      }
    )
  }

  // Empty form properties
  resetValuesAfterPost(): void {

    this.expenseDate = undefined;
    this.expenseNature = undefined;
    this.expenseOriginalAmountCurrency = undefined;
    this.expenseOriginalAmount = undefined;
    this.expenseConvertedAmount = undefined;
    this.expenseComment = undefined;
    this.isConversionDone = false;
    this.itemToBeModified = undefined;
    this.error = false;
  }

  ngOnInit() {
  }

  ngOnChanges(changes) {

    // Store new changes
    this.itemOnFormOpening = changes.itemToBeModified.currentValue;

    // If an item is in the input, set inputs values and form type
    if (this.itemToBeModified) {

      this.isConversionDone = true;
      this.expenseDate = this.itemToBeModified.purchasedOn;
      this.expenseNature = this.itemToBeModified.nature;
      this.expenseOriginalAmountCurrency = this.itemToBeModified.originalAmount.currency;
      this.expenseOriginalAmount = this.itemToBeModified.originalAmount.amount;
      this.expenseConvertedAmount = this.itemToBeModified.convertedAmount.amount;
      this.expenseComment = this.itemToBeModified.comment;
      this.formType = 'modify';
      this.formTitle = 'modificationTitle';
      this.showDeleteButton = true;
    } else {
      this.formType= 'create';
      this.formTitle = 'creationTitle';
      this.showDeleteButton = false;
      this.expenseDate = new Date;
    }
  }

}
