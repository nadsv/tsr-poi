import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { TsrPoiService } from '../shared/tsr-poi.service';
import { AddService } from './add.service';
import { decodeHtml } from '../shared/lib.module';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
	requestForm: FormGroup;
	decisionForm: FormGroup;
  requestIsSaved  = false;
  decisionIsSaved = false;
  isAdmin: boolean;
  updating = false;

	constructor(private tsrPoiService: TsrPoiService,
				private route: ActivatedRoute,
                private router: Router,
                private addService: AddService) { }

	ngOnInit() {
		const request = this.addService.getRequest({});
		this.createForm(request);
    this.requestIsSaved = false;
    this.isAdmin = this.tsrPoiService.isAdmin;
    this.tsrPoiService.fromForms = false;

		this.route.params.subscribe(
            ( params ) => {
            	            this.addService.id = +params['id'];
            				      this.updating = ( this.addService.id ) ? true : false;
                          this.requestIsSaved = this.updating;
            				      const request = this.addService.getRequest(this.addService.id);
					                if ( this.addService.id ) {
					        	          this.tsrPoiService.fetchData(this.tsrPoiService.apiUrl + 'get-request.php', {id: this.addService.id })
					        	          .subscribe(
					        		          	(data) => { const request = this.addService.getRequest(data);
                                              this.initForm(request);
                                              this.tsrPoiService.request = request;
                                              this.decisionIsSaved = (+request.decisionNum > 0);
					        			                    },
					        			        ( error ) => alert( 'Ошибка получения данных!' )
					        		);
					        }
        	}
        );

	}

	onSaveRequest() {
    this.requestForm.controls['name'].setValue(this.requestForm.get('name').value.toUpperCase());
    if (this.requestForm.controls['receive'].value === 'Почта') {
      this.requestForm.controls['account'].setValue('');
      this.requestForm.controls['bankName'].setValue('');
      this.requestForm.controls['bic'].setValue('');
    }

    if (!this.requestForm.controls['kind'].value.match(/Компенсация/)) {
      this.requestForm.controls['account'].setValue('');
      this.requestForm.controls['bankName'].setValue('');
      this.requestForm.controls['bic'].setValue('');
      this.requestForm.controls['receive'].setValue('');
    }
		if ( !this.updating ) {
		this.tsrPoiService.changeData(this.tsrPoiService.apiUrl + 'add-request.php', this.requestForm.value)
			.subscribe(
        		item  => {
        			this.requestForm.controls['requestNum'].setValue(item.num);
        			this.addService.id = item.id;
        			this.requestForm.controls['id'].setValue(this.addService.id);
        			this.requestIsSaved = true;
        			this.updating = true;
        			window.history.pushState('', '', 'request/' + this.addService.id);
              this.tsrPoiService.request = this.requestForm.value;
              this.tsrPoiService.request.id = this.addService.id;
        			alert('Заявка успешно сохранена!');
        		},

        		error => alert('Ошибка сохранения!')
        	);
        } else {
        	this.tsrPoiService.changeData(this.tsrPoiService.apiUrl + 'update-request.php', this.requestForm.value)
			.subscribe(
        		item  => {
              this.tsrPoiService.request = this.requestForm.value;
        			alert('Заявка успешно обновлена!');
        		},
        		error => alert('Ошибка обновления заявки!')
        	);
        }
	}

	onSaveDecision() {
		this.decisionForm.controls['id'].setValue(this.addService.id);
		this.tsrPoiService.changeData(this.tsrPoiService.apiUrl + 'update-decision.php', this.decisionForm.value)
			.subscribe(
        		item  => {
        			this.decisionForm.controls['decisionNum'].setValue(item.num);
              this.decisionIsSaved = true;
              this.tsrPoiService.request.decisionNum = item.num;
              this.tsrPoiService.request.decisionDate = this.decisionForm.controls['decisionDate'].value;
              this.tsrPoiService.request.approvedProstheses = this.decisionForm.controls['approvedProstheses'].value;
              this.tsrPoiService.request.decisionPortion = this.decisionForm.controls['decisionPortion'].value;
              this.tsrPoiService.request.decisionUser = this.decisionForm.controls['decisionUser'].value;
        			alert('Решение успешно обновлено!');
        		},
        		error => alert('Ошибка обновления решения!')
        	);
	}

	onImport(snils) {
		const data = { snils: snils };
		this.tsrPoiService.fetchData(this.tsrPoiService.apiUrl + 'person_data.php', data).subscribe(
			( person ) => {
				if ( person.name ) {
				  this.requestForm.controls['name'].setValue(person.name);
			    this.requestForm.controls['address'].setValue(person.addr);
			    this.requestForm.controls['prostheses'].setValue(person.tsrpoi);
          this.requestForm.controls['program'].setValue(person.program);
			} else {
				alert('Заявитель не найден!');
			}
			},
			( error )	=> console.log(error)
			);
	}

	onProsthesesDoubleClick() {
		this.decisionForm.controls['approvedProstheses'].setValue(this.requestForm.controls['prostheses'].value);
	}

	createForm(request) {
		this.requestForm = new FormGroup({
			    id: new FormControl(request.id),
      		requestNum: new FormControl(request.requestNum),
      		requestDate: new FormControl(request.requestDate, Validators.required),
      		fullRequestDate: new FormControl(request.fullRequestDate),
      		snils: new FormControl(request.snils),
      		name: new FormControl(request.name, Validators.required),
      		kind: new FormControl(request.kind, Validators.required),
      		address: new FormControl(request.address, Validators.required),
      		delivery: new FormControl(request.delivery, Validators.required),
      		prostheses: new FormControl(request.prostheses),
      		passport: new FormControl(request.passport),
      		program: new FormControl(request.program),
      		procuration: new FormControl(request.procuration),
      		docs: new FormControl(request.docs),
      		requestUser: new FormControl(request.requestUser, Validators.required),
          description: new FormControl(request.description),
          bic: new FormControl(request.bic),
          bankName: new FormControl(request.bank_name),
          account: new FormControl(request.account),
          receive: new FormControl(request.receive)
      	});

      	this.decisionForm = new FormGroup({
      		id: new FormControl(request.id),
      		decisionNum: new FormControl(request.decisionNum),
      		decisionDate: new FormControl(request.decisionDate, Validators.required),
      		approvedProstheses: new FormControl(request.approvedProstheses, Validators.required),
      		decisionPortion: new FormControl(request.decisionPortion, Validators.required),
      		decisionUser: new FormControl(request.decisionUser, Validators.required)
      	});

	}

	initForm(request) {
		this.requestForm.controls['id'].setValue(request.id);
      	this.requestForm.controls['requestNum'].setValue(request.requestNum);
      	this.requestForm.controls['requestDate'].setValue(request.requestDate);
      	this.requestForm.controls['fullRequestDate'].setValue(request.fullRequestDate);
      	this.requestForm.controls['snils'].setValue(request.snils);
      	this.requestForm.controls['name'].setValue(request.name);
      	this.requestForm.controls['kind'].setValue(request.kind);
      	this.requestForm.controls['address'].setValue(request.address);
      	this.requestForm.controls['delivery'].setValue(request.delivery);
      	this.requestForm.controls['prostheses'].setValue(request.prostheses);
      	this.requestForm.controls['passport'].setValue(request.passport);
        this.requestForm.controls['program'].setValue(request.program);
      	this.requestForm.controls['procuration'].setValue(request.procuration);
      	this.requestForm.controls['docs'].setValue(request.docs);
      	this.requestForm.controls['requestUser'].setValue(request.requestUser);
        this.requestForm.controls['description'].setValue(request.description);
        this.requestForm.controls['bic'].setValue(request.bic);
        this.requestForm.controls['bankName'].setValue(request.bankName);
        this.requestForm.controls['account'].setValue(request.account);
        this.requestForm.controls['receive'].setValue(request.receive);

      	this.decisionForm.controls['id'].setValue(request.id);
      	this.decisionForm.controls['decisionNum'].setValue(request.decisionNum);
      	this.decisionForm.controls['decisionDate'].setValue(request.decisionDate);
      	this.decisionForm.controls['approvedProstheses'].setValue(request.approvedProstheses);
      	this.decisionForm.controls['decisionPortion'].setValue(request.decisionPortion);
      	this.decisionForm.controls['decisionUser'].setValue(request.decisionUser);

      	this.requestIsSaved = true;
	}

  delete( ) {
    if (confirm('Удалить запись?')) {
      this.tsrPoiService.changeData(this.tsrPoiService.apiUrl + 'del-request.php', {id: this.addService.id}).subscribe(
          () => {this.router.navigate(['/find']); },
          () => alert('Ошибка удаления записи!')
        );
    }
  }

  getBank( bic: string ) {
      if (bic) {
      const data = { bic };
      this.tsrPoiService.fetchData(this.tsrPoiService.apiUrl + 'get-bank.php',
          data).subscribe(
          (bank) => { this.requestForm.controls['bankName'].setValue( bank.name );
                      },
          () => this.requestForm.controls['bankName'].setValue( 'Банк не найден!' )
        );
      } else {
        this.requestForm.controls['bankName'].setValue( '' );
      }
  }

  deleteDecision() {
    if (confirm('Удалить решение?')) {
      this.tsrPoiService.changeData(this.tsrPoiService.apiUrl + 'del-decision.php', {id: this.addService.id}).subscribe(
          () => {
            this.decisionForm.controls['decisionNum'].setValue(0);
            this.decisionForm.controls['decisionDate'].setValue('0000-00-00');
            this.decisionForm.controls['approvedProstheses'].setValue('');
            this.decisionForm.controls['decisionPortion'].setValue('');
            this.decisionForm.controls['decisionUser'].setValue('');
            this.decisionIsSaved = false;
          },
          () => alert('Ошибка удаления решения!')
        );
    }
  }

  onKindChange(event) {
    const kind = event.target.value;
    if ( kind.match(/Компенсация/) ) {
      this.requestForm.controls['receive'].setValidators([Validators.required]);
      this.requestForm.controls['receive'].updateValueAndValidity();
    } else {
      this.requestForm.controls['receive'].clearValidators();
      this.requestForm.controls['receive'].updateValueAndValidity();
    }
  }

  onReceiveChange(event) {
    const receive = event.target.value;
    if ( receive === 'Банк' ) {
      this.requestForm.controls['account'].setValidators([Validators.required, Validators.minLength(20), Validators.maxLength(20)]);
      this.requestForm.controls['account'].updateValueAndValidity();
      this.requestForm.controls['bic'].setValidators([Validators.required, Validators.minLength(9), Validators.maxLength(9)]);
      this.requestForm.controls['bic'].updateValueAndValidity();
    } else {
      this.requestForm.controls['account'].clearValidators();
      this.requestForm.controls['account'].updateValueAndValidity();
      this.requestForm.controls['bic'].clearValidators();
      this.requestForm.controls['bic'].updateValueAndValidity();
    }
  }

}
