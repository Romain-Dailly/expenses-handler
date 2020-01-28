import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-styled-button',
  templateUrl: './styled-button.component.html',
  styleUrls: ['./styled-button.component.css']
})
export class StyledButtonComponent implements OnInit {

  // Button content is save?
  @Input() buttonSave: boolean;
  // Button is disabled ?
  @Input() disabled: boolean;
  // Button is round ?
  @Input() roundButton: boolean;


  constructor() { }


  ngOnInit() {
  }

}
