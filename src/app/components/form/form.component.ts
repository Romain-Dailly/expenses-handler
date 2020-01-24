import { Component, OnInit } from '@angular/core';
import { DataService } from './../../services/data.service';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
  
export class FormComponent implements OnInit {

  private defaultFieldsContent;

  expenseDate = new FormControl('');
  expenseNature = new FormControl('');
  expenseComment = new FormControl('');
  expenseOriginalAmount = new FormControl('');
  expenseOriginalAmountCurrency = new FormControl('');
  expenseConvertedAmount = new FormControl('');
  expenseConvertedAmountCurrency = new FormControl('');

  constructor(private dataService: DataService) { }

  onSubmit() {

  }

  ngOnInit() {
  }

}
