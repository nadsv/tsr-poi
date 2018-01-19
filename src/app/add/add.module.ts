import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AddComponent } from './add.component';
import { AddService } from './add.service';
import { PrintModule } from '../print/print.module';


@NgModule ({
	declarations: [
		AddComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		PrintModule
	],
	exports: [
	    AddComponent
	],
	providers: [
		AddService
	]
	})
export class AddModule {}