import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { TsrPoiService } from '../../shared/tsr-poi.service';

@Component({
  selector: 'app-form-1-2',
  templateUrl: './form-1-2.component.html',
  styleUrls: ['./form-1-2.component.css']
})
export class Form12Component implements OnInit {
  	doc: any;

	constructor(private tsrPoiService: TsrPoiService) { }

	ngOnInit() {
	  	this.doc = this.tsrPoiService.request;
	  	this.tsrPoiService.fromForms = true;
	}
}
