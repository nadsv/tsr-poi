import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { TsrPoiService } from '../../shared/tsr-poi.service';

@Component({
  selector: 'app-form-1-8',
  templateUrl: './form-1-8.component.html',
  styleUrls: ['./form-1-8.component.css']
})
export class Form18Component implements OnInit {
	doc: any;
	user: string;
	currentDate: string;
	post: string;

	constructor(private tsrPoiService: TsrPoiService) { }

	ngOnInit() {
	  	this.doc = this.tsrPoiService.request;
	  	this.tsrPoiService.fromForms = true;
	  	this.user = this.tsrPoiService.user;
	  	this.currentDate = this.doc.requestDate;
	  	this.post = this.tsrPoiService.post;
	}

	onBlur(event) {
		this.post = event.target.value;
		this.tsrPoiService.post = this.post;
	}

}
