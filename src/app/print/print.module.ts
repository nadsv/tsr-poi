import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RoutingModule } from '../app.routing';
import { PrintService } from '../print/print.service';
import { Form12Component } from './form-1-2/form-1-2.component';
import { PrintFormsComponent } from './print-forms/print-forms.component';
import { Form19Component } from './form-1-9/form-1-9.component';
import { Form110Component } from './form-1-10/form-1-10.component';
import { Form18Component } from './form-1-8/form-1-8.component';
import { Form16Component } from './form-1-6/form-1-6.component';
import { Form17Component } from './form-1-7/form-1-7.component';
import { Form21Component } from './form-2-1/form-2-1.component';
import { Form22Component } from './form-2-2/form-2-2.component';
import { Form23Component } from './form-2-3/form-2-3.component';
import { Form24Component } from './form-2-4/form-2-4.component';
import { Form13Component } from './form-1-3/form-1-3.component';
import { Form14Component } from './form-1-4/form-1-4.component';
import { Form15Component } from './form-1-5/form-1-5.component';

@NgModule ({
	declarations: [
		Form12Component,
		PrintFormsComponent,
		Form19Component,
		Form110Component,
		Form18Component,
		Form16Component,
		Form17Component,
		Form21Component,
		Form22Component,
		Form23Component,
		Form24Component,
		Form13Component,
		Form14Component,
		Form15Component
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		RoutingModule
	],
	exports: [
		PrintFormsComponent
	],
	providers: [
		PrintService
	]
	})
export class PrintModule {}