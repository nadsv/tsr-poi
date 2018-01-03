import { Injectable } from '@angular/core';
import { TsrPoiService } from '../shared/tsr-poi.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AddService {
    id: number;
        
    constructor(private tsrPoiService: TsrPoiService) {
        
    }

    getRequest( data ) {
    	const currentUser = this.tsrPoiService.user;

		const currentDate = new Date();
		const formatDate = currentDate.toISOString().substring(0, 10);

    	if ( data.id ) {
			const decisionUser = data.decision_user || currentUser;
      const decisionDate = data.decision_date || formatDate;
			return {
					id: data.id,
					requestNum: data.request_num,
      				requestDate: data.request_date, 
      				fullRequestDate: data.full_request_date,
      				snils: data.snils,
      				name: data.name,
      				kind: data.kind,
      				address: data.address,
      				delivery: data.delivery,
      				prostheses: data.prostheses,
      				passport: data.passport,
      				program: data.program,
      				procuration: data.procuration,
      				docs: data.docs,
      				requestUser: data.request_user,
      				decisionNum: data.decision_num,
      				decisionDate: decisionDate, 
      				approvedProstheses: data.approved_prostheses,
      				decisionPortion: data.decision_portion,
      				decisionUser: decisionUser
      				} 
				}
    	else {
    		return {
						id: '',
						requestNum: '',
      					requestDate: formatDate, 
      					fullRequestDate: '',
      					snils: '',
      					name: '',
      					kind: '',
      					address: '',
      					delivery: '',
      					prostheses: '',
      					passport: '',
      					program: '',
      					procuration: '',
      					docs: '',
      					requestUser: currentUser,
      					decisionNum: '',
      					decisionDate: formatDate, 
      					approvedProstheses: '',
      					decisionPortion: '',
      					decisionUser: currentUser 
					}
    	}
    }

}
