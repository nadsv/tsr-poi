import { Injectable } from '@angular/core';

@Injectable()
export class SearchParamsService {
    requestNum: string;
    requestStartDate: string;
    requestEndDate: string;
    decisionNum: string;
    decisionStartDate: string;
    decisionEndDate: string;
    snils: string;
    name: string;

    constructor() {
    }

    init( params ) {
        for (const key of Object.keys(params)) {
            this[key] = params[key];
        }
    }

}
