import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { TsrPoiService } from '../../shared/tsr-poi.service';
import { PrintService } from '../print.service';

@Component({
  selector: 'app-form-2-2',
  templateUrl: './form-2-2.component.html',
  styleUrls: ['./form-2-2.component.css']
})
export class Form22Component implements OnInit {
	doc: any;
	user: string;
	sumInString: any;
	post: string;

	constructor(private tsrPoiService: TsrPoiService,
		private printService: PrintService) { }

	ngOnInit() {
	  	this.doc = this.tsrPoiService.request;
	  	this.tsrPoiService.fromForms = true;
	  	this.user = this.tsrPoiService.user;
	  	this.post = this.tsrPoiService.post;
	}

	onBlurSum(event) {
		const value = event.target.value;
		this.sumInString = (+value > 0) ? this.printService.numberToString(event.target.value) : '';
	}

	onBlur(event) {
		this.post = event.target.value;
		this.tsrPoiService.post = this.post;
	}
}
