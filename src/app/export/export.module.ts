import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExportComponent } from './export.component';
//import { ExportService } from './mailing.service';


@NgModule ({
	declarations: [
		ExportComponent
	],
	imports: [
		CommonModule
	],
	exports: [
	    ExportComponent
	],
	providers: [
		//ExportService
	]
	})
export class ExportModule {}