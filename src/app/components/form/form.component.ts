import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CurrencyConversionService } from './../../services/currency-conversion.service';
import { DataService } from './../../services/data.service';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
  
export class FormComponent implements OnInit {

  private defaultFieldsContentForModificationForm;

  @Input() itemToBeModified;
  @Output() newExpenseCreated = new EventEmitter();
  
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

  // Button disabled if form not filled
  isButtonDisabled: boolean = true;

  constructor(private dataService: DataService,
              private currencyConversionService: CurrencyConversionService
              ) { }

  // Handle inputs change, if amount and currency are filled, launch euros conversion
  onInputChange() {
    
    if (this.expenseOriginalAmountCurrency && this.expenseOriginalAmount) {
      this.convertToEuros();
    } this.setIsButtonDisabled();
  }

  setIsButtonDisabled() {
    if (this.expenseDate && this.expenseNature && this.expenseComment && this.expenseOriginalAmount && this.expenseOriginalAmountCurrency && this.isConversionDone) {
      this.isButtonDisabled = false;
    } else {
      this.isButtonDisabled = true;
    }
  }

  convertToEuros() {
    this.isConversionLoading = true;
    if (this.expenseOriginalAmountCurrency === 'EUR' && this.expenseConvertedAmount) { 
      this.expenseConvertedAmount = this.expenseOriginalAmount;
      this.isConversionLoading = false;
      this.isConversionDone = true;
    } else {
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

  onSubmit() {

    const expenseForPost = {
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

    this.dataService.postNewExpenseItem(expenseForPost).subscribe(
      data => {
        this.isExpenseSending = true;
        console.log(data);

        if (data) {
          this.newExpenseCreated.emit();
          this.isExpenseSent = true;
          this.isExpenseSending = false;
          this.resetValuesAfterPost();
        }    
      },
      error => {
        console.log(error);
      }
    )
  }

  resetValuesAfterPost() {

    this.expenseDate = undefined;
    this.expenseNature = undefined;
    this.expenseOriginalAmountCurrency = undefined;
    this.expenseOriginalAmount = undefined;
    this.expenseConvertedAmount = undefined;
    this.expenseComment = undefined;
    this.isConversionDone = false;
  }


  ngOnInit() {
  }

  ngOnChanges() {

    this.expenseDate = this.itemToBeModified.purchasedOn;
    this.expenseNature = this.itemToBeModified.nature;
    this.expenseOriginalAmountCurrency = this.itemToBeModified.originalAmount.currency;
    this.expenseOriginalAmount = this.itemToBeModified.originalAmount.amount;
    this.expenseConvertedAmount = this.itemToBeModified.convertedAmount.amount;
    this.expenseComment = this.itemToBeModified.comment;
  }

}
