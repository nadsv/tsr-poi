import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';
import { TsrPoiService } from '../../shared/tsr-poi.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	
	constructor(private auth: AuthService,
    private tsrPoiService: TsrPoiService,
		private router: Router) {}

	ngOnInit() {

	}

	mainLink() {
    	return (this.auth.isAuthenticated()) ? '/request' : '/';
  	}

  	reload() {
    const url = (this.tsrPoiService.fromForms) ? '/'+this.tsrPoiService.request.id : '';
   
		if (this.router.navigated === false) {
    		this.router.navigateByUrl('/request' + url);
        
  		} else {
    		this.router.navigateByUrl(`/`).then(
      			() => {
        			this.router.navigateByUrl(`/request` + url);
              
      		});
  		}
	}

}
