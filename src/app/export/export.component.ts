import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup  } from '@angular/forms';

import { TsrPoiService } from '../shared/tsr-poi.service';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {
	exportForm: FormGroup;

	constructor(private tsrPoiService: TsrPoiService) { }

	ngOnInit() {
		this.exportForm = new FormGroup({
			requestStartDate: new FormControl(''),
      requestEndDate: new FormControl(''),
      kind: new FormControl(''),
		});
	}

	onSubmit() {
		this.tsrPoiService.fetchData(this.tsrPoiService.apiUrl + 'export.php', this.exportForm.value)
			.subscribe(
				() =>  window.location.href = this.tsrPoiService.apiUrl + 'request_list.xls',
				() => alert('Ошибка выгрузки!')
				);
	}

}
