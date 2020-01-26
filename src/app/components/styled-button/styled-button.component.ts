import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-styled-button',
  templateUrl: './styled-button.component.html',
  styleUrls: ['./styled-button.component.css']
})
export class StyledButtonComponent implements OnInit {

  @Input() buttonText: string;
  // button use create, modify, delete
  @Input() isButtonToCreateModifyOrDelete: string;

  constructor() { }

  handleClick() {
    if (this.isButtonToCreateModifyOrDelete === undefined) {
      
    } if (this.isButtonToCreateModifyOrDelete === 'create') {

    } if (this.isButtonToCreateModifyOrDelete === 'modify') {

    } if (this.isButtonToCreateModifyOrDelete === 'delete') {
      
    }
  }

  ngOnInit() {
  }

}
