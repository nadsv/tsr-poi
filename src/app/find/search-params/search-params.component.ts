import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup  } from '@angular/forms';

import { TsrPoiService } from '../../shared/tsr-poi.service';
import { FindService } from '../find.service';
import { SearchParamsService } from '../../shared/search-params.service';

@Component({
  selector: 'app-search-params',
  templateUrl: './search-params.component.html',
  styleUrls: ['./search-params.component.css']
})
export class SearchParamsComponent implements OnInit {
	searchForm: FormGroup;

	constructor(private tsrPoiService: TsrPoiService,
		private findService: FindService,
		private searchParams: SearchParamsService) { }

	ngOnInit() {
		const currentDate = new Date();
		const formatDate = currentDate.toISOString().substring(0, 10);

		this.searchForm = new FormGroup({
			requestNum: new FormControl(this.searchParams.requestNum || ''),
			requestStartDate: new FormControl(this.searchParams.requestStartDate || formatDate),
			requestEndDate: new FormControl(this.searchParams.requestEndDate || ''),
			decisionNum: new FormControl(this.searchParams.decisionNum || ''),
			decisionStartDate: new FormControl(this.searchParams.decisionStartDate || ''),
			decisionEndDate: new FormControl(this.searchParams.decisionEndDate || ''),
			snils: new FormControl(this.searchParams.snils || ''),
			name: new FormControl(this.searchParams.name || '')
		});
		this.searchParams.init(this.searchForm.value);
		this.getResults(this.searchForm.value);
	}

	onSubmit() {
		this.searchForm.controls['name'].setValue(this.searchForm.get('name').value.toUpperCase());
		this.searchParams.init(this.searchForm.value);
		this.getResults(this.searchForm.value);
	}

	getResults(params) {
		this.tsrPoiService.fetchData(this.tsrPoiService.apiUrl + 'get-results.php', params).subscribe(
				(data) => this.findService.setResults(data),
				(error) => alert('Ошибка получения данных!')
			)
	}

}
