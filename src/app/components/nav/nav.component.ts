import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Output() passUpdateExpenseListOnListChange = new EventEmitter();
  constructor() { }

  updateExpenseListOnListChange() {
    this.passUpdateExpenseListOnListChange.emit();
  }

  ngOnInit() {
  }

}
