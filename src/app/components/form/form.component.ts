import { ExpenseItemInterface } from './../../interfaces/expense-item.interface';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CurrencyConversionService } from './../../services/currency-conversion.service';
import { DataService } from './../../services/data.service';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
  
export class FormComponent implements OnInit {


  @Input() itemToBeModified;
  // Emit event when expense list has to be updated
  @Output() expensesListModified = new EventEmitter();
  // Emit an event to close the form
  @Output() formHasToClose = new EventEmitter();
  
  // handling form type (creation, modification)
  private formType: string;
  formTitle: string;
  showDeleteButton: boolean;

  // Button disabled if form not filled or values of itemToBeModified not modified
  isButtonDisabled: boolean = true;

  // store the input item to verify itemToBeModified modifications
  itemOnFormOpening:ExpenseItemInterface;


  // Values for inputs
  expenseDate :Date;
  expenseNature :string;
  expenseComment :string;
  expenseOriginalAmount :number;
  expenseOriginalAmountCurrency :string;
  expenseConvertedAmount :number;
  expenseConvertedAmountCurrency :string = 'EUR';

  // Coefficient to convert to euros got by fetching conversion Api
  private coefficientToEuros;

  // Handle load times for conversion request
  isConversionLoading: boolean = false;
  isConversionDone: boolean = false;
  
  // Handle post, put and delete requests
  isExpenseSent: boolean = false;
  isExpenseSending: boolean = false;

  // Handle error
  error: boolean = false;

  constructor(private dataService: DataService,
              private currencyConversionService: CurrencyConversionService
              ) { }

  

  onInputChange() {
  this.setIsButtonDisabled();
  }

  // Handle  amount inputs change, if amount and currency are filled, launch euros conversion
  onAmountInputChange() {
    if (this.expenseOriginalAmountCurrency && this.expenseOriginalAmount) {
      this.convertToEuros();      
    } this.setIsButtonDisabled();
  }

  setIsButtonDisabled() {

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
  convertToEuros() {

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
          console.log(error);
        }
      );
    }
  }

  // Emit event to close form
  closeForm() {
    this.formHasToClose.emit();
  }

  // Handle form submission
  onSubmit() {

    if (this.formType === 'create') {
      this.postOnExpenseCreation();
    } else if (this.formType === 'modify') {
      this.putOnExpenseModification();
    }
  } 

  // Compute inputs in an object to send
  computeExpenseToSend() {

   const expenseToSend = {
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
    return expenseToSend;
  }

  // Post a new expense
  postOnExpenseCreation() {

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
  putOnExpenseModification() {
    
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
  handleDelete() {

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
  resetValuesAfterPost() {

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
      this.formTitle = 'Editer';
      this.showDeleteButton = true;
    } else {
      this.formType= 'create';
      this.formTitle = 'Nouvelle';
      this.showDeleteButton = false;
    }
  }

}
