import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { PrintService } from '../print.service';

@Component({
  selector: 'app-print-forms',
  templateUrl: './print-forms.component.html',
  styleUrls: ['./print-forms.component.css']
})
export class PrintFormsComponent implements OnInit {
	@Input() step: string;
	showMenu: boolean = false;
	forms: any[];

	constructor(private printService: PrintService) { }

	ngOnInit() {
		this.forms = this.printService[this.step];
	}

	onClick() {
		this.showMenu = !this.showMenu;
	}
}
