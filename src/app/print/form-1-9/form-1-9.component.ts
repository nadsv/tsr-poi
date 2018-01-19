import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { TsrPoiService } from '../../shared/tsr-poi.service';

@Component({
  selector: 'app-form-1-9',
  templateUrl: './form-1-9.component.html',
  styleUrls: ['./form-1-9.component.css']
})
export class Form19Component implements OnInit {

	doc: any;
	user: string;
	post: string;

	constructor(private tsrPoiService: TsrPoiService) { }

	ngOnInit() {
	  	this.doc = this.tsrPoiService.request;
	  	this.tsrPoiService.fromForms = true;
	  	this.user = this.tsrPoiService.user;
	  	this.post = this.tsrPoiService.post;
	}

	onBlur(event) {
		this.post = event.target.value;
		this.tsrPoiService.post = this.post;
	}

}
