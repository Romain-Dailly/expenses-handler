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

    
  showSortHeader: boolean = false;

  @Input() hideSortHeader: boolean;
  @Output() numberPerPageChange = new EventEmitter();
  @Output() orderByChange = new EventEmitter();

  numberPerPage: number = environment.DEFAULT_NUMBER_EXPENSES_PER_PAGE;
  orderBy: string = 'desc-date';

  constructor() { }

  toggleSortHeader() {
    console.log(this.showSortHeader);
    this.showSortHeader = !this.showSortHeader;
  }

  onNumberPerPageChange() {
    this.numberPerPageChange.emit(this.numberPerPage);
    this.showSortHeader = !this.showSortHeader;
  }

  onOrderChange() {
    this.orderByChange.emit(this.orderBy);
    this.showSortHeader = !this.showSortHeader;
  }

  ngOnInit() {
  }
  
  ngOnChanges() {
      this.hideSortHeader === true ? this.showSortHeader = false : this.showSortHeader = this.showSortHeader;  
  }

}
