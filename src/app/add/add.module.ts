import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AddComponent } from './add.component';
import { AddService } from './add.service';

@NgModule ({
	declarations: [
		AddComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule
	],
	exports: [
	    AddComponent
	],
	providers: [
		AddService
	]
	})
export class AddModule {}