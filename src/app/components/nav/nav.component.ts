import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
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

  @Output() numberPerPageChange = new EventEmitter();
  @Output() orderByChange = new EventEmitter();

  numberPerPage: number = 50;
  orderBy: string = 'desc-date';

  constructor() { }

  toggleSortHeader() {
    this.showSortHeader = !this.showSortHeader;
  }

  onNumberPerPageChange() {
    this.numberPerPageChange.emit(this.numberPerPage);
    this.showSortHeader = !this.showSortHeader;
  }

  onOrderChange() {
    console.log(this.orderBy);
    this.orderByChange.emit(this.orderBy);
    this.showSortHeader = !this.showSortHeader;
  }

  ngOnInit() {
  }

}
