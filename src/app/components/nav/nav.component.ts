import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { environment } from './../../../environments/environment';
import { trigger, transition, animate, style } from '@angular/animations';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate('100ms ease-in', style({transform: 'translateY(0%)', opacity:1}))
      ]),
      transition(':leave', [
        animate('100ms ease-in', style({transform: 'translateY(-100%)', opacity:1}))
      ])
    ])
  ]
})
  
export class NavComponent implements OnInit {

  // Porperty to toggle sort header
  showSortExpensesHeader: boolean = false;

  // Sort header needs to be closed from outside
  @Input() hideSortExpensesHeader: boolean;
  
  // Events to emit on values change
  @Output() numberPerPageChange = new EventEmitter();
  @Output() orderByChange = new EventEmitter();

  // Inputs values defaults in environmment
  numberPerPage: number = environment.DEFAULT_NUMBER_EXPENSES_PER_PAGE;
  orderBy: string = environment.DEFAULT_ORDER_BY;

  constructor() { }

  toggleSortHeader() {

    this.showSortExpensesHeader = !this.showSortExpensesHeader;
  }

  onNumberPerPageChange() {

    this.numberPerPageChange.emit(this.numberPerPage);
    this.showSortExpensesHeader = !this.showSortExpensesHeader;
  }

  onOrderChange() {

    this.orderByChange.emit(this.orderBy);
    this.showSortExpensesHeader = !this.showSortExpensesHeader;
  }

  ngOnInit() {
  }
  
  ngOnChanges() {

      this.hideSortExpensesHeader === true ? this.showSortExpensesHeader = false : this.showSortExpensesHeader = this.showSortExpensesHeader;  
  }

}
