import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { TsrPoiService } from '../shared/tsr-poi.service';

@Injectable()
export class FindService {
    resultsChanged = new Subject<any>();
    
    constructor() {
        
    }

    setResults( results: any[] ) {
        this.resultsChanged.next( results );
    }

}
