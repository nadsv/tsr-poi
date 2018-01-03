import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { FindService } from '../find.service';
import { TsrPoiService } from '../../shared/tsr-poi.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
	requests: any[];
	private resultsSubscription: Subscription;

	constructor(private tsrPoiService: TsrPoiService,
				private findService: FindService,
				private router: Router) { }

	ngOnInit() {
	  	this.resultsSubscription = this.findService.resultsChanged.subscribe(
                (requests) => { this.requests = requests },
                () => alert('Невозможно получить результат поиска!')
            );
	}

	SelectRow(i) {
  		this.router.navigateByUrl(`/request/` + i);
 	}

 	ngOnDestroy() {
        this.resultsSubscription.unsubscribe();
    }
}
