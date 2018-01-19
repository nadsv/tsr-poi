import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ExportComponent } from './export.component';


@NgModule ({
	declarations: [
		ExportComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule
	],
	exports: [
	    ExportComponent
	],
	providers: [
		//ExportService
	]
	})
export class ExportModule {}