import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-styled-button',
  templateUrl: './styled-button.component.html',
  styleUrls: ['./styled-button.component.css']
})
export class StyledButtonComponent implements OnInit {

  @Input() buttonSave: boolean;
  @Input() disabled: boolean;
  @Input() roundButton: boolean;


  constructor() { }


  ngOnInit() {
  }

}
