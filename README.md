# ExpensesHandler

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.0-rc.9.

## About

Front-end Single page application to display and handle expenses, for employees to get paid back.

## Possible upgrades

The app was made without external dependencies (except ngx-translate) for more efficiency.

Upgrades : 
* Inputs could be nicer, particularly the date one which could be modified to display date in the language.
* The default currency could be modified on language change for conversion.
* Button component could be optimized to really be reusable.
* Global design should be improved, polices should be well chosen.
* The app was developped mainly for mobile devices, could be upgraded on media queries handling.

## Installation / Getting started

* [Download the installer](https://nodejs.org/) for Node.js.
* Install the angular CLI globally: `npm install -g @angular/cli@9.0.0-rc.9`.
* Clone this repository: `git clone https://github.com/Romain-Dailly/expenses-handler.git`.
* Run `npm install` from the project root.
* Set the environment file as described lower.
* Run `ng serve` or `npm run start` in a terminal from the project root.

## Environment

Set values of your TOKEN and APIKEY in `environment.example.ts` and then change the file name to `environment.ts` for developpment purpose.
For production build, copy the content of the file in `environment.prod.ts`.

For currency conversion to euros API : 
* Create an account on [https://free.currconv.com/](https://free.currconv.com/).
* Add your api key to the `environment.ts` file in `CURRENCYCONVERTER_APIKEY` property.

You can set defaults : 
* the number of expenses per page in `DEFAULT_NUMBER_EXPENSES_PER_PAGE`
* the offset for request in `DEFAULT_OFFSET`
* the ranking of the list in `DEFAULT_ORDER_BY`
* the default language between French ('fr') and English ('en') in `DEFAULT_LANGUAGE`

### API calls

#### External calls to API
To call API during developpment, because of CORS in browsers, if you're not locally developping the project, use a proxy.
Change the `proxy.config.example.json` in root folder to `proxy.config.json` and set API_URL in `environment.ts` file to `'/api'`.

#### Local calls to API
To call the API just set the API_URL in `environment.ts`.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
To use the proxy, run `npm run sp` command.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
