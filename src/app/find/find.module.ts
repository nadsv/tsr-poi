import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FindComponent } from './find.component';
import { ResultsComponent } from './results/results.component';
import { SearchParamsComponent } from './search-params/search-params.component';
import { FindService } from './find.service';


@NgModule ({
	declarations: [
		FindComponent,
		ResultsComponent,
		SearchParamsComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule
	],
	exports: [
	    FindComponent
	],
	providers: [
		FindService
	]
	})
export class FindModule {}