import { Component } from '@angular/core';

import { environment } from './../environments/environment';

import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
  
  
export class AppComponent {


  title = 'expenses-handler';

  
  constructor(public translateService: TranslateService) { 
    // Initialize translateService for app
    translateService.addLangs(['fr-FR', 'en-EN']);
    translateService.setDefaultLang(environment.DEFAULT_LANGUAGE);
  }

}
